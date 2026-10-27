import { searchYoutube } from '../server/youtube-search.js';

// Handler Node.js da Vercel; a chave é lida somente no servidor.
export default async function handler(req, res) {
  const response = await searchYoutube(new Request(new URL(req.url, 'http://localhost'), {method:req.method}));
  res.statusCode = response.status;
  response.headers.forEach((value,key) => res.setHeader(key,value));
  res.end(await response.text());
}
