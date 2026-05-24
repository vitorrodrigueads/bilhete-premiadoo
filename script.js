const checkBtn = document.getElementById("checkBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");

const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");

const randomMessage = document.getElementById("randomMessage");

const failSound = document.getElementById("failSound");


/* =========================
   FRASES ALEATÓRIAS
========================= */

const messages = [

    "Um Oompa Loompa saiu correndo com seu bilhete.",

    "Seu ticket caiu no rio de chocolate da fábrica.",

    "Os esquilos da sala das nozes pegaram seu bilhite",

    "Seu bilhete foi derretido junto com o chocolate quente.",

    "A fábrica informou que você foi quase escolhido... quase.",

    "Seu bilhete foi confiscado por atividade suspeita.",

    "Erro 404: Não encontramos seu bilhete.",

    "O elevador de vidro passou direto",


    "Os Oompa Loompas saiu correndo com o seu bilhete.",

    "Willy Wonka disse: tente novamente em algum tempo.",

    "Seu chocolate venceu antes da promoção acabar.",

    "A fábrica agradece sua tentativa."

];


/* =========================
   BOTÃO PRINCIPAL
========================= */

checkBtn.addEventListener("click", () => {

    // Vibração
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }

    // Som
    failSound.play();

    // Esconde botão
    checkBtn.style.display = "none";

    // Mostra loading
    loading.classList.remove("hidden");

    startLoading();

});


/* =========================
   LOADING FAKE
========================= */

function startLoading() {

    let width = 0;

    const texts = [

        "Verificando autenticidade...",
        "Consultando Willy Wonka...",
        "Analisando chocolate...",
        "Procurando bilhete dourado...",
        "Validando açúcar mágico...",
        "Conferindo fábrica..."

    ];

    let textIndex = 0;

    const interval = setInterval(() => {

        width += Math.random() * 18;

        progress.style.width = width + "%";

        // Troca textos
        loadingText.innerText = texts[textIndex];

        textIndex++;

        if (textIndex >= texts.length) {
            textIndex = 0;
        }

        // Finaliza
        if (width >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                loading.classList.add("hidden");

                showResult();

            }, 600);

        }

    }, 500);

}


/* =========================
   RESULTADO FINAL
========================= */

function showResult() {

    // Mostra resultado
    result.classList.remove("hidden");

    // Frase aleatória
    const random =
        messages[Math.floor(Math.random() * messages.length)];

    randomMessage.innerText = random;

    // Chuva de partículas
    createParticles();

}


/* =========================
   PARTÍCULAS
========================= */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles() {

    for (let i = 0; i < 80; i++) {

        particles.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            size: Math.random() * 5 + 2,

            speedY: Math.random() * 2 + 1,

            color: `hsl(${Math.random() * 40 + 10},100%,50%)`

        });

    }

    animateParticles();

}

function animateParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = particle.color;

        ctx.fill();

        particle.y += particle.speedY;

        if (particle.y > canvas.height) {
            particles.splice(index, 1);
        }

    });

    requestAnimationFrame(animateParticles);

}


/* =========================
   RESPONSIVIDADE
========================= */

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});