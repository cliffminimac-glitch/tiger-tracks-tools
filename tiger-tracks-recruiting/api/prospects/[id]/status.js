import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { id } = req.query;
  const { status } = req.body;
  if (!id || !status) { res.status(400).json({ error: 'Missing id or status' }); return; }

  try {
    const { blobs } = await list({ prefix: 'recruiting/prospects.json' });
    let prospects = [];
    if (blobs.length) {
      const r = await fetch(blobs[0].url + '?t=' + Date.now());
      prospects = await r.json();
    }
    const p = prospects.find(x => x.id === id);
    if (!p) { res.status(404).json({ error: 'Not found' }); return; }
    p.status = status;
    await put('recruiting/prospects.json', JSON.stringify(prospects), { access: 'public', allowOverwrite: true });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
