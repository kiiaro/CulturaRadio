# Brasil Plural — Mostra Cultural 2026

Site em React + Vite com 21 artistas, 93 músicas, filtro por região, fichas, temas claro/escuro e player incorporado do YouTube. Use Node.js 22.12 ou superior.

## Rodar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173). Preencha `YOUTUBE_API_KEY` no `.env` e reinicie o Vite para habilitar a busca de músicas. O próprio servidor de desenvolvimento executa `/api/youtube-search`; não precisa de Netlify CLI nem Vercel CLI. Todas as músicas são pesquisadas automaticamente por título e artista; a chave é necessária para o player.

```bash
npm test
npm run build
npm run preview
```

`preview` serve apenas os arquivos estáticos de produção; a busca funciona no desenvolvimento e nas Functions da Vercel.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Use a raiz do repositório como Root Directory e o preset **Vite**. O build é `npm run build`, com saída `dist` (também definidos em `vercel.json`). Use Node.js 22.x ou superior.
3. Em Settings → Environment Variables, adicione `YOUTUBE_API_KEY` para os ambientes desejados. Não use o prefixo `VITE_`.
4. Faça o deploy. Ao mudar a variável, faça um novo deploy.

`api/youtube-search.js` é uma Function Node.js da Vercel. A lógica compartilhada está em `server/youtube-search.js`. A chave não é enviada ao navegador. Habilite YouTube Data API v3 no Google Cloud e restrinja a chave a essa API. Arquivos `.env` estão ignorados pelo Git.

## Estrutura

- `src/App.jsx`: seções da página, navegação, tema e seleção.
- `src/components/`: galeria, modal e player com limpeza ao trocar de faixa ou fechar.
- `src/data/`: catálogo e créditos/fotografias originais.
- `src/styles/`: identidade visual e responsividade.
- `public/assets/`: imagens e créditos copiados pelo Vite para o build.
- `api/` e `server/`: busca no servidor.
- `tests/`: validação do serviço e do adaptador Vercel.

Veja [PLAYER.md](./PLAYER.md) para limites e validação do player.
