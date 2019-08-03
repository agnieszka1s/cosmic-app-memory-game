//ZMIENNE
let cards = document.getElementsByClassName('memory-card');
cards = [...cards];
const startTime = new Date().getTime();
let flippedCard = '';
const flippedCards = [];
const pairs = cards.length / 2;
let result = 0;

// BUTTON NOWA GRA
const restart = function() {
  location.reload();
};
const go = function() {
  shuffleCards();
  setTimeout(function() {
    cards.forEach((element) => {
      element.classList.add('back');
      element.addEventListener('click', flipCard);
    });
  }, 2000);
};
const flipCard = function() {
  flippedCard = this;
  if (this === flippedCards[0]) return;  //usuwanie bledu - sam ze sobą nie utworzy pary
  this.classList.remove('back'); // usuń klasę "back" czyli pokaż przód karty

  if (flippedCards.length === 0) { //jezeli tablica jest pusta to
    flippedCards[0] = this; //wrzuć klikniętą kartę jako pierwszą do tablicy
    return;
  } else {
    cards.forEach((element) => {
      element.removeEventListener('click', flipCard);  //jezeli nie, usun metode click i...
    });
    flippedCards[1] = flippedCard; //... wrzuć klikniętą kartę jako drugą do tablicy

    setTimeout(function() {
      const theSame = flippedCards[0].dataset.pair === flippedCards[1].dataset.pair; //sprawdzenie czy karty są takie same
      if (theSame) {
        flippedCards.forEach((element) => element.classList.add('match')); //jeśli tak, to każdemu elementowi z tablicy dodaj klasę match
        result++;  // i dodaj rezultat + 1
        showResult();

        cards = cards.filter((element) => !element.classList.contains('match'));  //usuń z tablicy karty, które mają klasę match,
          //żeby nie mogłby być dalej aktywne

        if (result === pairs) { //jeśli ilość par jest równa rezultatowi, to jest to wygrana gra
          const endTime = new Date().getTime();  //pobierz końcowy czas
          const gameTime = Math.floor((endTime - startTime) / 1000);  // policz jaki czas zajęła użytkownikowi gra
          alert(`WYGRANA GRA TWOJ WYNIK TO: ${gameTime} sekund`);  //pokaż alert
          restart(); //odśwież
        }
      } else { //jeżeli nie sa takie same
        flippedCards.forEach((element) => element.classList.add('back')); // każdy element zostaje zasłonięty poprzez dodanie klassy "black"
      }
      flippedCards.length = 0; //czyścimy tablicę
      flippedCard = '';  // czyścimy kliknięcie
      cards.forEach((element) => element.addEventListener('click', flipCard)); //dodajemy spowrotem możliwość klikania
    }, 1000);
  }
};

function shuffleCards() { //tasowanie talii kart
  cards.forEach((card) => {
    card.style.order = Math.floor(Math.random() * cards.length);
  });
}
go();

// SHOW RESULT
function showResult() {
  let score = document.getElementById('score');

  if (pairs - result === 1) {
    return (score.innerHTML = 'Znajdź jeszcze ' + (pairs - result) + ' parę');
  } else if (pairs - result > 1 && pairs - result < 5) {
    score.innerHTML = 'Znajdź jeszcze ' + (pairs - result) + ' pary';
  } else {
    score.innerHTML = 'Znajdź jeszcze ' + (pairs - result) + ' par';
  }
}
showResult();

// TIMER
let seconds = 0;
let minutes = 0;

setInterval(function() {
  seconds++;
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes >= 60) {
    minutes = 0;
  }

  let timer = document.getElementById('timer');

  if (seconds < 10 && minutes < 10) {
    timer.innerHTML = 'CZAS: ' + '0' + minutes + ':' + '0' + seconds;
  } else if (seconds < 10 && minutes > 10) {
    timer.innerHTML = 'CZAS: ' + minutes + ':' + '0' + seconds;
  } else if (seconds > 10 && minutes > 10) {
    timer.innerHTML = 'CZAS: ' + minutes + ':' + seconds;
  } else {
    timer.innerHTML = 'CZAS: ' + '0' + minutes + ':' + seconds;
  }
}, 1000);
