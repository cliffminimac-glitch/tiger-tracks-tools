import { put } from '@vercel/blob';
import formidable from 'formidable';
import { createReadStream, readFileSync } from 'fs';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    // Parse multipart form
    const form = formidable({ maxFileSize: 200 * 1024 * 1024 }); // 200MB max
    const [fields, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ error: 'No file uploaded.' });

    const candidateName = fields.candidateName?.[0] || 'Candidate';

    // Upload to Vercel Blob for processing
    const fileBuffer = readFileSync(file.filepath);
    const blobResult = await put(
      `interview-recordings/${Date.now()}-${file.originalFilename || 'recording'}`,
      fileBuffer,
      { access: 'public', contentType: file.mimetype, token: process.env.BLOB_READ_WRITE_TOKEN }
    );

    // Transcribe via OpenAI Whisper if key available
    if (process.env.OPENAI_API_KEY) {
      const { default: OpenAI } = await import('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const transcription = await openai.audio.transcriptions.create({
        file: createReadStream(file.filepath),
        model: 'whisper-1',
        response_format: 'text',
      });

      return res.status(200).json({ ok: true, transcript: transcription, blobUrl: blobResult.url });
    }

    // Fallback: transcribe via AssemblyAI if key available
    if (process.env.ASSEMBLYAI_API_KEY) {
      const uploadRes = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: { 'authorization': process.env.ASSEMBLYAI_API_KEY },
        body: fileBuffer,
      });
      const { upload_url } = await uploadRes.json();

      const transcriptRes = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: { 'authorization': process.env.ASSEMBLYAI_API_KEY, 'content-type': 'application/json' },
        body: JSON.stringify({ audio_url: upload_url, speaker_labels: true }),
      });
      const { id: transcriptId } = await transcriptRes.json();

      // Poll for completion (up to 55s to stay within Vercel timeout)
      const deadline = Date.now() + 55000;
      while (Date.now() < deadline) {
        await new Promise(r => setTimeout(r, 3000));
        const poll = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          headers: { 'authorization': process.env.ASSEMBLYAI_API_KEY }
        });
        const pollData = await poll.json();
        if (pollData.status === 'completed') {
          return res.status(200).json({ ok: true, transcript: pollData.text, blobUrl: blobResult.url });
        }
        if (pollData.status === 'error') {
          return res.status(500).json({ error: 'Transcription failed: ' + pollData.error });
        }
      }
      // Timed out — return blob URL for async check
      return res.status(200).json({
        ok: true,
        pending: true,
        transcriptId,
        blobUrl: blobResult.url,
        error: 'Transcription is still processing. Paste the transcript manually or try again in a moment.'
      });
    }

    // No transcription service configured
    return res.status(200).json({
      ok: false,
      blobUrl: blobResult.url,
      error: 'No transcription service configured. Add OPENAI_API_KEY or ASSEMBLYAI_API_KEY to Vercel env vars to enable auto-transcription. Recording saved — paste the transcript manually.'
    });

  } catch (e) {
    console.error('transcribe-interview error:', e.message);
    return res.status(500).json({ error: e.message });
  }
}
