// Compartilhado pela função Vercel e pelo middleware local do Vite.
export async function searchYoutube(request, { key = process.env.YOUTUBE_API_KEY, fetcher = fetch } = {}) {
  const json = (body, status = 200) => Response.json(body, {status});
  if (request.method !== 'GET') return json({error:'Método não permitido.'},405);
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get('q')?.trim();
  const refresh = searchParams.get('refresh') === '1';
  if (!query || query.length > 200) return json({error:'Busca inválida.'},400);
  if (!key) return json({error:'Configure YOUTUBE_API_KEY no servidor para buscar músicas.'},503);
  try {
    const params = new URLSearchParams({part:'snippet',type:'video',videoEmbeddable:'true',videoSyndicated:'true',maxResults:'1',order:'relevance',q:query,key});
    let response;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        response = await fetcher(`https://www.googleapis.com/youtube/v3/search?${params}`, {signal:AbortSignal.timeout(15000), ...(refresh ? {cache:'no-store'} : {})});
        if (response.status >= 500 && attempt === 0) continue;
        break;
      } catch (error) {
        if (attempt === 1) throw error;
      }
    }
    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      const reason = details.error?.errors?.[0]?.reason;
      const messages = {
        quotaExceeded:'A cota de buscas do YouTube foi atingida. Tente novamente após a renovação da cota.',
        dailyLimitExceeded:'O limite diário de buscas do YouTube foi atingido.',
        accessNotConfigured:'Habilite a YouTube Data API v3 no projeto da chave no Google Cloud.',
        keyInvalid:'A chave do YouTube não é válida. Confira YOUTUBE_API_KEY no servidor.',
        ipRefererBlocked:'As restrições da chave do Google impedem a busca pelo servidor.',
      };
      return json({error:messages[reason] || 'O Google recusou a busca. Confira a habilitação da API, as restrições da chave e a cota no Google Cloud.'},502);
    }
    const data = await response.json();
    const videoId = data.items?.[0]?.id?.videoId;
    if (!videoId) return json({error:'Nenhum vídeo disponível para esta música.'},404);
    return Response.json({videoId},{headers:{'Cache-Control':refresh ? 'no-store' : 'public, max-age=86400'}});
  } catch (error) {
    const timedOut = error.name === 'TimeoutError' || error.name === 'AbortError';
    return json({error:timedOut ? 'O Google demorou para responder à busca. Tente recarregar a faixa.' : 'O servidor não conseguiu se conectar ao Google. Confira a conexão e tente recarregar a faixa.'},504);
  }
}
