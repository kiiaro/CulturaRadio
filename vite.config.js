import { setDefaultResultOrder } from 'node:dns';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { searchYoutube } from './server/youtube-search.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'YOUTUBE_');
  return {
    plugins: [react(), {
      name:'local-youtube-api',
      configureServer(server) {
        // Evita tentativas IPv6 sem rota em redes locais que só alcançam o Google por IPv4.
        setDefaultResultOrder('ipv4first');
        server.middlewares.use(async (req,res,next) => {
          const url = new URL(req.url, 'http://localhost');
          if (url.pathname !== '/api/youtube-search') return next();
          const result = await searchYoutube(new Request(url, {method:req.method}), {key:env.YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY});
          res.statusCode = result.status;
          result.headers.forEach((value,key) => res.setHeader(key,value));
          res.end(await result.text());
        });
      },
    }],
  };
});
