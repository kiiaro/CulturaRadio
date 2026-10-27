import { useEffect, useState } from 'react';
import { artistas, linhaDoTempo, ritmos } from './data/dados.js';
import { fotos } from './data/fotos.js';
import { ArtistCard, ArtistDialog, RegionFilter } from './components/Artists.jsx';
import Player from './components/Player.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const [region, setRegion] = useState(null);
  const [artist, setArtist] = useState(null);
  const [period, setPeriod] = useState(0);
  const [playback, setPlayback] = useState(null);
  const themeLabel = theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro';
  const filtered = artistas.filter(item => !region || item.regiao === region);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('brasil-plural-tema', theme); } catch { /* Preferência opcional. */ }
  }, [theme]);
  function toggleTheme() { setTheme(value => value === 'light' ? 'dark' : 'light'); }
  function changeRegion(value) {
    setRegion(value === region ? null : value);
    if (value !== region) document.querySelector('#artistas').scrollIntoView();
  }
  function selectTrack(selectedArtist, index) {
    setPlayback({ artist: selectedArtist, index });
    setArtist(null);
  }
  return <>
<nav id="nav" className={menuOpen ? "open" : ""}><b><svg className="brand-icon" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="1.5" y="2.5" width="33" height="23" rx="4" fill="currentColor" fillOpacity=".08" /><path d="M18 5.5 31 14 18 22.5 5 14Z" fill="currentColor" fillOpacity=".16" /><circle cx="18" cy="14" r="5.2" /><path d="M13.2 12.1c3.2-.4 6.7.6 9.6 3" /><circle cx="18.7" cy="16.6" r=".65" fill="currentColor" stroke="none" /><circle cx="16.2" cy="15.5" r=".45" fill="currentColor" stroke="none" /></svg>MOSTRA 2026</b><button id="mb" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="ul">MENU</button>
<ul id="ul" onClick={() => setMenuOpen(false)}><li><a href="#mostra">Mostra 2026</a></li><li><a href="#artistas">Artistas</a></li><li><a href="#ritmos">Ritmos</a></li><li><a href="#tempo">Linha do tempo</a></li><li><a href="#sobre">Sobre</a></li><li className="cta-m"><a className="btn p" href="#artistas">Explorar</a></li></ul>
<button id="theme-toggle" className="theme-toggle" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
<span className="theme-icons" aria-hidden="true">
<svg className="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
<svg className="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/><path d="m17 3 .65 1.85L19.5 5.5l-1.85.65L17 8l-.65-1.85-1.85-.65 1.85-.65L17 3Z"/></svg>
</span></button><div className="cta-d"><a className="btn p" href="#artistas">Explorar</a></div></nav>
<header className="hero" id="mostra"><div className="hero-copy">
<div className="institutional-brand"><span className="senac-mark"><img src="assets/senac-logo.png" alt="Senac" width="148" height="79" /></span><div><b>MEDIOTEC · SENAC</b><span>3º C • Desenvolvimento de Sistemas</span></div></div>
<span className="k">Mostra Cultural 2026</span>
<h1>Brasil<span>Plural<span className="title-dot">.</span></span></h1>
<h3>Um país de muitos Brasis.</h3>
<p className="l">Uma viagem pela música, pelas histórias e pelas diferentes vozes que ajudam a construir a identidade brasileira.</p>
<div className="cta"><a className="btn p" href="#artistas">Explore os artistas →</a><a className="btn" href="#vozes">Conheça a mostra ↓</a></div>
<div className="hero-bottom"><div className="bars" id="hb" aria-hidden="true">{Array.from({length:40}, (_, i) => <i key={i} style={{animationDelay:`${i * .08}s`, height:`${20 + Math.abs(Math.sin(i)) * 80}%`}} />)}</div><span>21 artistas <i>•</i> 5 regiões <i>•</i> Infinitas histórias</span></div></div>
<div className="hero-visual" aria-label="Retratos de vozes da música brasileira">
<span className="visual-orbit" aria-hidden="true"></span>
<figure className="hero-portrait portrait-main"><img src={fotos["luiz-gonzaga"]} id="hero-main" alt="Luiz Gonzaga" /><figcaption><span>Luiz Gonzaga</span></figcaption></figure>
<figure className="hero-portrait portrait-small"><img src={fotos["caetano-veloso"]} id="hero-secondary" alt="Caetano Veloso" /><figcaption>Caetano Veloso</figcaption></figure>
<span className="brasil-emoji" aria-hidden="true"><img src="assets/brasil-emoji.svg" alt="" width="80" height="80" /></span><span className="visual-caption">CULTURA QUE CONECTA.</span>
</div></header>

<section className="light" id="vozes"><div className="rv"><span className="k">Um Brasil, muitas vozes</span><h2>O Brasil não tem uma voz.<br />Tem milhares.</h2>
<p style={{maxWidth: "640px", fontSize: "1.1rem"}}>O Brasil é formado por diferentes regiões, histórias, sotaques, ritmos e tradições. Na música, essa diversidade ganha voz através de artistas que transformaram suas experiências e territórios em cultura.</p>
<p className="k">Toque numa região para filtrar os artistas</p><RegionFilter selected={region} onChange={changeRegion} /></div></section>

<section id="artistas"><span className="k">Galeria</span><h2>Vozes do Brasil</h2>
<p style={{maxWidth: "560px", opacity: ".85", margin: "0 0 28px"}}>Do carimbó paraense à milonga gaúcha, da viola pantaneira à Tropicália e à MPB: vinte e um artistas, vinte e uma trajetórias, muitos Brasis.</p>
<div className="grid" id="grid">{filtered.map(artist => <ArtistCard key={artist.id} artist={artist} index={artistas.indexOf(artist)} onSelect={setArtist} />)}</div>{filtered.length === 0 && <p role="status">Ainda não há artistas cadastrados para a região {region}.</p>}</section>

<section className="light" id="ritmos"><div className="rv"><span className="k">Explore</span><h2>Ritmos do Brasil</h2><p style={{maxWidth: "620px", fontSize: "1.1rem", margin: "0 0 32px"}}>Diferentes regiões, histórias e influências deram origem a uma das músicas mais diversas do mundo. Explore alguns dos ritmos que ajudam a contar a história do Brasil.</p><div className="rh" id="rh">{ritmos.map((item,i) => <article key={item.nome} style={{"--c": ["#176B4D", "#B94A32", "#173B57", "#E7B83C"][i%4]}}><span className="n">{String(i+1).padStart(2,"0")}</span><h3>{item.nome}</h3><p>{item.texto}</p></article>)}</div></div></section>

<section id="tempo"><span className="k">Linha do tempo</span><h2>Uma história em ritmos</h2><div className="tl" id="tl">{linhaDoTempo.map((item,i) => <button key={item.periodo} aria-expanded={period === i} onClick={() => setPeriod(i)}><h3>{item.periodo}</h3><p>{item.texto}</p></button>)}</div></section>

<section className="light" id="sobre"><div className="rv"><span className="k">Sobre a mostra</span><h2>Mostra Cultural 2026</h2><h3 style={{fontSize: "2.2rem", color: "var(--tc)"}}>Brasil Plural: um país de muitos Brasis</h3>
<p style={{maxWidth: "660px", fontSize: "1.1rem"}}>Este projeto foi desenvolvido pela turma <b>3º C — Desenvolvimento de Sistemas (DS)</b> do <b>MEDIOTEC — SENAC</b>, como parte da Mostra Cultural 2026. A proposta é explorar a diversidade da música brasileira através de diferentes artistas, gêneros, regiões e períodos históricos.</p>
<h3 style={{fontSize: "2rem", marginTop: "36px"}}>Fontes e créditos</h3>
<p style={{maxWidth: "660px"}}><b>Informações:</b> <a href="https://pt.wikipedia.org">Wikipédia (apoio)</a>, <a href="https://enciclopedia.itaucultural.org.br">Enciclopédia Itaú Cultural</a>, conferir em fontes institucionais. <b>Fotografias:</b> imagens do <a href="https://commons.wikimedia.org">Wikimedia Commons</a>, com créditos e licenças nas fichas dos artistas. <b>Música:</b> reprodução e busca pelo <a href="https://www.youtube.com">YouTube</a>.</p></div></section>

    <section className="cr"><span className="k" style={{ color: "var(--ye)" }}>Desenvolvido pela turma</span><h2>3º C</h2><h3>DESENVOLVIMENTO DE SISTEMAS • DS</h3>
      <p>MEDIOTEC — SENAC • MOSTRA CULTURAL 2026<br />BRASIL PLURAL: UM PAÍS DE MUITOS BRASIS</p><code>&lt;cultura &gt; {'{ código: "música brasileira" }'} &lt;/ cultura &gt; </code>
      <p>Projeto desenvolvido pelos estudantes Alisson Marinho e Henrique do Nascimento com orientação do Instrutor Henrique Venâncio</p>
    </section>

<footer><div className="footer-institution"><span className="senac-mark"><img src="assets/senac-logo.png" alt="Senac" width="148" height="79" loading="lazy" /></span><span>Uma mostra cultural do<br /><strong>MEDIOTEC · SENAC</strong></span></div><div><b style={{font: "1.8rem var(--d)"}}>MOSTRA CULTURAL 2026</b><br />Brasil Plural: Um País de Muitos Brasis<br />Projeto desenvolvido pela turma 3º C — Desenvolvimento de Sistemas (DS)<br />MEDIOTEC — SENAC</div>
<ul><li><a href="#mostra">Início</a></li><li><a href="#artistas">Artistas</a></li><li><a href="#ritmos">Ritmos</a></li><li><a href="#tempo">Linha do tempo</a></li><li><a href="#sobre">Sobre</a></li></ul><em>Um país. Muitos ritmos. Infinitas histórias.</em></footer>

<ArtistDialog artist={artist} onClose={() => setArtist(null)} onPlay={selectTrack} />
{playback && <Player artist={playback.artist} index={playback.index} onChange={index => setPlayback({...playback, index})} onClose={() => setPlayback(null)} />}
</>;
}
