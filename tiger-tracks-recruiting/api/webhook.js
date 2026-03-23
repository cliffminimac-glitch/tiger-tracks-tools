import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  if (req.method === 'POST') {
    try {
      const payload = req.body;
      const items = Array.isArray(payload) ? payload : [payload];
      const now = new Date().toISOString();

      const existing = await getProspects();
      let added = 0;

      items.forEach(item => {
        const p = normalize(item, 'Webhook', now);
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
    return;
  }

  if (req.method === 'GET') {
    const prospects = await getProspects();
    res.status(200).json({ prospects, total: prospects.length });
    return;
  }

  res.status(404).json({ error: 'Not found' });
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

function normalize(item, source, now) {
  return {
    id: source.toLowerCase().replace(/\s/g,'_') + '_' + Date.now() + '_' + Math.random().toString(36).substr(2,5),
    name: item.name || item.fullName || item.full_name || ((item.firstName||item.first_name||'') + ' ' + (item.lastName||item.last_name||'')).trim() || 'Unknown',
    title: item.title || item.headline || item.currentTitle || item.jobTitle || item.job_title || '',
    company: item.company || item.currentCompany || item.companyName || item.company_name || '',
    location: item.location || item.city || item.region || '',
    linkedinUrl: item.linkedinUrl || item.linkedin_url || item.profileUrl || item.profile_url || item.url || '',
    email: item.email || '',
    source, status: 'new', added: now
  };
}
