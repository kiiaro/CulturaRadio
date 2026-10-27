import { useEffect, useRef } from 'react';
import { artistas, coresRegiao, regioes } from '../data/dados.js';
import { creditosFotos, fotos, posicaoFotos } from '../data/fotos.js';

export const youtubeLink = (artist, track) => `https://www.youtube.com/results?search_query=${encodeURIComponent(`${artist.nome} ${track.titulo}`)}`;

function Portrait({ artist, className, lazy = false }) {
  return fotos[artist.id]
    ? <img className={className} src={fotos[artist.id]} alt={`Fotografia de ${artist.nome}`} loading={lazy ? 'lazy' : 'eager'} decoding="async" style={{objectPosition:`${posicaoFotos[artist.id] || '50%'} 25%`}} />
    : <span className="ph" aria-hidden="true">{artist.nome[0]}</span>;
}

export function ArtistCard({ artist, index, onSelect }) {
  return <button className="card" style={{background:coresRegiao[artist.regiao]}} onClick={() => onSelect(artist)}>
    <Portrait artist={artist} lazy />
    <span className="num" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
    <span className="in"><span className="m">{artist.regiao} • {artist.periodo}</span><h3>{artist.nome}</h3><span className="m">{artist.generos.join(' • ')}</span><p>{artist.apelido || artist.origem}</p><span className="go">CONHECER →</span></span>
  </button>;
}

export function RegionFilter({ selected, onChange }) {
  return <div className="reg" id="reg">{regioes.map(region => <button key={region} aria-pressed={selected === region} onClick={() => onChange(region)}><b>{region}</b><small>{artistas.filter(artist => artist.regiao === region).map(artist => artist.nome).join(', ') || 'em pesquisa'}</small></button>)}</div>;
}

export function ArtistDialog({ artist, onClose, onPlay }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (artist && !dialog.open) dialog.showModal();
    if (!artist && dialog.open) dialog.close();
  }, [artist]);
  const credit = artist && creditosFotos[artist.id];
  return <dialog ref={ref} id="dlg" aria-labelledby="dn" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    {artist && <>
      <button className="btn x" onClick={onClose} aria-label="Fechar ficha">FECHAR ✕</button>
      <div className="dh" style={{background:coresRegiao[artist.regiao]}}><Portrait artist={artist} className="hi" /><span className="k" style={{color:'var(--ow)'}}>{artist.regiao}</span><h2 id="dn">{artist.nome}</h2><h3>{artist.curadoria}</h3><p>{[artist.apelido,...artist.generos].filter(Boolean).map(tag => <span className="pill" key={tag}>{tag}</span>)}</p></div>
      <div className="fc"><div><small>Nascimento</small><span>{artist.nascimento}</span></div><div><small>Naturalidade</small><span>{artist.origem}</span></div>{artist.falecimento && <div><small>Falecimento</small><span>{artist.falecimento}</span></div>}<div><small>Carreira</small><span>{artist.periodo}</span></div></div>
      <div className="db"><div><h3>TRAJETÓRIA</h3><p>{artist.biografia}</p><h3>LEGADO</h3><p>{artist.legado}</p></div><div><h3>OUÇA ESSA VOZ</h3><div className="sl">{artist.musicas.map((track,index) => <a className="sg" key={`${track.titulo}-${index}`} href={youtubeLink(artist,track)} target="_blank" rel="noopener noreferrer" onClick={event => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); onPlay(artist,index); }}><span className="pl" aria-hidden="true">▶</span><span><b>{track.titulo}</b><small>{[track.album,track.ano].filter(Boolean).join(' • ')}</small></span><span className="ar" aria-hidden="true">↗</span></a>)}</div><h3>ÁLBUNS</h3>{artist.albuns.length ? <div className="ab">{artist.albuns.map(album => <div key={`${album.titulo}-${album.ano}`}><b>{album.ano}</b><span>{album.titulo}</span></div>)}</div> : <p>em pesquisa</p>}</div></div>
      <div className="ft">Fonte de apoio: <a href={`https://pt.wikipedia.org/wiki/${artist.wikipedia}`} target="_blank" rel="noopener noreferrer">Wikipédia</a> (conferir em fontes institucionais). {credit ? <>Foto: <a href={credit.pagina} target="_blank" rel="noopener noreferrer">{credit.autor} / Wikimedia Commons</a> — {credit.licenca}{credit.licencaUrl && <> (<a href={credit.licencaUrl} target="_blank" rel="noopener noreferrer">ver licença</a>)</>}.</> : 'Fotografia: crédito e licença a confirmar.'} Capas de álbum: pendentes. Reprodução pelo YouTube no player do site. A disponibilidade dos vídeos pode variar.</div>
    </>}
  </dialog>;
}
