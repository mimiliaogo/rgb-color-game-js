
var numCards = 3;
var colors = [];
var pickedColor;
var gameOver = false;

var time = 5;
var blink = 49;

var countID;
var blinkID;
var body = document.querySelector('body');
var cards = document.querySelectorAll('.card'); // length is always 6 
var colorDisplay = document.querySelector('#color-picked');
var messageDisplay = document.querySelector('#message');
var resetDisplay = document.querySelector('#reset span');
var button = document.querySelector('button');
var modeButtons = document.querySelectorAll('.mode');// 0 easy 1 hard 2 nightmare
var currMode = modeButtons[0];

var timeDisplay = document.querySelector('#time');

window.onload = function () {
    initModes();
    init();
};

function init() {
    initCards(); // register event handler
    reset();
}
function initModes() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            modeButtons[2].classList.remove('selected');
            this.classList.add('selected');
            currMode = this;

            if (currMode == modeButtons[0]) numCards = 3;
            else numCards = 6;


            reset(); // each time when changing mode, all have to be initialized
        });
    }

}

function printCounter() {

    time--;
    timeDisplay.textContent = ' ' + time;
    // var blink = 100;

    if (time <= 0 && !gameOver) {
        resetNightMare();
        messageDisplay.textContent = 'Time Out!';
        
        resetDisplay.textContent = 'Play Again!';
        changeColors("#FFF"); // change each card to the given color
        body.style.backgroundColor = pickedColor;
        gameOver = true;
    }

}

function screenFlash() {
    
    if (blink % 10 == 0) {
        body.style.backgroundColor = "#ddd";
    } else {
        body.style.backgroundColor = "#232323";
    }

    blink--;
}

function resetNightMare() {
    clearInterval(countID);
    clearInterval(blinkID);
    time = 5;
    blink = 49;
    timeDisplay.textContent = '';
    // button appears again
    button.style.display = "block";

}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {
            if (gameOver) return;

            var clickedColor = this.style.backgroundColor;
            if (clickedColor == pickedColor) {
                messageDisplay.textContent = 'Correct!';

                // for nightmare
                resetNightMare();

                resetDisplay.textContent = 'Play Again!';
                changeColors("#FFF"); // change each card to the given color
                body.style.backgroundColor = pickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = 'Try again!';
            }
        });
    }
}

function reset() {
    gameOver = false;
    colors = generateRandomColors(numCards); // numCards determined by currMode
    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = 'What is the color?';
    resetDisplay.textContent = 'New Color!';
    timeDisplay.textContent = '';
    body.style.backgroundColor = "#232323";
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block";
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }


    // for nightmare
    if (currMode == modeButtons[2]) {
        
        // reset button vanish
        button.style.display = "none";

        timeDisplay.textContent = ' ' + time;
        countID = setInterval(printCounter, 1000);
        blinkID = setInterval(screenFlash, 100);
    }


}

button.addEventListener("click", function () {
    reset();
});
function changeColors(color) {
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}
function pickColor() {
    var pick = Math.floor(Math.random() * numCards);
    return colors[pick];
}
function generateRandomColors(numCards) {
    var arr = [];
    for (var i = 0; i < numCards; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}