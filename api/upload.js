import { uploadToSeaweedFS } from '../server/storageService.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

const ALLOWED_MIME_TYPES = [
  // PDFs
  'application/pdf',
  // Images
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  // Documents
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, message: 'Invalid JSON request payload.' });
      }
    }

    const { fileBase64, fileName, mimeType, folder = 'uploads' } = body || {};

    if (!fileBase64 || !fileName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required file data (fileBase64 and fileName are required).'
      });
    }

    // Extract raw base64 data if it contains a data URL prefix
    let cleanBase64 = fileBase64;
    let detectedMime = mimeType || 'application/octet-stream';

    if (fileBase64.includes(';base64,')) {
      const parts = fileBase64.split(';base64,');
      cleanBase64 = parts[1];
      const mimeMatch = parts[0].match(/data:(.*)/);
      if (mimeMatch && mimeMatch[1]) {
        detectedMime = mimeMatch[1];
      }
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(detectedMime.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `File type '${detectedMime}' is not supported. Please upload a PDF, Word document, or image (PNG, JPG, WEBP).`
      });
    }

    const fileBuffer = Buffer.from(cleanBase64, 'base64');

    // Validate File Size
    if (fileBuffer.length > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds the 15MB limit. Please upload a smaller file.'
      });
    }

    // Upload to SeaweedFS
    const uploadResult = await uploadToSeaweedFS(
      fileBuffer,
      fileName,
      detectedMime,
      folder
    );

    return res.status(200).json({
      success: true,
      url: uploadResult.url,
      path: uploadResult.path,
      fileName: uploadResult.fileName,
      fileSize: uploadResult.fileSize,
      mimeType: uploadResult.mimeType,
      storageProvider: 'seaweedfs',
      message: 'File successfully stored on SeaweedFS private storage cluster.'
    });
  } catch (error) {
    console.error('[API /api/upload error]:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred while storing the file on SeaweedFS.'
    });
  }
}
