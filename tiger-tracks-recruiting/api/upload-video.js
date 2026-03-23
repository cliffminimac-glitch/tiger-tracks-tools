import { generateClientTokenFromReadWriteToken } from '@vercel/blob/client';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const body = req.body;

    // Client requests a token to upload directly to Vercel Blob
    if (body && body.type === 'blob.generate-client-token') {
      const { pathname } = body;
      if (!pathname) return res.status(400).json({ error: 'pathname required' });

      const clientToken = await generateClientTokenFromReadWriteToken({
        token: process.env.BLOB_READ_WRITE_TOKEN,
        pathname,
        // No callbackUrl — we get the URL directly from the PUT response
        allowedContentTypes: ['video/webm', 'video/mp4', 'video/quicktime', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        maximumSizeInBytes: 500 * 1024 * 1024, // 500MB
      });

      return res.status(200).json({ clientToken });
    }

    // Handle upload-completed callback (called by Vercel Blob CDN after direct upload)
    if (body && body.type === 'blob.upload-completed') {
      console.log('Video upload completed:', body.blob?.url);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Unknown request type' });
  } catch (error) {
    console.error('Upload handler error:', error.message);
    return res.status(400).json({ error: error.message });
  }
}
