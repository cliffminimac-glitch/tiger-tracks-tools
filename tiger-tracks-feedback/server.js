const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const accessLog = require('../access-logger')('checkins');
const PORT = 3006;
const DIR = __dirname;
const FEEDBACK_FILE = path.join(DIR, 'feedback-submissions.json');

if (!fs.existsSync(FEEDBACK_FILE)) fs.writeFileSync(FEEDBACK_FILE, '[]');

const MIME = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript',
  '.json':'application/json','.png':'image/png','.jpg':'image/jpeg',
  '.gif':'image/gif','.svg':'image/svg+xml','.pdf':'application/pdf'
};

// ORG data for access control
const ORG = {
  "Riley Abercrombie":{manager:"Rachel Scharett",practice:"am",email:"riley@tigertracks.ai"},
  "Hannah Price":{manager:"Rachel Scharett",practice:"am",email:"hannah@tigertracks.ai"},
  "Charlotte Pohl":{manager:"Rachel Scharett",practice:"am",email:"charlotte@tigertracks.ai"},
  "Allison Long":{manager:"Rachel Scharett",practice:"am",email:"allison@tigertracks.ai"},
  "Rachel Scharett":{manager:"",practice:"am",email:"rachael@tigertracks.ai"},
  "Shelby Nations":{manager:"Riley Abercrombie",practice:"am",email:"shelby@tigertracks.ai"},
  "Owen Phipps":{manager:"Riley Abercrombie",practice:"am",email:"owen@tigertracks.ai"},
  "Megan Brenneke":{manager:"Shelby Nations",practice:"am",email:"meganb@tigertracks.ai"},
  "Seth McDaniel":{manager:"Shelby Nations",practice:"am",email:"seth@tigertracks.ai"},
  "Mary McCambridge":{manager:"Hannah Price",practice:"am",email:"mary@tigertracks.ai"},
  "Will Sokol":{manager:"Hannah Price",practice:"am",email:"will@tigertracks.ai"},
  "Gretchen Hess":{manager:"Mary McCambridge",practice:"am",email:"gretchen@tigertracks.ai"},
  "Megan Klein":{manager:"Will Sokol",practice:"am",email:"megank@tigertracks.ai"},
  "Daren Kalkoffen":{manager:"Gretchen Hess",practice:"am",email:"daren@tigertracks.ai"},
  "Evin Leclerc":{manager:"Daren Kalkoffen",practice:"am",email:"evin@tigertracks.ai"},
  "Kiyana Saidi-Nejad":{manager:"Charlotte Pohl",practice:"am",email:"kiyana@tigertracks.ai"},
  "Bruno Milalaf":{manager:"Charlotte Pohl",practice:"am",email:"bruno@tigertracks.ai"},
  "Billy Bevevino":{manager:"Charlotte Pohl",practice:"am",email:"billy@tigertracks.ai"},
  "Tate Dewey":{manager:"Kiyana Saidi-Nejad",practice:"am",email:"tate@tigertracks.ai"},
  "Sanad Shuman":{manager:"Billy Bevevino",practice:"am",email:"sanad@tigertracks.ai"},
  "Alex Blumberg":{manager:"Ashley Kaika",practice:"part",email:"alex@tigertracks.ai"},
  "Steven Jatich":{manager:"Ashley Kaika",practice:"part",email:"steven@tigertracks.ai"},
  "Kersten Kruse":{manager:"Ashley Kaika",practice:"mkt",email:"kersten@tigertracks.ai"},
  "Anirudh Venkat":{manager:"Kersten Kruse",practice:"mkt",email:"anirudh@tigertracks.ai"},
  "Ashley Kaika":{manager:"",practice:"part",email:"ashley@tigertracks.ai"}
};

const GLOBAL_ADMINS = ["cliff@tigertracks.ai","elizabeth@tigertracks.ai"];

// Verification codes: { email: { code, expires } }
const verificationCodes = {};

function getStore() {
  try { return JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8')); }
  catch(e) { return []; }
}
function saveStore(store) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(store, null, 2));
}

// Upsert: find existing submission by employee+type+period, update or insert
function upsertSubmission(data) {
  const store = getStore();
  const key = data.type + '|' + data.employee + '|' + (data.week || data.month || '');
  const idx = store.findIndex(s => (s.type + '|' + s.employee + '|' + (s.week || s.month || '')) === key);
  if (idx >= 0) {
    // Merge: keep manager fields if employee is updating, keep employee fields if manager is updating
    Object.assign(store[idx], data);
    store[idx].updatedAt = new Date().toISOString();
  } else {
    data.submittedAt = new Date().toISOString();
    store.push(data);
  }
  saveStore(store);
  return store[idx >= 0 ? idx : store.length - 1];
}

// Check if viewer can see manager section of a submission
// Direct reports cannot see their manager's submissions about them until marked released
function canSeeManagerSection(submission, viewerEmail) {
  if (!viewerEmail) return false;
  const ve = viewerEmail.toLowerCase();
  // Global admins always see everything
  if (GLOBAL_ADMINS.includes(ve)) return true;
  // The manager themselves can see
  const mgrInfo = Object.values(ORG).find(o => o.email === ve);
  const mgrName = Object.keys(ORG).find(k => ORG[k].email === ve);
  // If viewer is the manager or above the manager, they can see
  if (submission.manager && ORG[submission.manager] && ORG[submission.manager].email === ve) return true;
  // If submission is marked as released (meeting complete), anyone authorized can see
  if (submission.released) return true;
  // If viewer is the employee themselves, they can NOT see manager section until released
  const empInfo = ORG[submission.employee];
  if (empInfo && empInfo.email === ve && !submission.released) return false;
  // Rachael sees AM practice
  if (ve === 'rachael@tigertracks.ai' && empInfo && empInfo.practice === 'am') return true;
  return false;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function sendEmail(to, subject, htmlBody) {
  try {
    const mailContent = `To: ${to}\nSubject: ${subject}\nContent-Type: text/html; charset=utf-8\nFrom: Tiger Tracks Check-Ins <noreply@tigertracks.ai>\n\n${htmlBody}`;
    execSync(`echo ${JSON.stringify(mailContent)} | /usr/sbin/sendmail -t`, { timeout: 5000 });
    return true;
  } catch(e) {
    console.error('Email send failed:', to, e.message);
    return false;
  }
}

const urlParse = (u) => { const [p, q] = u.split('?'); return { path: p, query: Object.fromEntries(new URLSearchParams(q || '')) }; };

async function serve(req, res) {
  accessLog(req);
  const { path: urlPath, query } = urlParse(req.url);

  // CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,PUT','Access-Control-Allow-Headers':'Content-Type,X-Viewer-Email'});
    res.end(); return;
  }

  const cors = {'Access-Control-Allow-Origin':'*','Content-Type':'application/json'};

  // POST /api/send-code - send verification code to email
  if (req.method === 'POST' && urlPath === '/api/send-code') {
    const body = await readBody(req);
    try {
      const { email } = JSON.parse(body);
      const e = (email || '').trim().toLowerCase();
      if (!e || !e.endsWith('@tigertracks.ai')) {
        res.writeHead(400, cors);
        res.end(JSON.stringify({error:'Must be a @tigertracks.ai email'}));
        return;
      }
      // Check email exists in org
      const validEmails = [...GLOBAL_ADMINS, ...Object.values(ORG).map(o => o.email)];
      if (!validEmails.includes(e)) {
        res.writeHead(403, cors);
        res.end(JSON.stringify({error:'Email not recognized'}));
        return;
      }
      // Generate 6-digit code
      const code = String(Math.floor(100000 + Math.random() * 900000));
      verificationCodes[e] = { code, expires: Date.now() + 10 * 60 * 1000 }; // 10 min
      // Send email
      const htmlBody = `
        <div style="font-family:Montserrat,Arial,sans-serif;max-width:480px;margin:0 auto;">
          <div style="background:#1a1a2e;padding:1.25rem;border-radius:10px 10px 0 0;text-align:center;">
            <span style="color:#229FA1;font-weight:800;font-size:1.1rem;">Tiger Tracks</span>
            <span style="color:#94a3b8;font-size:.85rem;"> Check-Ins</span>
          </div>
          <div style="padding:1.5rem;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;">
            <p style="font-size:.95rem;">Your verification code:</p>
            <div style="text-align:center;margin:1rem 0;">
              <span style="font-size:2rem;font-weight:800;letter-spacing:.3rem;color:#229FA1;">${code}</span>
            </div>
            <p style="font-size:.8rem;color:#9ca3af;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
          </div>
        </div>`;
      const sent = sendEmail(e, 'Tiger Tracks - Verification Code: ' + code, htmlBody);
      res.writeHead(200, cors);
      res.end(JSON.stringify({ok:true, sent}));
    } catch(e) {
      res.writeHead(400, cors);
      res.end(JSON.stringify({error:e.message}));
    }
    return;
  }

  // POST /api/verify-code - verify the code
  if (req.method === 'POST' && urlPath === '/api/verify-code') {
    const body = await readBody(req);
    try {
      const { email, code } = JSON.parse(body);
      const e = (email || '').trim().toLowerCase();
      const entry = verificationCodes[e];
      if (!entry) {
        res.writeHead(400, cors);
        res.end(JSON.stringify({ok:false, error:'No code sent to this email. Request a new one.'}));
        return;
      }
      if (Date.now() > entry.expires) {
        delete verificationCodes[e];
        res.writeHead(400, cors);
        res.end(JSON.stringify({ok:false, error:'Code expired. Request a new one.'}));
        return;
      }
      if (entry.code !== String(code).trim()) {
        res.writeHead(400, cors);
        res.end(JSON.stringify({ok:false, error:'Incorrect code.'}));
        return;
      }
      // Valid!
      delete verificationCodes[e];
      res.writeHead(200, cors);
      res.end(JSON.stringify({ok:true, verified:true}));
    } catch(e) {
      res.writeHead(400, cors);
      res.end(JSON.stringify({error:e.message}));
    }
    return;
  }

  // POST /api/feedback - upsert submission
  if (req.method === 'POST' && urlPath === '/api/feedback') {
    const body = await readBody(req);
    try {
      const data = JSON.parse(body);
      const saved = upsertSubmission(data);
      res.writeHead(200, cors);
      res.end(JSON.stringify({ok:true, id: saved.submittedAt || saved.updatedAt}));
    } catch(e) {
      res.writeHead(400, cors);
      res.end(JSON.stringify({error:e.message}));
    }
    return;
  }

  // GET /api/feedback - list with visibility filtering
  if (req.method === 'GET' && urlPath === '/api/feedback') {
    const store = getStore();
    const viewerEmail = (req.headers['x-viewer-email'] || query.viewer || '').toLowerCase();
    const filtered = store.map(s => {
      const copy = Object.assign({}, s);
      // Strip manager fields if viewer is the employee and not released
      if (!canSeeManagerSection(s, viewerEmail)) {
        delete copy.w_mgr_notes; delete copy.w_mgr_priorities;
        delete copy.w_mgr_coaching; delete copy.w_mgr_actions;
        delete copy.mgr_working; delete copy.mgr_strengthen;
        copy._managerHidden = true;
      }
      return copy;
    });
    res.writeHead(200, cors);
    res.end(JSON.stringify(filtered));
    return;
  }

  // POST /api/feedback/release - mark submission as released (meeting complete)
  if (req.method === 'POST' && urlPath === '/api/feedback/release') {
    const body = await readBody(req);
    try {
      const { employee, type, period } = JSON.parse(body);
      const store = getStore();
      const key = type + '|' + employee + '|' + period;
      const idx = store.findIndex(s => (s.type + '|' + s.employee + '|' + (s.week || s.month || '')) === key);
      if (idx >= 0) {
        store[idx].released = true;
        store[idx].releasedAt = new Date().toISOString();
        saveStore(store);
        res.writeHead(200, cors);
        res.end(JSON.stringify({ok:true}));
      } else {
        res.writeHead(404, cors);
        res.end(JSON.stringify({error:'Not found'}));
      }
    } catch(e) {
      res.writeHead(400, cors);
      res.end(JSON.stringify({error:e.message}));
    }
    return;
  }

  // POST /api/send-reminders - send email reminders with links
  if (req.method === 'POST' && urlPath === '/api/send-reminders') {
    const body = await readBody(req);
    try {
      const { type, period } = JSON.parse(body); // type: "weekly"|"monthly", period: week date or month string
      const results = [];
      const base = 'https://checkins.cliffeliz.ai';

      for (const [name, info] of Object.entries(ORG)) {
        if (!info.manager || !info.email) continue;
        let url, subject, bodyHtml;

        if (type === 'weekly') {
          const weekLabel = period || new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
          url = `${base}/weekly-form.html?employee=${encodeURIComponent(name)}&manager=${encodeURIComponent(info.manager)}&role=${encodeURIComponent(info.practice)}&week=${encodeURIComponent(weekLabel)}`;
          subject = `Tiger Tracks Weekly Check-In - Week of ${weekLabel}`;
          bodyHtml = `
            <div style="font-family:Montserrat,Arial,sans-serif;max-width:560px;margin:0 auto;">
              <div style="background:#1a1a2e;padding:1.25rem;border-radius:10px 10px 0 0;text-align:center;">
                <span style="color:#229FA1;font-weight:800;font-size:1.1rem;">Tiger Tracks</span>
                <span style="color:#94a3b8;font-size:.85rem;"> Check-Ins</span>
              </div>
              <div style="padding:1.5rem;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;">
                <p style="font-size:.95rem;">Hi ${name.split(' ')[0]},</p>
                <p style="font-size:.9rem;color:#6b7280;">Please complete your weekly check-in before your 1:1 with ${info.manager.split(' ')[0]}.</p>
                <div style="text-align:center;margin:1.25rem 0;">
                  <a href="${url}" style="background:#229FA1;color:#fff;padding:.65rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:.9rem;">Complete Check-In</a>
                </div>
                <p style="font-size:.78rem;color:#9ca3af;">This link is unique to you and email-verified.</p>
              </div>
            </div>`;
        } else {
          const t = Buffer.from(name + '-' + period).toString('base64').replace(/=/g, '');
          url = `${base}/feedback-form.html?employee=${encodeURIComponent(name)}&manager=${encodeURIComponent(info.manager)}&role=${encodeURIComponent(info.practice)}&month=${encodeURIComponent(period)}&t=${t}`;
          subject = `Tiger Tracks Monthly Feedback - ${period}`;
          bodyHtml = `
            <div style="font-family:Montserrat,Arial,sans-serif;max-width:560px;margin:0 auto;">
              <div style="background:#1a1a2e;padding:1.25rem;border-radius:10px 10px 0 0;text-align:center;">
                <span style="color:#229FA1;font-weight:800;font-size:1.1rem;">Tiger Tracks</span>
                <span style="color:#94a3b8;font-size:.85rem;"> Check-Ins</span>
              </div>
              <div style="padding:1.5rem;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;">
                <p style="font-size:.95rem;">Hi ${name.split(' ')[0]},</p>
                <p style="font-size:.9rem;color:#6b7280;">It's time to complete your monthly feedback for ${period}. Please fill this out before your review with ${info.manager.split(' ')[0]}.</p>
                <div style="text-align:center;margin:1.25rem 0;">
                  <a href="${url}" style="background:#229FA1;color:#fff;padding:.65rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;font-size:.9rem;">Complete Feedback</a>
                </div>
                <p style="font-size:.78rem;color:#9ca3af;">This link is unique to you and email-verified.</p>
              </div>
            </div>`;
        }

        const sent = sendEmail(info.email, subject, bodyHtml);
        results.push({ name, email: info.email, sent });
      }

      res.writeHead(200, cors);
      res.end(JSON.stringify({ ok: true, results }));
    } catch(e) {
      res.writeHead(400, cors);
      res.end(JSON.stringify({error:e.message}));
    }
    return;
  }

  // Static files
  let filePath = path.join(DIR, urlPath === '/' ? 'index.html' : decodeURIComponent(urlPath));
  if (!filePath.startsWith(DIR)) { res.writeHead(403); res.end(); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream'});
    res.end(data);
  });
}

http.createServer(serve).listen(PORT, '127.0.0.1', () => {
  console.log(`Feedback server on http://127.0.0.1:${PORT}`);
});
