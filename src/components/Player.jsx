import { useEffect, useRef, useState } from 'react';
import { buscarMusica } from '../services/youtube.js';
let apiPromise;
function loadAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    function fail() {
      clearTimeout(timeout);
      script.remove();
      apiPromise = undefined;
      reject(new Error('Não foi possível carregar o player. Tente novamente.'));
    }
    const timeout = setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = () => { clearTimeout(timeout); resolve(window.YT); };
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = fail;
    document.head.append(script);
  });
  return apiPromise;
}

export default function Player(props) {
  return <TrackPlayer key={`${props.artist.id}:${props.index}`} {...props} />;
}

function TrackPlayer({ artist, index, onChange, onClose }) {
  const container = useRef(null);
  const panel = useRef(null);
  const [status, setStatus] = useState('Carregando música…');
  const [retry, setRetry] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const track = artist.musicas[index];
  useEffect(() => {
    document.body.classList.add('has-player');
    const reserveSpace = () => document.body.style.setProperty('--player-height', `${panel.current.getBoundingClientRect().height}px`);
    reserveSpace();
    const observer = new ResizeObserver(reserveSpace);
    observer.observe(panel.current);
    return () => {
      observer.disconnect();
      document.body.classList.remove('has-player');
      document.body.style.removeProperty('--player-height');
    };
  }, []);
  useEffect(() => {
    let disposed = false;
    let player;
    const controller = new AbortController();
    const host = container.current;
    host.replaceChildren();
    setVideoId(null);
    setStatus('Buscando música pelo título e artista…');
    async function start() {
      try {
        const id = await buscarMusica(artist, track, {signal:controller.signal, refresh:retry > 0});
        if (disposed) return;
        setVideoId(id);
        setStatus('Carregando o primeiro resultado do YouTube…');
        const YT = await loadAPI();
        if (disposed) return;
        const mount = document.createElement('div');
        host.append(mount);
        player = new YT.Player(mount, {
          width:'100%', height:'100%', videoId:id,
          playerVars:{playsinline:1, origin:window.location.origin},
          events:{
            onReady(event) { if (!disposed) { setStatus('Use os controles do vídeo para ouvir.'); event.target.playVideo(); } },
            onStateChange(event) {
              if (disposed) return;
              if (event.data === YT.PlayerState.PLAYING) setStatus('Reproduzindo pelo YouTube');
              if (event.data === YT.PlayerState.PAUSED) setStatus('Pausado');
              if (event.data === YT.PlayerState.ENDED) setStatus('Música encerrada. Selecione a próxima faixa.');
            },
            onError(event) {
              if (disposed) return;
              const messages = {
                100:'O primeiro resultado foi removido ou é privado. Use Recarregar para buscar novamente.',
                101:'O responsável pelo vídeo não permite reprodução neste site. Use Abrir no YouTube.',
                150:'O responsável pelo vídeo não permite reprodução neste site. Use Abrir no YouTube.',
                153:'O YouTube não conseguiu identificar a origem do site. Abra em localhost ou no domínio publicado e confira bloqueadores de privacidade.',
              };
              setStatus(messages[event.data] || `Não foi possível reproduzir o vídeo (código ${event.data}). Abra no YouTube ou escolha outra faixa.`);
            },
            onAutoplayBlocked() { if (!disposed) setStatus('Toque no vídeo para iniciar a reprodução.'); },
          },
        });
      } catch (error) { if (!disposed) setStatus(error.message); }
    }
    start();
    return () => { disposed = true; controller.abort(); player?.destroy(); host.replaceChildren(); };
  }, [artist, track, retry]);
  return <section ref={panel} id="mp" aria-label="Player de músicas">
    <div className="player-heading"><strong id="mt">{track.titulo} — {artist.nome}</strong><button type="button" onClick={onClose} aria-label="Fechar player e parar reprodução">✕</button></div>
    <div className="player-video" ref={container} />
    <p id="player-status" role="status" aria-live="polite">{status}</p>
    <div className="player-actions"><button type="button" disabled={index === 0} onClick={() => onChange(index-1)}>← Anterior</button><button type="button" disabled={index === artist.musicas.length-1} onClick={() => onChange(index+1)}>Próxima →</button><button type="button" onClick={() => setRetry(value => value+1)}>Recarregar</button><a href={videoId ? `https://www.youtube.com/watch?v=${videoId}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(`${track.titulo} ${artist.nome}`)}`} target="_blank" rel="noopener noreferrer">Abrir no YouTube ↗</a></div>
  </section>;
}
