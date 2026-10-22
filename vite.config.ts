import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        if (req.url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const { checkDatabaseHealth } = await import('./server/submissionsService.js');
            const health = await checkDatabaseHealth();
            res.statusCode = 200;
            res.end(JSON.stringify(health));
          } catch (err: any) {
            res.statusCode = 503;
            res.end(JSON.stringify({ status: 'unhealthy', error: err.message }));
          }
          return;
        }

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

              const { handleFormSubmission } = await import('./server/submissionsService.js');
              const ip = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress;
              const userAgent = req.headers['user-agent'];

              const result = await handleFormSubmission(formType, data, { ip, userAgent });

              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  submissionId: result.submissionId,
                  message: 'Your enquiry has been securely received.'
                })
              );
            } catch (err: any) {
              res.statusCode = 400;
              res.end(
                JSON.stringify({
                  success: false,
                  message: err.message || 'An error occurred while saving your submission.'
                })
              );
            }
          });
          return;
        }

        if (req.url === '/api/upload' && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          let bodyStr = '';
          req.on('data', chunk => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const { fileBase64, fileName, mimeType, folder = 'uploads' } = body;
              if (!fileBase64 || !fileName) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, message: 'Missing fileBase64 or fileName.' }));
                return;
              }

              let cleanBase64 = fileBase64;
              let detectedMime = mimeType || 'application/octet-stream';
              if (fileBase64.includes(';base64,')) {
                const parts = fileBase64.split(';base64,');
                cleanBase64 = parts[1];
                const mimeMatch = parts[0].match(/data:(.*)/);
                if (mimeMatch && mimeMatch[1]) detectedMime = mimeMatch[1];
              }

              const buffer = Buffer.from(cleanBase64, 'base64');
              const { uploadToSeaweedFS } = await import('./server/storageService.js');
              const result = await uploadToSeaweedFS(buffer, fileName, detectedMime, folder);

              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  url: result.url,
                  path: result.path,
                  fileName: result.fileName,
                  fileSize: result.fileSize,
                  mimeType: result.mimeType,
                  storageProvider: 'seaweedfs',
                  message: 'File stored on SeaweedFS.'
                })
              );
            } catch (err: any) {
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  success: false,
                  message: err.message || 'Failed to upload file to SeaweedFS.'
                })
              );
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevServerPlugin()],
  server: {
    port: 3000,
    host: true,
  },
});
