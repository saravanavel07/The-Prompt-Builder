import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { serverGeneratePrompt, serverRunTest } from './src/server/geminiHandler.ts';

dotenv.config();

function harnessApiPlugin(): Plugin {
  return {
    name: 'harness-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = req.url.split('?')[0];

        if (url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              status: 'online',
              service: 'THE PROMPTBUILDER — AI Prompt Engineering Studio',
              gemini_configured: Boolean(process.env.GEMINI_API_KEY),
              mode: process.env.GEMINI_API_KEY ? 'Real AI (Gemini 3.8 Flash)' : 'Demo Engine (Offline deterministic)',
            })
          );
          return;
        }

        if (url === '/api/prompt/generate' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const result = await serverGeneratePrompt(data);
              res.setHeader('Content-Type', 'application/json');
              if (result) {
                res.end(JSON.stringify(result));
              } else {
                res.end(JSON.stringify({ mode: 'fallback_to_demo' }));
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Server error' }));
            }
          });
          return;
        }

        if (url === '/api/prompt/test-run' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const result = await serverRunTest(data);
              res.setHeader('Content-Type', 'application/json');
              if (result) {
                res.end(JSON.stringify(result));
              } else {
                res.end(JSON.stringify({ mode: 'fallback_to_demo' }));
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Server error' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), harnessApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

