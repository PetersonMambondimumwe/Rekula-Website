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
