# Player do YouTube

O componente React `src/components/Player.jsx` usa a IFrame Player API oficial, mantendo o vídeo e seus controles visíveis. Há anterior/próxima por artista, recarregamento e fechamento que interrompe a reprodução. Buscas pendentes são canceladas ao trocar ou fechar a faixa, e o player é destruído ao desmontar.

Todas as 93 músicas são resolvidas automaticamente pelo título e artista pela rota `/api/youtube-search`. O sistema reproduz o primeiro resultado por relevância que permita incorporação, sem usar os links antigos de `src/data/dados.js`. O link externo acompanha o vídeo encontrado. Configure `YOUTUBE_API_KEY` no `.env` local ou no ambiente da Vercel; nunca no código público nem com prefixo `VITE_`. Não há extração de áudio.

Não há seleção manual de resultados. A busca pode retornar uma gravação diferente. Se o resultado falhar, Recarregar faz uma nova consulta ignorando o cache HTTP. A consulta ainda pode devolver o mesmo vídeo caso ele continue sendo o primeiro resultado do Google.

Há cache HTTP de 24 horas nas consultas normais. A rota é pública e consome a cota do projeto Google; monitore a cota do provedor. Vídeos podem ter bloqueios de incorporação, idade ou região, e o navegador pode exigir toque no vídeo para começar. Não há garantia de reprodução em segundo plano.

## Verificação manual

- Abrir uma ficha e selecionar qualquer música: a ficha fecha e o vídeo aparece.
- Testar reprodução/pausa, progresso e volume nos controles oficiais.
- Alternar anterior/próxima; os limites da lista ficam desabilitados.
- Fechar o player e confirmar que a reprodução para.
- Selecionar outra faixa rapidamente durante uma busca e confirmar que a anterior não começa depois.
- Testar uma música com chave e sem ela: vídeo ou mensagem de configuração, respectivamente.
- Testar vídeo bloqueado e celular; o link externo permanece acessível.
