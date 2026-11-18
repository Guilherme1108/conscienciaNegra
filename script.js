(() => {
  const DURATION = 11000;

  const SLIDES = [
    {
      img: 'abertura.jfif',
      layout: 'full hero',
      tag: '20 de novembro',
      title: 'CONSCIÊNCIA NEGRA',
      sub: 'História, identidade, resistência e igualdade.'
    },
    {
      img: 'importanciaDaData.jfif',
      layout: 'right',
      tag: 'A importância da data',
      big: '20/11',
      title: 'Um dia para lembrar e transformar',
      text: 'Em 20 de novembro de 1695 morreu Zumbi dos Palmares. A data nos convida a lembrar a história negra e a combater o racismo.'
    },
    {
      img: 'resistencia.jfif',
      layout: 'full',
      tag: 'Uma história de resistência',
      title: 'Nunca houve silêncio diante da escravidão',
      text: 'Por mais de 300 anos o Brasil escravizou africanos. Fugas, quilombos, revoltas e a cultura mantida viva foram formas de lutar pela liberdade. A abolição só veio em 1888.'
    },
    {
      img: 'zumbi.jfif',
      layout: 'left',
      tag: 'Quilombo dos Palmares',
      title: 'Zumbi dos Palmares',
      text: 'Último grande líder de Palmares, na Serra da Barriga (AL), o maior quilombo das Américas. Tornou-se símbolo da luta pela liberdade.',
      sub: 'Zumbi vive em cada luta por justiça.'
    },
    {
      img: 'dandara.jfif',
      layout: 'right',
      tag: 'Mulheres na resistência',
      title: 'Dandara dos Palmares',
      text: 'Guerreira lembrada pela tradição como estrategista e defensora de Palmares. Sua memória representa o protagonismo das mulheres negras na luta por liberdade.'
    },
    {
      img: 'capoeira.jfif',
      layout: 'full',
      tag: 'Cultura e identidade',
      title: 'O Brasil tem a marca da África',
      items: [
        ['Música', 'Samba, maracatu e capoeira'],
        ['Dança', 'Jongo, afoxé e coco'],
        ['Culinária', 'Acarajé e vatapá'],
        ['Língua', 'Palavras de origem africana']
      ]
    },
    {
      img: 'machadoDeAssis.jfif',
      layout: 'left',
      tag: 'Personalidades que fizeram história',
      title: 'Vozes que mudaram o país',
      people: [
        { img: 'machadoDeAssis.jfif', name: 'Machado de Assis', text: 'Um dos maiores escritores da literatura brasileira.' },
        { img: 'carolinaMariaDeJesus.jfif', name: 'Carolina Maria de Jesus', text: 'Autora de Quarto de Despejo.' },
        { img: 'abdias.jfif', name: 'Abdias do Nascimento', text: 'Ativista, escritor e referência do movimento negro.' },
        { img: 'conceicaoEvaristo.jfif', name: 'Conceição Evaristo', text: 'Escritora e criadora do conceito de escrevivência.' }
      ]
    },
    {
      img: 'racismo.jfif',
      layout: 'full',
      tag: 'Conscientização',
      title: 'O racismo ainda existe',
      text: 'Ele aparece na desigualdade de renda, na violência e nas oportunidades. Reconhecer é o primeiro passo para mudar.',
      sub: 'Racismo é crime. Respeito é dever.'
    },
    {
      img: 'respeito.jfif',
      layout: 'right',
      tag: 'Respeito e igualdade',
      title: 'Diversidade é força',
      text: 'Combater o preconceito é responsabilidade de todos: na escola, em casa e nas ruas. Cada atitude conta.'
    },
    {
      img: 'encerramento.jfif',
      layout: 'full center',
      tag: 'Consciência Negra',
      title: 'Conhecer a história é reconhecer a resistência.',
      text: 'Valorizar a cultura é construir um futuro com respeito e igualdade.',
      sub: 'Consciência Negra: uma história que merece ser lembrada todos os dias.'
    }
  ];

  const app = document.getElementById('app');
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const slideEls = [], dots = [];
  let cur = 0, timer = null, paused = false;

  SLIDES.forEach(d => {
    const s = el('section', 'slide ' + (d.people ? 'full people' : d.layout));
    s.setAttribute('aria-label', d.title);

    const m = el('div', 'media'), img = new Image();
    img.alt = ''; img.src = 'img/' + d.img;
    img.onerror = () => s.classList.add('noimg');
    m.append(img);

    const c = el('div', 'content');
    if (d.tag) c.append(el('span', 'tag', d.tag));
    if (d.big) c.append(el('div', 'big', d.big));
    c.append(el('h2', '', d.title));
    if (d.text) c.append(el('p', '', d.text));

    if (d.items) {
      const g = el('div', 'items');
      d.items.forEach(([a, b]) => g.append(el('div', '', `<b>${a}</b>${b}`)));
      c.append(g);
    }

    if (d.people) {
      const g = el('div', 'cards');
      d.people.forEach(p => {
        const fig = el('figure', 'card');
        const im = new Image();
        im.alt = p.name;
        im.src = 'img/' + p.img;
        im.onerror = () => fig.classList.add('noimg');
        fig.append(im, el('figcaption', '', `<b>${p.name}</b>${p.text}`));
        g.append(fig);
      });
      c.append(g);
    }

    if (d.sub) c.append(el('p', 'sub', d.sub));
    s.append(m, el('div', 'glow'), el('div', 'shape a'), el('div', 'shape b'), c);
    app.append(s);
    slideEls.push(s);
  });

  const nav = el('div', 'nav'), prev = el('button', '', '‹'), next = el('button', '', '›');
  prev.setAttribute('aria-label', 'Slide anterior');
  next.setAttribute('aria-label', 'Próximo slide');
  prev.onclick = () => go(cur - 1);
  next.onclick = () => go(cur + 1);
  nav.append(prev, next);

  const dotBox = el('div', 'dots');
  SLIDES.forEach((_, i) => {
    const b = el('button');
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.onclick = () => go(i);
    dotBox.append(b);
    dots.push(b);
  });

  const bar = el('div', 'bar', '<i></i>');
  bar.style.setProperty('--dur', DURATION + 'ms');
  app.append(nav, dotBox, bar);

  function go(i) {
    cur = (i + SLIDES.length) % SLIDES.length;
    slideEls.forEach((s, k) => s.classList.toggle('active', k === cur));
    dots.forEach((d, k) => d.classList.toggle('on', k === cur));
    bar.classList.remove('run'); void bar.offsetWidth;
    clearTimeout(timer);
    if (!paused) {
      bar.classList.add('run');
      timer = setTimeout(() => go(cur + 1), DURATION);
    }
  }

  function toggle() {
    paused = !paused;
    app.classList.toggle('paused', paused);
    if (paused) clearTimeout(timer); else go(cur);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(cur + 1);
    else if (e.key === 'ArrowLeft') go(cur - 1);
    else if (e.code === 'Space') { e.preventDefault(); toggle(); }
  });

  go(0);
})();