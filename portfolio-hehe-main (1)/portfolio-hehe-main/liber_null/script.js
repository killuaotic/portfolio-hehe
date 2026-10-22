const chapters = [
  {
    id: "about", number: "01", label: "O BRUXO",
    title: "quem observa, aprende.",
    left: `<p>sou estudante de TI, movido pela curiosidade de entender como as coisas funcionam.</p><p>gosto de investigar problemas, explorar ideias e construir soluções com intenção — aprendendo algo novo em cada tentativa.</p>`,
    right: `<p>este grimório reúne todos os ensinamentos que obtive enquanto praticante da magia oculta da tecnologia.</p><p><strong>em constante evolução.</strong></p><figure class="guardian-photo"><img src="urso-comuna.png" alt="Urso comuna com uma bandeira vermelha na neve"><figcaption>URSO COMUNA</figcaption></figure>`
  },
  {
    id: "projects", number: "02", label: "DEMONSTRAÇÃO",
    title: "Lumière — loja de moda.",
    left: `<p>um site de loja de roupas criado com HTML e CSS, com páginas de apresentação, produtos, sobre a marca e contato.</p><p>Explore o projeto na prévia ao lado ou abra a demonstração completa.</p><a class="demo-link" href="lumiere/index.html" target="_blank" rel="noreferrer">abrir demonstração ↗</a>`,
    right: `<iframe class="demo-frame" src="lumiere/index.html" title="Prévia do site Lumière" loading="lazy" sandbox="allow-forms allow-same-origin"></iframe><p class="demo-caption">DEMO INTERATIVA · HTML + CSS</p>`
  },
  {
    id: "skills", number: "03", label: "DISCIPLINAS",
    title: "ferramentas do ofício.",
    left: `<div class="entry"><strong>desenvolvimento web</strong><small>HTML · CSS · JS</small><p>estrutura, estilo e interatividade para interfaces web.</p></div><div class="entry"><strong>lógica e resolução de problemas</strong><small>EM APRENDIZADO</small><p>queria aprender mais sobre como fazer jogos :(.</p></div>`,
    right: `<p>obviamente ainda não sei de tudo, o objetivo é aprender mais sempre q der:</p><ul><li>o que já consigo fazer: <br> HTML e CSS com maestria, tendo um bom senso de como fazer design de sites.</li><li>o que estou aprendendo: <br> JavaScript e frameworks modernos.</li><li>o que quero explorar a seguir: <br> linguagens de programação funcional e técnicas de otimização de desempenho.</li></ul>`
  },
  {
    id: "contact", number: "04", label: "CONTATO",
    title: "toda descoberta começa com uma conversa.",
    left: `<p>quer conversar sobre um projeto, trocar ideias ou acompanhar meu trabalho?</p><p>você pode me encontrar pelos canais abaixo.</p>`,
    right: `<div class="entry"><strong>GitHub</strong><small><a href="https://github.com/killuaotic" target="_blank" rel="noreferrer">Killuaotic ↗</a></small></div><div class="entry"><strong>E-mail</strong><small><a href="mailto:luizfeliz2011@gmail.com">luizfeliz2011@gmail.com ↗</a></small></div><p class="eyebrow">fim do registro · início do próximo capítulo</p>`
  }
];

let current = -1;
const $ = (id) => document.getElementById(id);
const leftPage = $("left-page");
const rightPage = $("right-page");

function renderChapter(chapter, direction = "next") {
  const departingPage = (direction === "next" ? rightPage : leftPage).innerHTML;
  document.querySelector(".book").classList.remove("is-closed");
  $("cover-content").classList.add("hidden");
  $("inside-cover").classList.add("hidden");
  $("index-content").classList.add("hidden");
  $("left-content").classList.remove("hidden");
  $("right-content").classList.remove("hidden");

  $("left-number").textContent = `${chapter.number} / ${chapter.label}`;
  $("right-number").textContent = `REGISTRO / ${chapter.number}`;
  $("left-kicker").textContent = `CAPÍTULO ${chapter.number} · ${chapter.label}`;
  $("right-kicker").textContent = `LIBER // NULL · ${chapter.number}`;
  $("left-title").textContent = chapter.title;
  $("right-title").textContent = chapter.id === "about" ? "o arquivo" :
    chapter.id === "projects" ? "prévia do projeto" :
    chapter.id === "skills" ? "próximos estudos" : "encontre-me";
  $("left-body").innerHTML = chapter.left;
  $("right-body").innerHTML = chapter.right;
  $("page-status").textContent = `capítulo ${chapter.number} · ${chapter.label.toLowerCase()}`;
  $("prev-page").disabled = false;
  $("next-page").textContent = current >= chapters.length - 1 ? "voltar ao índice ↺" : "próximo →";
  animatePages(direction, departingPage);
}

function showIndex() {
  document.querySelector(".book").classList.remove("is-closed");
  $("cover-content").classList.add("hidden");
  $("inside-cover").classList.remove("hidden");
  $("index-content").classList.remove("hidden");
  $("left-content").classList.add("hidden");
  $("right-content").classList.add("hidden");
  $("left-number").textContent = "INTERIOR / 00";
  $("right-number").textContent = "ÍNDICE / 00";
  $("page-status").textContent = "grimório aberto · índice";
  $("prev-page").disabled = false;
  $("next-page").textContent = "começar →";
}

function showCover() {
  document.querySelector(".book").classList.add("is-closed");
  $("cover-content").classList.remove("hidden");
  $("inside-cover").classList.add("hidden");
  $("index-content").classList.add("hidden");
  $("left-content").classList.add("hidden");
  $("right-content").classList.add("hidden");
  $("left-number").textContent = "00 / CAPA";
  $("right-number").textContent = "ÍNDICE / 00";
  $("page-status").textContent = "capa · grimório fechado";
  $("prev-page").disabled = true;
  $("next-page").textContent = "abrir →";
}

function animatePages(direction, departingPage) {
  const book = document.querySelector(".book");
  const sourcePage = direction === "next" ? rightPage : leftPage;
  const bookBounds = book.getBoundingClientRect();
  const pageBounds = sourcePage.getBoundingClientRect();
  const sheet = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");
  const reverse = direction === "previous";
  const returningPage = (reverse ? rightPage : leftPage).innerHTML;

  const previousSheet = book.querySelector(".page-turn-sheet");
  if (previousSheet) previousSheet.remove();

  sheet.className = `page-turn-sheet ${reverse ? "turn-backward" : "turn-forward"}`;
  sheet.setAttribute("aria-hidden", "true");
  sheet.inert = true;
  sheet.style.top = `${pageBounds.top - bookBounds.top}px`;
  sheet.style.left = `${pageBounds.left - bookBounds.left}px`;
  sheet.style.width = `${pageBounds.width}px`;
  sheet.style.height = `${pageBounds.height}px`;

  front.className = "page-turn-face page-turn-front";
  front.innerHTML = departingPage;
  back.className = "page-turn-face page-turn-back";
  back.innerHTML = returningPage;
  [front, back].forEach((face) => {
    face.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  });
  sheet.append(front, back);
  sheet.addEventListener("animationend", function onTurnEnd(event) {
    if (event.target === sheet) {
      sheet.removeEventListener("animationend", onTurnEnd);
      sheet.remove();
    }
  });
  book.appendChild(sheet);
}

function openChapter(id) {
  const previous = current;
  current = chapters.findIndex((chapter) => chapter.id === id);
  if (current >= 0) renderChapter(chapters[current], current >= previous ? "next" : "previous");
}
function next() {
  if (current < 0) {
    if (document.querySelector(".book").classList.contains("is-closed")) {
      showIndex();
      return;
    }
    current = 0;
    renderChapter(chapters[current], "next");
    return;
  }
  if (current < chapters.length - 1) {
    current += 1;
    renderChapter(chapters[current], "next");
  } else {
    current = -1;
    showIndex();
  }
}
function previous() {
  if (current > 0) {
    current -= 1;
    renderChapter(chapters[current], "previous");
  } else {
    if (current === 0) {
      current = -1;
      showIndex();
    } else if (!document.querySelector(".book").classList.contains("is-closed")) {
      showCover();
    }
  }
}

function addConstellation() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  canvas.className = "constellation";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: -1000, y: -1000 };
  let stars = [];
  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(72, Math.max(30, Math.round((width * height) / 19000)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.25 + 0.35,
      drift: Math.random() * 0.18 + 0.035,
      phase: Math.random() * Math.PI * 2
    }));
    draw(0);
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);
    stars.forEach((star, index) => {
      if (!reducedMotion.matches) {
        star.y -= star.drift;
        star.phase += 0.006;
        if (star.y < -2) {
          star.y = height + 2;
          star.x = Math.random() * width;
        }
      }

      const shimmer = 0.24 + (Math.sin(star.phase + time * 0.0004) + 1) * 0.2;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(224, 190, 174, ${shimmer})`;
      context.fill();

      for (let next = index + 1; next < stars.length; next += 1) {
        const other = stars[next];
        const distance = Math.hypot(star.x - other.x, star.y - other.y);
        if (distance < 92) {
          context.beginPath();
          context.moveTo(star.x, star.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(165, 78, 78, ${(1 - distance / 92) * 0.12})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      }

      const distanceToPointer = Math.hypot(star.x - pointer.x, star.y - pointer.y);
      if (distanceToPointer < 125) {
        context.beginPath();
        context.moveTo(star.x, star.y);
        context.lineTo(pointer.x, pointer.y);
        context.strokeStyle = `rgba(195, 59, 67, ${(1 - distanceToPointer / 125) * 0.24})`;
        context.lineWidth = 0.7;
        context.stroke();
      }
    });

    if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(frame);
    if (!document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(draw);
  });
  reducedMotion.addEventListener?.("change", () => {
    cancelAnimationFrame(frame);
    if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    else draw(0);
  });
  resize();
  if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
}

function addSwipeNavigation() {
  let start = null;
  const book = document.querySelector(".book");

  book.addEventListener("touchstart", (event) => {
    if (event.target.closest("button, a, iframe")) return;
    const touch = event.changedTouches[0];
    start = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  book.addEventListener("touchend", (event) => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      dx < 0 ? next() : previous();
    }
  }, { passive: true });
}

$("open-book").addEventListener("click", showIndex);
document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => openChapter(button.dataset.page));
});
$("next-page").addEventListener("click", next);
$("prev-page").addEventListener("click", previous);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") next();
  if (event.key === "ArrowLeft") previous();
  if (event.key === "Escape") {
    current = -1;
    showCover();
  }
});

addConstellation();
addSwipeNavigation();
