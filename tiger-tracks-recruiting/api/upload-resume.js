import { put } from '@vercel/blob';
import formidable from 'formidable';
import { readFileSync } from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const form = formidable({ maxFileSize: 20 * 1024 * 1024 }); // 20MB max
    const [fields, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ error: 'No file uploaded.' });

    const candidateId = fields.candidateId?.[0] || 'unknown';
    const ext = (file.originalFilename || 'resume.pdf').split('.').pop().toLowerCase();
    const pathname = `resumes/${candidateId}-${Date.now()}.${ext}`;

    const fileBuffer = readFileSync(file.filepath);
    const blob = await put(pathname, fileBuffer, {
      access: 'public',
      contentType: file.mimetype || 'application/pdf',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ ok: true, url: blob.url });
  } catch (e) {
    console.error('upload-resume error:', e.message);
    return res.status(500).json({ error: e.message });
  }
}
