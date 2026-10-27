// Toda faixa é resolvida pela busca, inclusive quando há um link antigo no catálogo.
export async function buscarMusica(artist, track, { signal, refresh = false, fetcher = fetch } = {}) {
  const params = new URLSearchParams({ q: `${track.titulo} ${artist.nome}` });
  if (refresh) params.set('refresh', '1');
  const response = await fetcher(`/api/youtube-search?${params}`, {
    signal,
    ...(refresh ? { cache: 'no-store' } : {}),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.videoId) {
    throw new Error(result.error || 'Não foi possível buscar esta música. Tente novamente.');
  }
  return result.videoId;
}
