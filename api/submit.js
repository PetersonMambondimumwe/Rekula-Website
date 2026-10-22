import { handleFormSubmission } from '../server/submissionsService.js';

export default async function handler(req, res) {
  // Set CORS headers
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

    const { formType, data } = body || {};

    if (!formType || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required formType or submission data.'
      });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const result = await handleFormSubmission(formType, data, { ip, userAgent });

    return res.status(200).json({
      success: true,
      submissionId: result.submissionId,
      message: 'Your enquiry has been securely received. Our Lead Educator will be in touch shortly.'
    });
  } catch (error) {
    console.error('API /api/submit error:', error.message);
    return res.status(400).json({
      success: false,
      message: error.message || 'An error occurred while processing your submission. Please try again.'
    });
  }
}
