/* ===================== INDEX SLIDESHOW ===================== */
const imagens = [
  "files/neymar.jpg",
  "files/neymar2.webp",
  "files/neymar3.webp",
  "files/neymar4.jpg",
  "files/neymar5.jpg"
];

const imgSlide = document.getElementById("neymar-slide");
let index = 0;

if(imgSlide){
  setInterval(() => {
    imgSlide.classList.add("esconder");
    setTimeout(() => {
      index = (index + 1) % imagens.length;
      imgSlide.src = imagens[index];
      imgSlide.offsetHeight; // força reflow
      imgSlide.classList.remove("esconder");
      imgSlide.classList.add("show");
    }, 500);
  }, 3000);
}

/* ===================== AUTORIZAÇÃO DE MÚSICA ===================== */
function autorizarMusica() {
  localStorage.setItem("musicaPermitida", "true");
}

/* ===================== LOGICA QUIZ ===================== */
const quizContainer = document.getElementById("quiz-container");
if(quizContainer || document.querySelector(".quiz-section")){
  const musica = document.getElementById("musica");
  const permitido = localStorage.getItem("musicaPermitida");
  if(permitido === "true" && musica){
    musica.volume = 0.5;
    musica.play().catch(()=>{});
  }

  const somAcerto = document.getElementById("som-acerto");
  const somErro = document.getElementById("som-erro");
  if(somAcerto) somAcerto.volume = 0.7;
  if(somErro) somErro.volume = 0.7;

  let score = 0;
  let respondidas = 0;
  const totalPerguntas = document.querySelectorAll(".quiz-section").length;

  document.querySelectorAll(".alternativas").forEach(grupo => {
    const botoes = grupo.querySelectorAll(".opcao");
    botoes.forEach(botao => {
      botao.addEventListener("click", () => {
        if (grupo.classList.contains("respondido")) return;

        grupo.classList.add("respondido");
        respondidas++;
        botoes.forEach(b => b.disabled = true);

        if(botao.dataset.correct === "true"){
          botao.classList.add("correta");
          if(somAcerto){ somAcerto.currentTime = 0; somAcerto.play(); }
          score++;
        } else {
          botao.classList.add("errada");
          if(somErro){ somErro.currentTime = 0; somErro.play(); }
          const corretaBtn = grupo.querySelector('[data-correct="true"]');
          if(corretaBtn) corretaBtn.classList.add("correta");
        }

        if(respondidas === totalPerguntas){
          mostrarResultado();
        }
      });
    });
  });

  function mostrarResultado(){
    const resultadoSection = document.getElementById("resultado-final") || document.querySelector(".resultado");
    const titulo = document.getElementById("titulo-resultado");
    const texto = document.getElementById("texto-resultado");
    const img = document.getElementById("imagem-resultado");

    if(!resultadoSection || !titulo || !texto || !img) return;

    img.style.display = 'block';
    resultadoSection.style.display = 'block';

    if(score === totalPerguntas){
      titulo.textContent = "Neymarzete";
      texto.textContent = `Você acertou ${score} de ${totalPerguntas}. Fã raiz do Neymar!`;
      img.src = "files/neymar-lenda.png";
    } else if(score >= 9){
      titulo.textContent = "Fã de Carteirinha";
      texto.textContent = `Você acertou ${score} de ${totalPerguntas}. Sabe bastante, mas dá pra melhorar!`;
      img.src = "files/neymar-crack.png";
    } else if(score >= 6){
      titulo.textContent = "Torcedor Casual";
      texto.textContent = `Você acertou ${score} de ${totalPerguntas}. Mais ou menos, vai`;
      img.src = "files/neymar-mid.png";
    } else{
      titulo.textContent = "Iniciante";
      texto.textContent = `Você acertou ${score} de ${totalPerguntas}. Chutou tudo, né? kkkkk`;
      img.src = "files/neymar-start.png";
    }

    resultadoSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
