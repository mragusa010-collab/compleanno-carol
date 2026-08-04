// Funzioni esistenti per la gestione della pagina
function flipCard(card) {
  card.classList.toggle('flipped');
}

function toggleReason(item) {
  item.classList.toggle('open');
}

// Configurazione per il pulsante "No"
const frasiNo = [
  "No 😜",
  "Riprova! 😅",
  "Hai un altro tentativo... 🎯",
  "Sicura? 🤔",
  "Ma come no?! 😭",
  "Dai dai premi SÌ! 💖",
  "Ops, sono veloce! ⚡",
  "Arrenditi! 😂",
  "Sì è la risposta giusta 👈"
];

let tentativiNo = 0;
let scalaNo = 1;

// Funzione per spostare, rimpicciolire e cambiare testo al tasto "No"
function runAway(e) {
  if (e) e.preventDefault();

  const btnNo = document.getElementById('btn-no');
  // Supporta sia la classe 'glass-card' che 'question-card'
  const container = document.querySelector('.glass-card') || document.querySelector('.question-card');

  if (!btnNo || !container) return;

  // 1. Aggiorna il testo in base ai tentativi
  tentativiNo++;
  if (tentativiNo < frasiNo.length) {
    btnNo.innerText = frasiNo[tentativiNo];
  } else {
    btnNo.innerText = frasiNo[frasiNo.length - 1];
  }

  // 2. Rimpicciolisce progressivamente il tasto (fino a un minimo di 0.35)
  if (scalaNo > 0.35) {
    scalaNo -= 0.08;
  }

  // 3. Calcola la posizione casuale all'interno del contenitore
  const containerRect = container.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();

  const maxX = (containerRect.width / 2) - (btnRect.width / 2) - 15;
  const maxY = (containerRect.height / 2) - (btnRect.height / 2) - 15;

  const randomX = (Math.random() * maxX * 2) - maxX;
  const randomY = (Math.random() * maxY * 2) - maxY;

  // 4. Applica lo spostamento e la riduzione di scala
  btnNo.style.position = 'absolute';
  btnNo.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scalaNo})`;
}

// Generazione dei cuoricini animati nello sfondo
function createFloatingHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const heartEmojis = ['💖', '🌸', '✨', '🧸', '🎀', '💌'];

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heart.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;
    container.appendChild(heart);
  }
}

// Inizializzazione degli eventi al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();

  const btnNo = document.getElementById('btn-no');
  if (btnNo) {
    // Gestisce sia il passaggio del mouse su PC che il tocco su dispositivi mobili
    btnNo.addEventListener('mouseover', runAway);
    btnNo.addEventListener('click', runAway);
    btnNo.addEventListener('touchstart', runAway);
  }
});