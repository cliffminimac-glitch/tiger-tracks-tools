import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  if (req.method === 'GET') {
    const prospects = await getProspects();
    const { status, since } = req.query;
    let filtered = prospects;
    if (status) filtered = filtered.filter(p => p.status === status);
    if (since) filtered = filtered.filter(p => p.added >= since);
    res.status(200).json({ prospects: filtered, total: filtered.length });
    return;
  }

  if (req.method === 'DELETE') {
    await put('recruiting/prospects.json', '[]', { access: 'public', allowOverwrite: true });
    res.status(200).json({ success: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}

async function getProspects() {
  try {
    const { blobs } = await list({ prefix: 'recruiting/prospects.json' });
    if (!blobs.length) return [];
    const r = await fetch(blobs[0].url + '?t=' + Date.now());
    return await r.json();
  } catch { return []; }
}
