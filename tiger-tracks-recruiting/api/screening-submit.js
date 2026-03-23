import { Resend } from 'resend';
import { put, list } from '@vercel/blob';

// Auto-transcribe a video URL using OpenAI Whisper (requires OPENAI_API_KEY)
async function transcribeVideoUrl(videoUrl) {
  if (!process.env.OPENAI_API_KEY) return null;
  try {
    // Download the video blob
    const videoResp = await fetch(videoUrl);
    if (!videoResp.ok) return null;
    const videoBuffer = await videoResp.arrayBuffer();

    // Send to OpenAI Whisper via multipart form
    const formData = new FormData();
    formData.append('file', new Blob([videoBuffer], { type: 'video/webm' }), 'recording.webm');
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'text');

    const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: formData
    });
    if (!resp.ok) return null;
    const text = await resp.text();
    return text.trim() || null;
  } catch (e) {
    console.error('Transcription error:', e.message);
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { candidate, email, role, roleName, questionsAnswered, totalQuestions, questions, videoUrls } = req.body;

    const submittedAt = new Date().toISOString();
    const submissionId = 'screen_' + Date.now();

    // === PERSIST SUBMISSION TO VERCEL BLOB ===
    const submissionData = {
      id: submissionId,
      candidate,
      email,
      role,
      roleName,
      questionsAnswered,
      totalQuestions,
      questions,
      videoUrls: videoUrls || {},
      submittedAt
    };

    // Save individual submission file
    await put(
      `screening-submissions/${submissionId}.json`,
      JSON.stringify(submissionData, null, 2),
      { access: 'public', contentType: 'application/json', token: process.env.BLOB_READ_WRITE_TOKEN }
    );

    // Update rolling submissions log
    let allSubmissions = [];
    try {
      const { blobs } = await list({ prefix: 'screening-submissions/log.json', token: process.env.BLOB_READ_WRITE_TOKEN });
      if (blobs.length > 0) {
        const resp = await fetch(blobs[0].url);
        allSubmissions = await resp.json();
      }
    } catch(e) { /* first submission */ }
    allSubmissions.push(submissionData);
    await put(
      'screening-submissions/log.json',
      JSON.stringify(allSubmissions, null, 2),
      { access: 'public', contentType: 'application/json', token: process.env.BLOB_READ_WRITE_TOKEN, addRandomSuffix: false }
    );

    // === AUTO-TRANSCRIBE VIDEOS ===
    const urls = videoUrls || {};
    const transcripts = {};
    const videoIndexes = Object.keys(urls).filter(k => urls[k]);
    if (videoIndexes.length > 0) {
      await Promise.all(videoIndexes.map(async (i) => {
        const t = await transcribeVideoUrl(urls[i]);
        if (t) transcripts[i] = t;
      }));
    }

    // Update submission with transcripts
    if (Object.keys(transcripts).length > 0) {
      submissionData.transcripts = transcripts;
      await put(
        `screening-submissions/${submissionId}.json`,
        JSON.stringify({ ...submissionData, transcripts }, null, 2),
        { access: 'public', contentType: 'application/json', token: process.env.BLOB_READ_WRITE_TOKEN, addRandomSuffix: false }
      );
    }

    // === SEND EMAIL ===
    const resend = new Resend(process.env.RESEND_API_KEY);
    const qSummary = (questions || []).map((q, i) => {
      const vidUrl = urls[i];
      const transcript = transcripts[i];
      const durationCell = q.skipped
        ? '<span style="color:#dc2626;">Skipped</span>'
        : '<span style="color:#059669;">'+q.duration+'s</span>';
      const videoCell = vidUrl
        ? `<a href="${vidUrl}" style="color:#229FA1;font-weight:700;white-space:nowrap;">▶ Watch Video</a>`
        : '<span style="color:#6b7280;font-size:.75rem;">not recorded</span>';
      const transcriptRow = transcript
        ? `<tr><td colspan="4" style="padding:.35rem .75rem .6rem;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:.78rem;color:#374151;font-style:italic;">📝 <em>${transcript}</em></td></tr>`
        : '';
      return `<tr>
        <td style="padding:.4rem .75rem;border-bottom:1px solid #e5e7eb;color:#6b7280;">${i+1}</td>
        <td style="padding:.4rem .75rem;border-bottom:1px solid #e5e7eb;">${q.q}</td>
        <td style="padding:.4rem .75rem;border-bottom:1px solid #e5e7eb;text-align:center;">${durationCell}</td>
        <td style="padding:.4rem .75rem;border-bottom:1px solid #e5e7eb;text-align:center;">${videoCell}</td>
      </tr>${transcriptRow}`
    }).join('');

    const html = `
<div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;color:#1B2126;">
  <div style="background:#1B2126;padding:1.25rem 2rem;border-radius:10px 10px 0 0;">
    <span style="color:#229FA1;font-weight:900;font-size:1.1rem;">TIGER TRACKS</span>
    <span style="color:rgba(255,255,255,.5);font-size:.8rem;margin-left:.75rem;">Video Screening Submitted</span>
  </div>
  <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:1.5rem 2rem;border-radius:0 0 10px 10px;">
    <h2 style="margin:0 0 1rem;font-size:1.2rem;">🎬 Screening Complete: ${candidate}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:.88rem;margin-bottom:1rem;">
      <tr><td style="padding:.35rem 0;color:#6b7280;width:120px;">Role</td><td><strong>${roleName}</strong></td></tr>
      <tr><td style="padding:.35rem 0;color:#6b7280;">Candidate Email</td><td>${email||'Not provided'}</td></tr>
      <tr><td style="padding:.35rem 0;color:#6b7280;">Questions</td><td>${questionsAnswered} of ${totalQuestions} answered</td></tr>
    </table>
    <h3 style="font-size:.9rem;margin-bottom:.5rem;">Question Breakdown</h3>
    <table style="width:100%;border-collapse:collapse;font-size:.82rem;">
      <thead><tr style="background:#f8f7f4;">
        <th style="padding:.4rem .75rem;text-align:left;color:#6b7280;">#</th>
        <th style="padding:.4rem .75rem;text-align:left;color:#6b7280;">Question</th>
        <th style="padding:.4rem .75rem;text-align:center;color:#6b7280;">Duration</th>
        <th style="padding:.4rem .75rem;text-align:center;color:#6b7280;">Video</th>
      </tr></thead>
      <tbody>${qSummary}</tbody>
    </table>
    <p style="margin-top:1rem;font-size:.8rem;color:#6b7280;">Videos stored in Vercel Blob under <code>screen-recordings/${role}/</code>. Links are permanent.</p>
  </div>
</div>`;

    await resend.emails.send({
      from: 'Tiger Tracks Recruiting <recruiting@tigertracks.ai>',
      to: ['elizabeth@tigertracks.ai', 'cliff@tigertracks.ai'],
      subject: `🎬 Video Screening Complete: ${candidate} — ${roleName}`,
      html
    });

    res.status(200).json({ ok: true, success: true, id: submissionId });
  } catch (e) {
    console.error('screening-submit error:', e.message);
    res.status(500).json({ error: e.message });
  }
}
