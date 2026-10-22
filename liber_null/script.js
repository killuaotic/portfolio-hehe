const chapters = [
  {
    id: "about", number: "01", label: "O BRUXO",
    title: "quem observa, aprende.",
    left: `<p>sou estudante de ti, movido pela curiosidade de entender como as coisas funcionam.</p><p>gosto de investigar problemas, explorar ideias e construir soluções com intenção — aprendendo algo novo em cada tentativa.</p>`,
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
    right: `<div class="entry"><strong>GitHub</strong><small><a href="https://github.com/killuaotic" target="_blank" rel="noreferrer">Killuaotic↗</a></small></div><div class="entry"><strong>E-mail</strong><small>"luizfeliz2011@gmail.com"↗</a></small></div><p class="eyebrow">fim do registro · início do próximo capítulo</p>`
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
