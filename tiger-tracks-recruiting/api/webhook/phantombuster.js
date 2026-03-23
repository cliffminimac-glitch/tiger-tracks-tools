import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const payload = req.body;
    const results = payload.results || payload.output || payload.data || (Array.isArray(payload) ? payload : [payload]);
    const now = new Date().toISOString();

    const existing = await getProspects();
    let added = 0;

    results.forEach(item => {
      const p = {
        id: 'pb_' + Date.now() + '_' + Math.random().toString(36).substr(2,5),
        name: item.name || item.fullName || ((item.firstName||'') + ' ' + (item.lastName||'')).trim() || 'Unknown',
        title: item.title || item.headline || item.jobTitle || '',
        company: item.company || item.companyName || item.currentCompany || '',
        location: item.location || item.city || '',
        linkedinUrl: item.profileUrl || item.linkedInProfileUrl || item.url || '',
        email: item.email || '',
        source: 'PhantomBuster',
        phantom: item.phantomName || '',
        status: 'new', added: now
      };
      const isDupe = existing.some(e =>
        (p.linkedinUrl && e.linkedinUrl === p.linkedinUrl) ||
        (p.name === e.name && p.company === e.company && p.name !== 'Unknown')
      );
      if (!isDupe) { existing.push(p); added++; }
    });

    await saveProspects(existing);
    res.status(200).json({ success: true, added, total: existing.length });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getProspects() {
  try {
    const { blobs } = await list({ prefix: 'recruiting/prospects.json' });
    if (!blobs.length) return [];
    const r = await fetch(blobs[0].url);
    return await r.json();
  } catch { return []; }
}

async function saveProspects(data) {
  await put('recruiting/prospects.json', JSON.stringify(data), { access: 'public', allowOverwrite: true });
}
