// api/_auth.js — verify Google ID token OR signed session token
const crypto = require('crypto');

const SESSION_SECRET = process.env.SESSION_SECRET || 'tt-resources-fallback-secret-change-in-vercel';

function verifySessionToken(token) {
  try {
    const [b64, sig] = token.split('.');
    if (!b64 || !sig) return null;
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(Buffer.from(b64, 'base64url').toString()).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return null;
    const [email, expStr] = Buffer.from(b64, 'base64url').toString().split('|');
    if (!email || parseInt(expStr) < Date.now()) return null;
    if (!email.endsWith('@tigertracks.ai')) return null;
    return { email };
  } catch (e) { return null; }
}

module.exports = async function verifyToken(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return null;

  // Try session token first (short, no external call)
  if (!token.includes('.') === false && token.split('.').length === 2) {
    const sess = verifySessionToken(token);
    if (sess) return sess;
  }

  // Try session token (base64url.hex format — dots in base64url are rare)
  const sessResult = verifySessionToken(token);
  if (sessResult) return sessResult;

  // Fall back to Google ID token verification
  try {
    const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
    if (!r.ok) return null;
    const payload = await r.json();
    const email = (payload.email || '').toLowerCase();
    if (!email.endsWith('@tigertracks.ai')) return null;
    return { email };
  } catch (e) { return null; }
};
