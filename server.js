const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Gestione dei file statici (per servire immagini, css e js da /public)
app.use(express.static('public'));

const siteData = {
  nome: "Piccola",
  ricordi: [
    { id: 1, titolo: "Il nostro primo sguardo", data: "Quel giorno speciale", testo: "Ti ricordi quella sera in cui eravamo all'Airone a parlare di Marche e la tipa che non si volevano fare? Quella è la prima volta in cui ho capito che saresti stata una delle persone più importanti della mia vita.", emoji: "✨" },
    { id: 2, titolo: "I primi appuntamenti", data: "Giorni più belli della mia vita", testo: "Non è mai successo con nessuna che io lasciassi il gruppo dai Milano per venire con una ragazza in spiaggia...", emoji: "🌙" },
    { id: 3, titolo: "Le nostre serate", data: "Ogni singolo giorno", testo: "Ma ti ricordi quando la sera non potevo uscire e quindi obbligavi le tue amiche a venire con te sotto casa mia per vedermi e passare del tempo con me!", emoji: "💖" }
  ],
  motivi: [
    { id: 1, titolo: "Il tuo sorriso contagioso", testo: "Hai il potere magico di illuminare anche la giornata più buia e farmi felice all'istante.", icona: "🌸" },
    { id: 2, titolo: "Come mi fai sentire a casa", testo: "Con te al mio fianco posso essere me stesso al 100%, senza filtri né paure.", icona: "🧸" },
    { id: 3, titolo: "Le nostre avventure insieme", testo: "Ogni piccolo momento con te diventa un ricordo prezioso che custodisco nel cuore.", icona: "🎀" }
  ],
  fotoPremessa: [
    { url: "/img/foto1.jpg", didascalia: "Le serate a parlare fuori da casa" },
    { url: "/img/foto2.jpg", didascalia: "Le dormite sulla spiaggia per mano" },
    { url: "/img/foto3.jpg", didascalia: "I discorsi filosofici che facevamo in spiaggia" }
  ]
};

// Rotte dell'applicazione
app.get('/', (req, res) => res.render('index', { data: siteData }));
app.get('/ricordi', (req, res) => res.render('ricordi', { data: siteData }));
app.get('/motivi', (req, res) => res.render('motivi', { data: siteData }));
app.get('/premessa', (req, res) => res.render('premessa', { data: siteData }));
app.get('/domanda', (req, res) => res.render('domanda', { data: siteData }));
app.get('/festa', (req, res) => res.render('festa', { data: siteData }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ Server attivo sulla porta ${PORT}`);
});
