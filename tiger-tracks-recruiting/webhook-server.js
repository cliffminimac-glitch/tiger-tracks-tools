const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3004;
const DATA_FILE = path.join(__dirname, 'webhook-prospects.json');
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');
const NOTIFY_EMAIL = 'elizabeth@tigertracks.ai';
const AUTH_TOKEN = 'tt_recruit_' + require('crypto').randomBytes(16).toString('hex');

// Initialize
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
if (!fs.existsSync(SUBMISSIONS_DIR)) fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });

function loadProspects() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch(e) { return []; }
}

function saveProspects(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // ===== POST /webhook - Receive prospects from PhantomBuster/Zapier =====
  if (req.method === 'POST' && url.pathname === '/webhook') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const prospects = loadProspects();
        const now = new Date().toISOString();

        // Handle both single object and array
        const items = Array.isArray(payload) ? payload : [payload];
        let added = 0;

        items.forEach(item => {
          // Normalize field names (PhantomBuster / Zapier / generic)
          const prospect = {
            id: 'wh_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            name: item.name || item.fullName || item.full_name || ((item.firstName || item.first_name || '') + ' ' + (item.lastName || item.last_name || '')).trim() || 'Unknown',
            title: item.title || item.headline || item.currentTitle || item.current_title || item.jobTitle || item.job_title || '',
            company: item.company || item.currentCompany || item.current_company || item.companyName || item.company_name || '',
            location: item.location || item.city || item.region || '',
            linkedinUrl: item.linkedinUrl || item.linkedin_url || item.profileUrl || item.profile_url || item.linkedInProfileUrl || item.url || '',
            email: item.email || '',
            phone: item.phone || '',
            experience: item.experience || item.yearsOfExperience || item.years_of_experience || '',
            skills: item.skills || item.skill || '',
            connections: item.connections || item.connectionDegree || '',
            summary: item.summary || item.about || item.description || '',
            imageUrl: item.imageUrl || item.image_url || item.profilePicture || item.avatar || '',
            source: item.source || 'PhantomBuster/Zapier Webhook',
            status: 'new',
            added: now,
            raw: item // Keep original data
          };

          // Dedupe by LinkedIn URL or name+company
          const isDupe = prospects.some(p =>
            (prospect.linkedinUrl && p.linkedinUrl === prospect.linkedinUrl) ||
            (prospect.name === p.name && prospect.company === p.company && prospect.name !== 'Unknown')
          );

          if (!isDupe) {
            prospects.push(prospect);
            added++;
          }
        });

        saveProspects(prospects);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, added, total: prospects.length, duplicatesSkipped: items.length - added }));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON', details: e.message }));
      }
    });
    return;
  }

  // ===== POST /webhook/phantombuster - PhantomBuster specific format =====
  if (req.method === 'POST' && url.pathname === '/webhook/phantombuster') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const prospects = loadProspects();
        const now = new Date().toISOString();

        // PhantomBuster sends results in various formats
        const results = payload.results || payload.output || payload.data || (Array.isArray(payload) ? payload : [payload]);
        let added = 0;

        results.forEach(item => {
          const prospect = {
            id: 'pb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            name: item.name || item.fullName || ((item.firstName || '') + ' ' + (item.lastName || '')).trim() || 'Unknown',
            title: item.title || item.headline || item.jobTitle || '',
            company: item.company || item.companyName || item.currentCompany || '',
            location: item.location || item.city || '',
            linkedinUrl: item.profileUrl || item.linkedInProfileUrl || item.url || '',
            email: item.email || '',
            phone: item.phone || '',
            experience: String(item.yearsInCurrentRole || item.experience || ''),
            skills: Array.isArray(item.skills) ? item.skills.join(', ') : (item.skills || ''),
            connections: item.connectionDegree || item.degree || '',
            summary: item.summary || item.about || '',
            imageUrl: item.imgUrl || item.profilePictureUrl || '',
            source: 'PhantomBuster',
            phantom: item.phantomName || '',
            status: 'new',
            added: now,
            raw: item
          };

          const isDupe = prospects.some(p =>
            (prospect.linkedinUrl && p.linkedinUrl === prospect.linkedinUrl) ||
            (prospect.name === p.name && prospect.company === p.company && prospect.name !== 'Unknown')
          );

          if (!isDupe) { prospects.push(prospect); added++; }
        });

        saveProspects(prospects);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, added, total: prospects.length }));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // ===== GET /prospects - Fetch all webhook prospects (for the recruiting tool) =====
  if (req.method === 'GET' && url.pathname === '/prospects') {
    const prospects = loadProspects();
    const status = url.searchParams.get('status');
    const since = url.searchParams.get('since');
    let filtered = prospects;
    if (status) filtered = filtered.filter(p => p.status === status);
    if (since) filtered = filtered.filter(p => p.added >= since);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ prospects: filtered, total: filtered.length }));
    return;
  }

  // ===== POST /prospects/:id/status - Update prospect status =====
  if (req.method === 'POST' && url.pathname.match(/^\/prospects\/[^/]+\/status$/)) {
    const id = url.pathname.split('/')[2];
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const prospects = loadProspects();
      const p = prospects.find(x => x.id === id);
      if (!p) { res.writeHead(404); res.end('{"error":"Not found"}'); return; }
      try {
        const { status } = JSON.parse(body);
        p.status = status;
        saveProspects(prospects);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch(e) { res.writeHead(400); res.end('{"error":"Invalid JSON"}'); }
    });
    return;
  }

  // ===== DELETE /prospects - Clear all =====
  if (req.method === 'DELETE' && url.pathname === '/prospects') {
    saveProspects([]);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"success":true,"cleared":true}');
    return;
  }

  // ===== POST /screening-submit - Handle video screening submissions =====
  if (req.method === 'POST' && url.pathname === '/screening-submit') {
    const boundary = req.headers['content-type']?.match(/boundary=(.+)/)?.[1];
    if (!boundary) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('{"error":"Missing multipart boundary"}');
      return;
    }

    let rawData = [];
    req.on('data', chunk => rawData.push(chunk));
    req.on('end', () => {
      try {
        const buf = Buffer.concat(rawData);
        const parts = parseMultipart(buf, boundary);
        
        const fields = {};
        const files = [];
        
        parts.forEach(part => {
          if (part.filename) {
            files.push({ fieldName: part.name, filename: part.filename, data: part.data, type: part.contentType });
          } else {
            fields[part.name] = part.data.toString();
          }
        });

        const candidateName = fields.candidate || 'Unknown';
        const email = fields.email || '';
        const role = fields.role || '';
        const roleName = fields.roleName || role;
        const now = new Date();
        const subId = 'screen_' + now.getTime();
        const subDir = path.join(SUBMISSIONS_DIR, subId);
        fs.mkdirSync(subDir, { recursive: true });

        // Save files
        const savedFiles = [];
        files.forEach(f => {
          const safeName = f.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
          const filePath = path.join(subDir, safeName);
          fs.writeFileSync(filePath, f.data);
          savedFiles.push({ name: safeName, field: f.fieldName, size: f.data.length });
        });

        // Save metadata
        const meta = {
          id: subId,
          candidate: candidateName,
          email: email,
          role: role,
          roleName: roleName,
          date: now.toISOString(),
          questionsAnswered: parseInt(fields.questionsAnswered) || 0,
          totalQuestions: parseInt(fields.totalQuestions) || 0,
          questions: fields.questions ? JSON.parse(fields.questions) : [],
          files: savedFiles
        };
        fs.writeFileSync(path.join(subDir, 'meta.json'), JSON.stringify(meta, null, 2));

        // Also append to submissions log
        const logFile = path.join(SUBMISSIONS_DIR, 'submissions.json');
        let submissions = [];
        try { submissions = JSON.parse(fs.readFileSync(logFile, 'utf8')); } catch(e) {}
        submissions.push(meta);
        fs.writeFileSync(logFile, JSON.stringify(submissions, null, 2));

        // Send email notification
        sendNotificationEmail(meta, savedFiles);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, id: subId }));
      } catch(e) {
        console.error('Screening submit error:', e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // ===== GET /screening-submissions =====
  if (req.method === 'GET' && url.pathname === '/screening-submissions') {
    const logFile = path.join(SUBMISSIONS_DIR, 'submissions.json');
    let submissions = [];
    try { submissions = JSON.parse(fs.readFileSync(logFile, 'utf8')); } catch(e) {}
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ submissions }));
    return;
  }

  // ===== GET /health =====
  if (url.pathname === '/health') {
    const prospects = loadProspects();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', prospects: prospects.length, uptime: process.uptime() }));
    return;
  }

  // ===== GET / - Setup instructions =====
  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html><head><title>TT Recruiting Webhook</title>
<style>body{font-family:Montserrat,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem;color:#1B2126;}
h1{color:#229FA1;}code{background:#f0f0f0;padding:.2rem .4rem;border-radius:4px;font-size:.85rem;}
pre{background:#1B2126;color:#e5e7eb;padding:1rem;border-radius:8px;overflow-x:auto;font-size:.82rem;}
.badge{background:#229FA1;color:#fff;padding:.2rem .6rem;border-radius:12px;font-size:.75rem;font-weight:700;}</style></head>
<body>
<h1>Tiger Tracks Recruiting Webhook</h1>
<p><span class="badge">ACTIVE</span> Ready to receive LinkedIn prospect data</p>
<h2>Endpoints</h2>
<h3>Generic Webhook</h3>
<pre>POST /webhook
Content-Type: application/json

[{"name":"Jane Doe","title":"Account Manager","company":"Agency X","linkedinUrl":"https://linkedin.com/in/jane"}]</pre>
<h3>PhantomBuster Webhook</h3>
<pre>POST /webhook/phantombuster
Content-Type: application/json

{"results":[{"name":"Jane Doe","headline":"Senior AM","companyName":"Agency X","profileUrl":"..."}]}</pre>
<h3>Fetch Prospects</h3>
<pre>GET /prospects
GET /prospects?status=new
GET /prospects?since=2026-03-01</pre>
<h3>Health Check</h3>
<pre>GET /health</pre>
<h2>PhantomBuster Setup</h2>
<ol>
<li>Create a LinkedIn Search Export or Sales Navigator Search phantom</li>
<li>In Phantom settings, go to "Webhooks" or "Notify"</li>
<li>Set webhook URL to: <code>https://recruiting.cliffeliz.ai/api/webhook/phantombuster</code></li>
<li>Run the phantom - results will auto-flow into the recruiting tool</li>
</ol>
<h2>Zapier Setup</h2>
<ol>
<li>Create a Zap with your trigger (e.g., new row in Google Sheet, new PhantomBuster result)</li>
<li>Add a "Webhooks by Zapier" action → POST</li>
<li>URL: <code>https://recruiting.cliffeliz.ai/api/webhook</code></li>
<li>Payload Type: JSON</li>
<li>Map fields: name, title, company, linkedinUrl, location, email</li>
</ol>
</body></html>`);
    return;
  }

  res.writeHead(404);
  res.end('{"error":"Not found"}');
});

// ===== MULTIPART PARSER =====
function parseMultipart(buf, boundary) {
  const parts = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  const endBuf = Buffer.from('--' + boundary + '--');
  
  let pos = 0;
  // Skip to first boundary
  pos = bufferIndexOf(buf, boundaryBuf, 0);
  if (pos < 0) return parts;
  pos += boundaryBuf.length + 2; // skip \r\n
  
  while (pos < buf.length) {
    const nextBoundary = bufferIndexOf(buf, boundaryBuf, pos);
    if (nextBoundary < 0) break;
    
    const partData = buf.slice(pos, nextBoundary - 2); // -2 for \r\n before boundary
    const headerEnd = bufferIndexOf(partData, Buffer.from('\r\n\r\n'), 0);
    if (headerEnd < 0) { pos = nextBoundary + boundaryBuf.length + 2; continue; }
    
    const headerStr = partData.slice(0, headerEnd).toString();
    const body = partData.slice(headerEnd + 4);
    
    const nameMatch = headerStr.match(/name="([^"]+)"/);
    const fileMatch = headerStr.match(/filename="([^"]+)"/);
    const typeMatch = headerStr.match(/Content-Type:\s*(.+)/i);
    
    if (nameMatch) {
      parts.push({
        name: nameMatch[1],
        filename: fileMatch ? fileMatch[1] : null,
        contentType: typeMatch ? typeMatch[1].trim() : null,
        data: body
      });
    }
    
    pos = nextBoundary + boundaryBuf.length;
    if (buf.slice(pos, pos + 2).toString() === '--') break; // end boundary
    pos += 2; // skip \r\n
  }
  return parts;
}

function bufferIndexOf(buf, search, start) {
  for (let i = start; i <= buf.length - search.length; i++) {
    let found = true;
    for (let j = 0; j < search.length; j++) {
      if (buf[i + j] !== search[j]) { found = false; break; }
    }
    if (found) return i;
  }
  return -1;
}

// ===== EMAIL NOTIFICATION =====
function sendNotificationEmail(meta, files) {
  const resumeFile = files.find(f => f.field === 'resume');
  const videoCount = files.filter(f => f.field && f.field.startsWith('video_')).length;
  
  const subject = `Video Screening Complete: ${meta.candidate} - ${meta.roleName}`;
  const body = `A candidate has completed their video screening.\n\n` +
    `Candidate: ${meta.candidate}\n` +
    `Email: ${meta.email}\n` +
    `Role: ${meta.roleName}\n` +
    `Date: ${new Date(meta.date).toLocaleString()}\n` +
    `Questions Answered: ${meta.questionsAnswered} of ${meta.totalQuestions}\n` +
    `Resume: ${resumeFile ? resumeFile.name : 'Not uploaded'}\n` +
    `Video Recordings: ${videoCount} files\n\n` +
    `Question Summary:\n` +
    meta.questions.map((q, i) => 
      `  ${i+1}. ${q.q.substring(0, 80)}... ${q.skipped ? '[SKIPPED]' : '(' + q.duration + 's)'}`
    ).join('\n') +
    `\n\nFiles are saved on the server at: submissions/${meta.id}/\n` +
    `Review at: https://recruiting.cliffeliz.ai (Templates > Video Screening > Submissions)\n`;

  // Try sendmail/mail command
  const escapedSubject = subject.replace(/'/g, "'\\''");
  const escapedBody = body.replace(/'/g, "'\\''");
  
  // Method 1: Try /usr/sbin/sendmail
  const mailCmd = `echo 'Subject: ${escapedSubject}\nFrom: recruiting@tigertracks.ai\nTo: ${NOTIFY_EMAIL}\nContent-Type: text/plain; charset=utf-8\n\n${escapedBody}' | /usr/sbin/sendmail ${NOTIFY_EMAIL}`;
  
  exec(mailCmd, (err) => {
    if (err) {
      console.log('sendmail failed, trying mail command:', err.message);
      // Method 2: Try mail command
      const mailCmd2 = `echo '${escapedBody}' | mail -s '${escapedSubject}' ${NOTIFY_EMAIL}`;
      exec(mailCmd2, (err2) => {
        if (err2) {
          console.log('mail command also failed:', err2.message);
          console.log('Email notification could not be sent. Submission saved to disk.');
          // Method 3: Write to a notification file that can be picked up
          const notifFile = path.join(SUBMISSIONS_DIR, 'pending_notifications.json');
          let notifs = [];
          try { notifs = JSON.parse(fs.readFileSync(notifFile, 'utf8')); } catch(e) {}
          notifs.push({ to: NOTIFY_EMAIL, subject, body, date: new Date().toISOString(), meta });
          fs.writeFileSync(notifFile, JSON.stringify(notifs, null, 2));
        } else {
          console.log('Email sent via mail command to', NOTIFY_EMAIL);
        }
      });
    } else {
      console.log('Email sent via sendmail to', NOTIFY_EMAIL);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Tiger Tracks Webhook Server running on port ${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  POST /webhook              - Generic webhook`);
  console.log(`  POST /webhook/phantombuster - PhantomBuster format`);
  console.log(`  GET  /prospects             - Fetch prospects`);
  console.log(`  GET  /health               - Health check`);
});
