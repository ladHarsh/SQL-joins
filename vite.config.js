import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import handler from './api/ask-ai.js'

export default defineConfig(({ mode }) => {
  // Load env variables into process.env for server-side handlers
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'local-api-dev',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/ask-ai') {
              if (req.method !== 'POST') {
                res.statusCode = 405;
                res.end('Method Not Allowed');
                return;
              }

              // Parse body
              let body = '';
              for await (const chunk of req) {
                body += chunk;
              }

              try {
                const jsonBody = JSON.parse(body || '{}');
                
                // Simulate Vercel req/res for the handler
                const simulatedReq = { method: req.method, body: jsonBody };
                const simulatedRes = {
                  status: (code) => {
                    res.statusCode = code;
                    return simulatedRes;
                  },
                  json: (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  },
                  setHeader: (k, v) => res.setHeader(k, v)
                };

                console.log(`[API] Intercepted call to /api/ask-ai for question: ${jsonBody.question?.substring(0, 30)}...`);
                await handler(simulatedReq, simulatedRes);
              } catch (err) {
                console.error('[API] Error in local handler:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: "Local API Handler Error", details: err.message }));
              }
              return;
            }
            next();
          });
        }
      }
    ],
  }
})
