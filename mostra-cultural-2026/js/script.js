// ---------- FUNÇÕES E INICIALIZAÇÃO ----------
// Este arquivo usa os dados de dados.js e as fotos de fotos.js

// ---------- 2. FUNÇÕES AUXILIARES ----------
function pegar(seletor) {
  return document.querySelector(seletor);
}

function linkWikipedia(nome) {
  return 'https://pt.wikipedia.org/wiki/' + nome;
}

function linkYoutube(busca) {
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(busca);
}

// Cria as barrinhas da animação de onda sonora
function criarOnda(elemento, quantidade, comAltura) {
  let html = '';
  for (let i = 0; i < quantidade; i++) {
    let estilo = 'animation-delay:' + (i * 0.08) + 's;';
    if (comAltura) {
      estilo += 'height:' + (20 + Math.abs(Math.sin(i)) * 80) + '%';
    }
    html += '<i style="' + estilo + '"></i>';
  }
  elemento.innerHTML = html;
}

// ---------- 3. GALERIA DE ARTISTAS ----------
function criarCard(artista, indice) {
  const numero = String(indice + 1).padStart(2, '0');
  const cor = coresRegiao[artista.regiao];
  const subtitulo = artista.apelido || artista.origem;

  let foto = '';
  if (fotos[artista.id]) {
    foto = `<img src="${fotos[artista.id]}" alt="Fotografia de ${artista.nome}" loading="lazy" decoding="async" style="object-position:${posicaoFotos[artista.id] || '50%'} 25%">`;
  } else {
    foto = `<span class="ph" aria-hidden="true">${artista.nome[0]}</span>`;
  }

  return `
    <button class="card" data-id="${artista.id}" data-r="${artista.regiao}" style="background:${cor}">
      ${foto}
      <span class="num" aria-hidden="true">${numero}</span>
      <span class="in">
        <span class="m">${artista.regiao} • ${artista.periodo}</span>
        <h3>${artista.nome}</h3>
        <span class="m">${artista.generos.join(' • ')}</span>
        <p>${subtitulo}</p>
        <span class="go">CONHECER →</span>
      </span>
    </button>`;
}

function mostrarGaleria() {
  let html = '';
  for (let i = 0; i < artistas.length; i++) {
    html += criarCard(artistas[i], i);
  }
  pegar('#grid').innerHTML = html;
}

// ---------- 4. REGIÕES ----------
function mostrarRegioes() {
  let html = '';
  for (let i = 0; i < regioes.length; i++) {
    const regiao = regioes[i];
    const nomes = [];
    for (let j = 0; j < artistas.length; j++) {
      if (artistas[j].regiao === regiao) {
        nomes.push(artistas[j].nome);
      }
    }
    let lista = 'em pesquisa';
    if (nomes.length > 0) {
      lista = nomes.join(', ');
    }
    html += `<button data-v="${regiao}" aria-pressed="false"><b>${regiao}</b><small>${lista}</small></button>`;
  }
  pegar('#reg').innerHTML = html;
}

// Mostra somente os artistas da região escolhida; tocar de novo limpa o filtro.
function clicarRegiao(evento) {
  const botao = evento.target.closest('button');
  if (!botao) return;

  const ativar = botao.getAttribute('aria-pressed') !== 'true';

  const botoes = document.querySelectorAll('#reg button');
  for (let i = 0; i < botoes.length; i++) {
    const marcado = (botoes[i] === botao && ativar);
    botoes[i].setAttribute('aria-pressed', marcado);
  }

  const cards = document.querySelectorAll('.card');
  let encontrados = 0;
  for (let i = 0; i < cards.length; i++) {
    const mostrar = !ativar || cards[i].dataset.r === botao.dataset.v;
    cards[i].hidden = !mostrar;
    if (mostrar) encontrados++;
  }

  let aviso = pegar('#sem-artistas');
  if (!aviso) {
    aviso = document.createElement('p');
    aviso.id = 'sem-artistas';
    aviso.className = 'empty';
    aviso.setAttribute('role', 'status');
    aviso.setAttribute('aria-live', 'polite');
    pegar('#grid').insertAdjacentElement('afterend', aviso);
  }
  aviso.hidden = !ativar || encontrados > 0;
  aviso.textContent = `Ainda não há artistas cadastrados para a região ${botao.dataset.v}.`;

  if (ativar) {
    pegar('#artistas').scrollIntoView();
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.card:not([hidden])').forEach(function (card, i) {
      card.animate([{ opacity: 0, transform: 'translateY(18px) scale(.97)' }, { opacity: 1, transform: 'none' }],
        { duration: 420, delay: (i % 3) * 65, easing: 'ease-out' });
    });
  }
}

// ---------- 5. FICHA DO ARTISTA (janela) ----------
function abrirFicha(evento) {
  const card = evento.target.closest('.card');
  if (!card) return;

  let artista = null;
  for (let i = 0; i < artistas.length; i++) {
    if (artistas[i].id === card.dataset.id) {
      artista = artistas[i];
    }
  }

  // foto do cabeçalho (ou a letra grande, se não houver foto)
  let foto = '';
  if (fotos[artista.id]) {
    foto = `<img class="hi" src="${fotos[artista.id]}" alt="Fotografia de ${artista.nome}" style="object-position:${posicaoFotos[artista.id] || '50%'} 25%">`;
  } else {
    foto = `<span class="big" aria-hidden="true">${artista.nome[0]}</span>`;
  }

  // apelido e gêneros
  let tags = '';
  if (artista.apelido) {
    tags += `<span class="pill">${artista.apelido}</span>`;
  }
  for (let i = 0; i < artista.generos.length; i++) {
    tags += `<span class="pill">${artista.generos[i]}</span>`;
  }

  // falecimento só aparece se existir
  let falecimento = '';
  if (artista.falecimento) {
    falecimento = `<div><small>Falecimento</small><span>${artista.falecimento}</span></div>`;
  }

  // lista de músicas
  let musicas = '';
  for (let i = 0; i < artista.musicas.length; i++) {
    const m = artista.musicas[i];
    // se a música tiver o link do vídeo, abre direto nele; senão, abre a busca no YouTube
    let linkMusica = linkYoutube(artista.nome + ' ' + m.titulo);
    if (m.video) {
      linkMusica = m.video;
    }
    const partes = [];
    if (m.album) partes.push(m.album);
    if (m.ano) partes.push(m.ano);
    musicas += `
      <a class="sg" href="${linkMusica}" target="_blank" rel="noopener" data-t="${m.titulo}" data-a="${artista.nome}" data-al="${m.album}">
        <span class="pl" aria-hidden="true">▶</span>
        <span><b>${m.titulo}</b><small>${partes.join(' • ')}</small></span>
        <span class="ar" aria-hidden="true">↗</span>
      </a>`;
  }

  // lista de álbuns
  let albuns = '<p>em pesquisa</p>';
  if (artista.albuns.length > 0) {
    albuns = '<div class="ab">';
    for (let i = 0; i < artista.albuns.length; i++) {
      albuns += `<div><b>${artista.albuns[i].ano}</b><span>${artista.albuns[i].titulo}</span></div>`;
    }
    albuns += '</div>';
  }

  const creditoFoto = creditosFotos[artista.id];
  const textoCreditoFoto = creditoFoto
    ? `Foto: <a href="${creditoFoto.pagina}" target="_blank" rel="noopener">${creditoFoto.autor} / Wikimedia Commons</a> — ${creditoFoto.licenca}${creditoFoto.licencaUrl ? ` (<a href="${creditoFoto.licencaUrl}" target="_blank" rel="noopener">ver licença</a>)` : ''}.`
    : 'Fotografia: crédito e licença a confirmar.';

  pegar('#dlg').innerHTML = `
    <button class="btn x" onclick="fecharFicha()" aria-label="Fechar">FECHAR ✕</button>
    <div class="dh" style="background:${coresRegiao[artista.regiao]}">
      ${foto}
      <span class="k" style="color:var(--ow)">${artista.regiao}</span>
      <h2 id="dn">${artista.nome}</h2>
      <h3 style="font-size:1.8rem">${artista.curadoria}</h3>
      <p style="margin:0">${tags}</p>
    </div>
    <div class="fc">
      <div><small>Nascimento</small><span>${artista.nascimento}</span></div>
      <div><small>Naturalidade</small><span>${artista.origem}</span></div>
      ${falecimento}
      <div><small>Carreira</small><span>${artista.periodo}</span></div>
    </div>
    <div class="db">
      <div>
        <h3>TRAJETÓRIA</h3><p>${artista.biografia}</p>
        <h3>LEGADO</h3><p>${artista.legado}</p>
      </div>
      <div>
        <h3>OUÇA ESSA VOZ</h3><div class="sl">${musicas}</div>
        <h3>ÁLBUNS</h3>${albuns}
      </div>
    </div>
    <div class="ft">Fonte de apoio: <a href="${linkWikipedia(artista.wikipedia)}" target="_blank" rel="noopener">Wikipédia</a> (conferir em fontes institucionais). ${textoCreditoFoto} Capas de álbum: pendentes. Os links de música levam ao YouTube.</div>`;

  pegar('#dlg').showModal();
}

function fecharFicha() {
  const janela = pegar('#dlg');
  if (!janela.open || janela.dataset.closing) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    janela.close();
    return;
  }
  janela.dataset.closing = 'true';
  const saida = janela.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(18px) scale(.98)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' });
  saida.finished.then(function () {
    janela.close();
    saida.cancel();
    delete janela.dataset.closing;
  });
}

// Clicar fora da janela também fecha
function clicarNaJanela(evento) {
  if (evento.target === evento.currentTarget) {
    fecharFicha();
  }
}

// ---------- 6. MINI-PLAYER ----------
// Ao clicar numa música, mostra o nome na barra de baixo
function atualizarPlayer(evento) {
  const link = evento.target.closest('.sg');
  if (!link) return;

  let texto = '<b>' + link.dataset.t + '</b> — ' + link.dataset.a;
  if (link.dataset.al) {
    texto += ' • ' + link.dataset.al;
  }
  pegar('#mt').innerHTML = texto;
  pegar('#ml').href = link.href;
  pegar('#mp').hidden = false;
}

// ---------- 7. RITMOS ----------
function mostrarRitmos() {
  const cores = ['#176B4D', '#B94A32', '#173B57', '#E7B83C'];
  let html = '';
  for (let i = 0; i < ritmos.length; i++) {
    const numero = String(i + 1).padStart(2, '0');
    html += `
      <article style="--c:${cores[i % 4]}">
        <span class="n">${numero}</span>
        <h3>${ritmos[i].nome}</h3>
        <p>${ritmos[i].texto}</p>
      </article>`;
  }
  pegar('#rh').innerHTML = html;
}

// ---------- 8. LINHA DO TEMPO ----------
function mostrarLinhaDoTempo() {
  let html = '';
  for (let i = 0; i < linhaDoTempo.length; i++) {
    const aberto = (i === 0);
    html += `<button aria-expanded="${aberto}"><h3>${linhaDoTempo[i].periodo}</h3><p>${linhaDoTempo[i].texto}</p></button>`;
  }
  pegar('#tl').innerHTML = html;
}

function clicarLinhaDoTempo(evento) {
  const botao = evento.target.closest('button');
  if (!botao) return;
  const botoes = document.querySelectorAll('#tl button');
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].setAttribute('aria-expanded', botoes[i] === botao);
  }
}

// ---------- 9. MENU DO CELULAR ----------
function alternarMenu() {
  const aberto = pegar('#nav').classList.toggle('open');
  pegar('#mb').setAttribute('aria-expanded', aberto);
}

function fecharMenu(evento) {
  if (evento.target.closest('a')) {
    pegar('#nav').classList.remove('open');
    pegar('#mb').setAttribute('aria-expanded', 'false');
  }
}

// ---------- TEMA CLARO E ESCURO ----------
function atualizarBotaoTema() {
  const claro = document.documentElement.dataset.theme === 'light';
  const botao = pegar('#theme-toggle');
  const descricao = claro ? 'Ativar modo escuro' : 'Ativar modo claro';
  botao.setAttribute('aria-label', descricao);
  botao.title = descricao;
}

function alternarTema() {
  const tema = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = tema;
  try { localStorage.setItem('brasil-plural-tema', tema); } catch { /* O tema funciona mesmo sem armazenamento. */ }
  atualizarBotaoTema();
}

// ---------- 10. INICIAR O SITE ----------
atualizarBotaoTema();
pegar('#theme-toggle').onclick = alternarTema;
pegar('#hero-main').src = fotos['luiz-gonzaga'];
pegar('#hero-secondary').src = fotos['caetano-veloso'];

// Animações de onda (carregamento e Hero)
criarOnda(pegar('#load .wave'), 12, false);
criarOnda(pegar('#hb'), 40, true);

// Monta as seções
mostrarRegioes();
mostrarGaleria();
mostrarRitmos();
mostrarLinhaDoTempo();

// Eventos de clique
pegar('#reg').onclick = clicarRegiao;
pegar('#grid').onclick = abrirFicha;
pegar('#dlg').onclick = clicarNaJanela;
pegar('#dlg').addEventListener('cancel', function (evento) {
  evento.preventDefault();
  fecharFicha();
});
pegar('#tl').onclick = clicarLinhaDoTempo;
pegar('#mb').onclick = alternarMenu;
pegar('#ul').onclick = fecharMenu;
document.addEventListener('click', atualizarPlayer);

// Elementos que aparecem ao rolar a página
const observador = new IntersectionObserver(function (entradas) {
  for (let i = 0; i < entradas.length; i++) {
    if (entradas[i].isIntersecting) {
      entradas[i].target.classList.add('in');
      observador.unobserve(entradas[i].target);
    }
  }
}, { threshold: 0.1 });

const elementos = document.querySelectorAll('.rv, #artistas > .k, #artistas > h2, #artistas > p, .card, #tempo > .k, #tempo > h2, .tl button');
for (let i = 0; i < elementos.length; i++) {
  elementos[i].classList.add('reveal');
  elementos[i].style.setProperty('--reveal-delay', (i % 3) * 60 + 'ms');
  observador.observe(elementos[i]);
}

// Esconde a tela de carregamento
window.addEventListener('load', function () {
  setTimeout(function () {
    pegar('#load').classList.add('off');
  }, 600);
});
