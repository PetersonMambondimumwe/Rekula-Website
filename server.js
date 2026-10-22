import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleFormSubmission, checkDatabaseHealth } from './server/submissionsService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // 1. Health API
  if (req.url === '/api/health' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    try {
      const health = await checkDatabaseHealth();
      res.statusCode = 200;
      res.end(JSON.stringify(health));
    } catch (err) {
      res.statusCode = 503;
      res.end(JSON.stringify({ status: 'unhealthy', error: err.message }));
    }
    return;
  }

  // 2. Submit API
  if (req.url === '/api/submit' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    let bodyStr = '';
    req.on('data', chunk => {
      bodyStr += chunk;
    });
    req.on('end', async () => {
      try {
        const body = JSON.parse(bodyStr || '{}');
        const { formType, data } = body;
        if (!formType || !data) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, message: 'Missing formType or data payload.' }));
          return;
        }

        const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
        const userAgent = req.headers['user-agent'];

        const result = await handleFormSubmission(formType, data, { ip, userAgent });

        res.statusCode = 200;
        res.end(JSON.stringify({
          success: true,
          submissionId: result.submissionId,
          message: 'Your enquiry has been securely received.'
        }));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({
          success: false,
          message: err.message || 'An error occurred while saving your submission.'
        }));
      }
    });
    return;
  }

  // 3. Static File Server for Production
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA client-side routing
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.statusCode = 404;
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        }
      });
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Re:kula production server listening on http://localhost:${PORT}`);
});
