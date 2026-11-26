// Albor América · comportamento da página

// WhatsApp do treino: o P&D informa o número antes do encontro 1.
// Troque abaixo (só números, com 55 e DDD). Ex.: "5512999999999"
const WHATSAPP_NUMERO = "5512900000000";
const WHATSAPP_MENSAGEM = "Olá! Quero saber mais sobre o Albor América.";

/* 1. Topo fixo: fica sólido ao rolar e abre o menu no celular */
const topo = document.getElementById("topo");
const botaoMenu = topo.querySelector(".topo__abrir");

function atualizarTopo() {
  topo.classList.toggle("topo--solido", window.scrollY > 40);
}
atualizarTopo();
window.addEventListener("scroll", atualizarTopo, { passive: true });

function fecharMenu() {
  topo.classList.remove("topo--aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", () => {
  const abrir = botaoMenu.getAttribute("aria-expanded") !== "true";
  topo.classList.toggle("topo--aberto", abrir);
  botaoMenu.setAttribute("aria-expanded", String(abrir));
  botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
});

topo.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));

/* Molduras e fotos que se deslocam devagar ao rolar.
   Cada elemento com data-paralaxe recebe --desloca proporcional à distância
   entre o seu bloco e o centro da tela. Desligado para quem pede menos movimento. */
const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
const paralaxe = [...document.querySelectorAll("[data-paralaxe]")].map((el) => ({
  el,
  bloco: el.closest(".arco, .mosaico__item, .abertura") || el.parentElement,
  fator: parseFloat(el.dataset.paralaxe),
}));
let pedido = false;

function moverMolduras() {
  pedido = false;
  const altura = window.innerHeight;
  for (const { el, bloco, fator } of paralaxe) {
    const r = bloco.getBoundingClientRect();
    if (r.bottom < -200 || r.top > altura + 200) continue;
    const distancia = r.top + r.height / 2 - altura / 2;
    el.style.setProperty("--desloca", `${(distancia * fator).toFixed(1)}px`);
  }
}

function pedirMovimento() {
  if (menosMovimento.matches || pedido) return;
  pedido = true;
  requestAnimationFrame(moverMolduras);
}

if (!menosMovimento.matches) moverMolduras();
window.addEventListener("scroll", pedirMovimento, { passive: true });
window.addEventListener("resize", pedirMovimento);

/* 4. Galeria: tela cheia com setas, toque, teclado e Esc */
const tela = document.getElementById("tela");
const telaImg = document.getElementById("tela-img");
const telaLegenda = document.getElementById("tela-legenda");
const telaContador = document.getElementById("tela-contador");
const todosBotoesGaleria = [...document.querySelectorAll(".mosaico__item button")];
let botoesGaleria = [];
let atual = 0;
let origemFoco = null;

// Abas: Áreas de lazer, Imagens internas e Imagens externas
const mosaico = document.getElementById("mosaico");
const statusGaleria = document.getElementById("galeria-status");
const filtros = [...document.querySelectorAll(".filtro")];

function visiveis() {
  return todosBotoesGaleria.filter((b) => !b.closest(".mosaico__item").hidden);
}

filtros.forEach((filtro) => {
  filtro.addEventListener("click", () => {
    const cat = filtro.dataset.filtro;
    filtros.forEach((f) => f.setAttribute("aria-pressed", String(f === filtro)));
    mosaico.querySelectorAll(".mosaico__item").forEach((li) => {
      li.hidden = li.dataset.categoria !== cat;
    });
    mosaico.classList.remove("mosaico--troca");
    void mosaico.offsetWidth; // reinicia a animação de entrada
    mosaico.classList.add("mosaico--troca");
    const total = visiveis().length;
    statusGaleria.textContent = `Mostrando ${total} imagens: ${filtro.firstChild.textContent.trim()}.`;
    pedirMovimento();
  });
});

function mostrar(indice) {
  atual = (indice + botoesGaleria.length) % botoesGaleria.length;
  const img = botoesGaleria[atual].querySelector("img");
  telaImg.src = img.src;
  telaImg.alt = ""; // a legenda abaixo já descreve a imagem
  telaLegenda.textContent = img.alt;
  telaContador.textContent = `${atual + 1} de ${botoesGaleria.length}`;
}

function abrirTela(botao) {
  origemFoco = document.activeElement;
  botoesGaleria = visiveis(); // as setas passam só pelas imagens da aba aberta
  mostrar(botoesGaleria.indexOf(botao));
  tela.hidden = false;
  document.body.style.overflow = "hidden";
  tela.querySelector(".tela__fechar").focus();
}

function fecharTela() {
  tela.hidden = true;
  document.body.style.overflow = "";
  if (origemFoco) origemFoco.focus();
}

todosBotoesGaleria.forEach((botao) => {
  botao.setAttribute("aria-label", `Ver em tela cheia: ${botao.querySelector("img").alt}`);
  botao.addEventListener("click", () => abrirTela(botao));
});

tela.querySelector(".tela__fechar").addEventListener("click", fecharTela);
tela.querySelector(".tela__anterior").addEventListener("click", () => mostrar(atual - 1));
tela.querySelector(".tela__proxima").addEventListener("click", () => mostrar(atual + 1));

// Tocar fora da imagem fecha
tela.addEventListener("click", (e) => {
  if (e.target === tela) fecharTela();
});

document.addEventListener("keydown", (e) => {
  if (tela.hidden) return;
  if (e.key === "Escape") fecharTela();
  if (e.key === "ArrowLeft") mostrar(atual - 1);
  if (e.key === "ArrowRight") mostrar(atual + 1);
  if (e.key === "Tab") {
    // mantém o foco dentro da tela cheia
    const focaveis = [...tela.querySelectorAll("button")];
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }
});

// Deslizar o dedo para passar
let toqueX = null;
tela.addEventListener("touchstart", (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
tela.addEventListener("touchend", (e) => {
  if (toqueX === null) return;
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
  toqueX = null;
});

/* 5. Contato: WhatsApp com mensagem pronta e formulário de treino */
document.getElementById("whatsapp").href =
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

const formulario = document.getElementById("formulario");
const recebido = document.getElementById("recebido");
const telefone = document.getElementById("telefone");

// Máscara simples: (12) 99999-9999
telefone.addEventListener("input", () => {
  const d = telefone.value.replace(/\D/g, "").slice(0, 11);
  let v = d;
  if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 7) v = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  telefone.value = v;
});

const regras = {
  nome: (el) => (el.value.trim().length >= 2 ? "" : "Escreva seu nome."),
  telefone: (el) => {
    const n = el.value.replace(/\D/g, "").length;
    return n >= 10 ? "" : "Escreva o telefone com DDD, por exemplo (12) 99999-9999.";
  },
  email: (el) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) ? "" : "Escreva um e-mail válido, como nome@exemplo.com."),
  aceite: (el) => (el.checked ? "" : "Marque o aceite para a equipe poder falar com você."),
};

function validar(id) {
  const el = document.getElementById(id);
  const erro = document.getElementById(`${id}-erro`);
  const mensagem = regras[id](el);
  erro.textContent = mensagem;
  el.setAttribute("aria-invalid", mensagem ? "true" : "false");
  if (mensagem) el.setAttribute("aria-describedby", erro.id);
  else el.removeAttribute("aria-describedby");
  return !mensagem;
}

Object.keys(regras).forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener(id === "aceite" ? "change" : "blur", () => validar(id));
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const invalidos = Object.keys(regras).filter((id) => !validar(id));
  if (invalidos.length) {
    document.getElementById(invalidos[0]).focus();
    return;
  }
  // Treino: nada é enviado de verdade.
  const nome = document.getElementById("nome").value.trim().split(" ")[0];
  document.getElementById("recebido-texto").textContent =
    `Obrigado, ${nome}. A equipe do Albor América vai falar com você em breve.`;
  formulario.hidden = true;
  recebido.hidden = false;
  recebido.focus();
});
