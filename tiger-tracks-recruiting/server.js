const http = require('http');
const fs = require('fs');
const path = require('path');

const accessLog = require('../access-logger')('recruiting');
const PORT = 3003;
const WEBHOOK_PORT = 3004;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  accessLog(req);
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Proxy /api/* to webhook server
  if (url.pathname.startsWith('/api/')) {
    const proxyPath = url.pathname.replace('/api', '') + url.search;
    const opts = {
      hostname: '127.0.0.1',
      port: WEBHOOK_PORT,
      path: proxyPath,
      method: req.method,
      headers: { ...req.headers, host: `127.0.0.1:${WEBHOOK_PORT}` }
    };
    const proxy = http.request(opts, proxyRes => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    proxy.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end('{"error":"Webhook server unavailable"}');
    });
    req.pipe(proxy);
    return;
  }

  // Static file serving
  let filePath = path.join(DIR, url.pathname === '/' ? 'index.html' : url.pathname);
  filePath = path.resolve(filePath);
  if (!filePath.startsWith(DIR)) { res.writeHead(403); res.end(); return; }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404</h1>');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Recruiting site + API proxy on port ${PORT}`);
  console.log(`Static files: ${DIR}`);
  console.log(`API proxy: /api/* -> localhost:${WEBHOOK_PORT}`);
});
