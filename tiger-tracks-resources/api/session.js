// api/session.js — exchange a Google ID token for a signed session token
const crypto = require('crypto');
const verify = require('./_auth');

const SESSION_SECRET = process.env.SESSION_SECRET || 'tt-resources-fallback-secret-change-in-vercel';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function signSession(email) {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${email}|${exp}`;
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64url')}.${sig}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await verify(req);
  if (!user) return res.status(401).json({ error: 'Invalid or expired Google token.' });

  const sessionToken = signSession(user.email);
  res.status(200).json({ sessionToken, email: user.email, exp: Date.now() + SESSION_TTL_MS });
};
