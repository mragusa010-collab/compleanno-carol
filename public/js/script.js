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
  const container = document.querySelector('.glass-card') || document.querySelector('.question-card');
  if (!btnNo || !container) return;

  tentativiNo++;
  if (tentativiNo < frasiNo.length) {
    btnNo.innerText = frasiNo[tentativiNo];
  } else {
    btnNo.innerText = frasiNo[frasiNo.length - 1];
  }

  if (scalaNo > 0.35) {
    scalaNo -= 0.08;
  }

  const containerRect = container.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const maxX = (containerRect.width / 2) - (btnRect.width / 2) - 15;
  const maxY = (containerRect.height / 2) - (btnRect.height / 2) - 15;
  const randomX = (Math.random() * maxX * 2) - maxX;
  const randomY = (Math.random() * maxY * 2) - maxY;

  btnNo.style.position = 'absolute';
  btnNo.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scalaNo})`;
}

// ===== WIDGET MUSICALE CONDIVISO TRA TUTTE LE PAGINE =====
function setupMusicWidget() {
  const audio = document.getElementById('bg-music');
  const vinyl = document.getElementById('vinyl-disk');
  const widget = document.getElementById('music-widget');
  if (!audio || !widget) return;

  widget.addEventListener('click', () => toggleMusic(audio, vinyl));
  window.addEventListener('beforeunload', () => saveMusicState(audio));
  setInterval(() => saveMusicState(audio), 2000);

  // Se la musica era già stata sbloccata in una pagina precedente, riprende da dove era rimasta
  if (localStorage.getItem('musicUnlocked') === 'true') {
    resumeMusic(audio, vinyl, widget);
  }
}

function resumeMusic(audio, vinyl, widget) {
  widget.style.display = 'flex';
  const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
  audio.currentTime = savedTime;

  if (localStorage.getItem('musicPlaying') === 'true') {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        vinyl.style.animationPlayState = 'running';
      }).catch(() => {
        vinyl.style.animationPlayState = 'paused';
      });
    }
  }
}

function toggleMusic(audio, vinyl) {
  if (audio.paused) {
    audio.play().then(() => {
      vinyl.style.animationPlayState = 'running';
      saveMusicState(audio);
    }).catch(err => console.error('Errore play:', err));
  } else {
    audio.pause();
    vinyl.style.animationPlayState = 'paused';
    saveMusicState(audio);
  }
}

function saveMusicState(audio) {
  if (!audio) return;
  localStorage.setItem('musicTime', audio.currentTime);
  localStorage.setItem('musicPlaying', (!audio.paused).toString());
}

// Inizializzazione degli eventi al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  const btnNo = document.getElementById('btn-no');
  if (btnNo) {
    btnNo.addEventListener('mouseover', runAway);
    btnNo.addEventListener('click', runAway);
    btnNo.addEventListener('touchstart', runAway);
  }

  setupMusicWidget();
});
