//ZMIENNE
let cards = document.getElementsByClassName("memory-card");
cards = [...cards];
const startTime = new Date().getTime();
let flippedCard = "";
const flippedCards = [];
const pairs = cards.length / 2;
let result = 0;

// BUTTON NOWA GRA
const restart = function () {
    location.reload()
};
const go = function () {
    shuffleCards();
    setTimeout(function () {
        cards.forEach(element => {
            element.classList.add("back");
            element.addEventListener("click", flipCard);
        });
    }, 2000)
};
const flipCard = function () {
    flippedCard = this;
    if(this === flippedCards[0]) return;
    this.classList.remove("back");

    if (flippedCards.length === 0) {
        flippedCards[0] = this;
        return;
    } else {
        cards.forEach(element => {
            element.removeEventListener("click", flipCard)
        });
        flippedCards[1] = flippedCard;
        console.log(flippedCards);

        setTimeout(function(){
            const theSame = flippedCards[0].dataset.pair === flippedCards[1].dataset.pair;
            if(theSame) {
                flippedCards.forEach(element =>
                    element.classList.add("match"));
                result++;
                showResult();

                cards = cards.filter(element =>
                    !element.classList.contains("match"));

                if (result === pairs) {
                    const endTime = new Date().getTime();
                    const gameTime = Math.floor((endTime - startTime) / 1000);
                    alert (`WYGRANA GRA TWOJ WYNIK TO: ${gameTime} sekund`);
                    restart()
                }
            } else {
                flippedCards.forEach(element =>
                    element.classList.add("back"));
            }
            flippedCards.length = 0;
            flippedCard = "";
            cards.forEach(element =>
                element.addEventListener("click", flipCard));
        },1000)
    }
};

function shuffleCards () {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * cards.length);
    });
}
go();

// SHOW RESULT
function showResult(){
    let score = document.getElementById("score");

    if ((pairs-result)===1){
        return score.innerHTML="Znajdź jeszcze " + (pairs - result) + " parę";
    } else if ((pairs - result)>1&&(pairs-result)<5) {
        score.innerHTML="Znajdź jeszcze " + (pairs-result) + " pary";
    } else {
        score.innerHTML="Znajdź jeszcze " + (pairs-result) + " par";
    }
}
showResult();

// TIMER
let seconds = 0;
let minutes = 0;

setInterval(function(){
    console.log(seconds);
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }

    let timer = document.getElementById("timer");
    if (seconds < 10) {
        return  timer.innerHTML="CZAS: " + minutes + ":" + "0" + seconds;
    } else {
        return  timer.innerHTML="CZAS: " + minutes + ":" + seconds;
    }

    if (minutes < 10) {
        return  timer.innerHTML="CZAS: " + "0" + minutes + ":" + seconds;
    } else{
        return  timer.innerHTML="CZAS: " + minutes + ":" + seconds;
    }
}, 1000);