const http = require('http');
const fs = require('fs');
const path = require('path');

const accessLog = require('../access-logger')('resources');
const PORT = 3001;
const DIR = __dirname;
const FEEDBACK_FILE = path.join(DIR, 'feedback-submissions.json');

// Ensure feedback file exists
if (!fs.existsSync(FEEDBACK_FILE)) fs.writeFileSync(FEEDBACK_FILE, '[]');

const MIME = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript',
  '.json':'application/json','.png':'image/png','.jpg':'image/jpeg',
  '.gif':'image/gif','.svg':'image/svg+xml','.ico':'image/x-icon',
  '.pdf':'application/pdf','.woff2':'font/woff2','.woff':'font/woff'
};

function serve(req, res) {
  accessLog(req);
  // API: save feedback
  if (req.method === 'POST' && req.url === '/api/feedback') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const store = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
        store.push(data);
        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(store, null, 2));
        res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
        res.end(JSON.stringify({ok:true}));
      } catch(e) {
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error:e.message}));
      }
    });
    return;
  }

  // API: get feedback (for admin view)
  if (req.method === 'GET' && req.url === '/api/feedback') {
    try {
      const store = fs.readFileSync(FEEDBACK_FILE, 'utf8');
      res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
      res.end(store);
    } catch(e) {
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end('[]');
    }
    return;
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST','Access-Control-Allow-Headers':'Content-Type'});
    res.end();
    return;
  }

  // Static files
  let filePath = path.join(DIR, req.url === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
  if (!filePath.startsWith(DIR)) { res.writeHead(403); res.end(); return; }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream'});
    res.end(data);
  });
}

http.createServer(serve).listen(PORT, '127.0.0.1', () => {
  console.log(`Tiger Tracks Resources server on http://127.0.0.1:${PORT}`);
});
