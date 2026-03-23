import { put, head } from '@vercel/blob';

const ALLOWED_KEYS = ['candidates', 'positions', 'prospects', 'li_pipeline'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = req.method === 'GET'
    ? (req.query.key || '')
    : ((req.body && req.body.key) || '');

  if (!ALLOWED_KEYS.includes(key)) {
    return res.status(400).json({ ok: false, error: 'Invalid key' });
  }

  const pathname = `ttrec/${key}.json`;

  if (req.method === 'GET') {
    try {
      const blob = await head(pathname);
      const r = await fetch(blob.downloadUrl);
      const data = await r.json();
      return res.status(200).json({ ok: true, data });
    } catch (e) {
      return res.status(200).json({ ok: true, data: [] });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body && req.body.data !== undefined ? req.body.data : [];
      const blob = await put(pathname, JSON.stringify(data), {
        access: 'public',
        allowOverwrite: true,
        addRandomSuffix: false,
        contentType: 'application/json'
      });
      return res.status(200).json({ ok: true, url: blob.url });
    } catch (e) {
      return res.status(500).json({ ok: false, error: e.message });
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
