// Vercel serverless function — replaces /api/feedback GET and POST
// Uses Vercel KV for storage (set KV_REST_API_URL + KV_REST_API_TOKEN in Vercel env vars)

const { kv } = require('@vercel/kv');

const GLOBAL_ADMINS = ["cliff@tigertracks.ai","elizabeth@tigertracks.ai","henry@tigertracks.ai"];
const ORG = {
  "Riley Abercrombie":{manager:"Rachel Scharett",practice:"am",email:"riley@tigertracks.ai",reports:["Shelby Nations","Owen Phipps"]},
  "Hannah Price":{manager:"Rachel Scharett",practice:"am",email:"hannah@tigertracks.ai",reports:["Mary McCambridge","Will Sokol"]},
  "Charlotte Pohl":{manager:"Rachel Scharett",practice:"am",email:"charlotte@tigertracks.ai",reports:["Kiyana Saidi-Nejad","Bruno Milalaf","Billy Bevevino","Sanad Shuman"]},
  "Allison Long":{manager:"Rachel Scharett",practice:"am",email:"allison@tigertracks.ai"},
  "Rachel Scharett":{manager:"",practice:"am",email:"rachael@tigertracks.ai",reports:["Riley Abercrombie","Hannah Price","Charlotte Pohl","Allison Long"]},
  "Shelby Nations":{manager:"Riley Abercrombie",practice:"am",email:"shelby@tigertracks.ai",reports:["Megan Brenneke","Seth McDaniel"]},
  "Owen Phipps":{manager:"Riley Abercrombie",practice:"am",email:"owen@tigertracks.ai"},
  "Megan Brenneke":{manager:"Shelby Nations",practice:"am",email:"meganb@tigertracks.ai"},
  "Seth McDaniel":{manager:"Shelby Nations",practice:"am",email:"seth@tigertracks.ai"},
  "Mary McCambridge":{manager:"Hannah Price",practice:"am",email:"mary@tigertracks.ai",reports:["Gretchen Hess"]},
  "Will Sokol":{manager:"Hannah Price",practice:"am",email:"will@tigertracks.ai",reports:["Megan Klein"]},
  "Gretchen Hess":{manager:"Mary McCambridge",practice:"am",email:"gretchen@tigertracks.ai",reports:["Daren Kalkoffen","Evin Leclerc"]},
  "Megan Klein":{manager:"Will Sokol",practice:"am",email:"megank@tigertracks.ai"},
  "Daren Kalkoffen":{manager:"Gretchen Hess",practice:"am",email:"daren@tigertracks.ai"},
  "Evin Leclerc":{manager:"Gretchen Hess",practice:"am",email:"evin@tigertracks.ai"},
  "Kiyana Saidi-Nejad":{manager:"Charlotte Pohl",practice:"am",email:"kiyana@tigertracks.ai",reports:["Tate Dewey"]},
  "Bruno Milalaf":{manager:"Charlotte Pohl",practice:"am",email:"bruno@tigertracks.ai"},
  "Billy Bevevino":{manager:"Charlotte Pohl",practice:"am",email:"billy@tigertracks.ai"},
  "Tate Dewey":{manager:"Kiyana Saidi-Nejad",practice:"am",email:"tate@tigertracks.ai"},
  "Sanad Shuman":{manager:"Charlotte Pohl",practice:"am",email:"sanad@tigertracks.ai"},
  "Alex Blumberg":{manager:"Ashley Kaika",practice:"part",email:"alex@tigertracks.ai"},
  "Steven Jatich":{manager:"Ashley Kaika",practice:"part",email:"steven@tigertracks.ai"},
  "Kersten Kruse":{manager:"Ashley Kaika",practice:"mkt",email:"kersten@tigertracks.ai",reports:["Anirudh Venkat"]},
  "Anirudh Venkat":{manager:"Kersten Kruse",practice:"mkt",email:"anirudh@tigertracks.ai"},
  "Ashley Kaika":{manager:"",practice:"part",email:"ashley@tigertracks.ai"}
};

function getSubordinates(name, visited = new Set()) {
  if (visited.has(name)) return [];
  visited.add(name);
  const p = ORG[name];
  if (!p || !p.reports) return [];
  let result = [];
  for (const r of p.reports) {
    result.push(r);
    result = result.concat(getSubordinates(r, visited));
  }
  return result;
}

function canView(viewerEmail, employeeName) {
  const ve = (viewerEmail || '').toLowerCase();
  if (GLOBAL_ADMINS.includes(ve)) return true;
  if (ve === 'rachael@tigertracks.ai') {
    const emp = ORG[employeeName];
    return emp && emp.practice === 'am';
  }
  const viewerName = Object.keys(ORG).find(n => ORG[n].email === ve);
  if (viewerName === employeeName) return true;
  if (ORG[employeeName] && ORG[employeeName].manager === viewerName) return true;
  if (viewerName) {
    const subs = getSubordinates(viewerName);
    if (subs.includes(employeeName)) return true;
  }
  return false;
}

function canSeeManagerSection(viewerEmail, employeeName) {
  const ve = (viewerEmail || '').toLowerCase();
  if (GLOBAL_ADMINS.includes(ve)) return true;
  const viewerName = Object.keys(ORG).find(n => ORG[n].email === ve);
  const emp = ORG[employeeName];
  if (emp && emp.manager === viewerName) return true;
  return false;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const viewerEmail = (req.headers['x-viewer-email'] || req.query.viewer || '').toLowerCase();

  if (req.method === 'GET') {
    const all = await kv.get('feedback_submissions') || [];
    const filtered = all.filter(d => {
      if (!viewerEmail) return GLOBAL_ADMINS.length === 0;
      return canView(viewerEmail, d.employee);
    }).map(d => {
      const copy = { ...d };
      if (d.managerNotes && !d.released && !canSeeManagerSection(viewerEmail, d.employee)) {
        copy.managerNotes = null;
        copy._managerHidden = true;
      }
      return copy;
    });
    return res.status(200).json(filtered);
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Release endpoint
    if (req.url && req.url.includes('release')) {
      const { id } = body;
      const all = await kv.get('feedback_submissions') || [];
      const idx = all.findIndex(s => s.id === id);
      if (idx >= 0) {
        all[idx].released = true;
        await kv.set('feedback_submissions', all);
      }
      return res.status(200).json({ ok: true });
    }

    // Upsert submission
    const all = await kv.get('feedback_submissions') || [];
    const existing = all.findIndex(s =>
      s.employee === body.employee &&
      s.type === body.type &&
      (body.type === 'weekly' ? s.week === body.week : s.month === body.month)
    );
    const entry = {
      ...body,
      id: body.id || (Date.now() + '-' + Math.random().toString(36).slice(2)),
      savedAt: new Date().toISOString()
    };
    if (existing >= 0) {
      all[existing] = { ...all[existing], ...entry };
    } else {
      all.push(entry);
    }
    await kv.set('feedback_submissions', all);
    return res.status(200).json({ ok: true, id: entry.id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
