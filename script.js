'use strict';
//Score Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

//Player Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Button Elements
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
//Dice Element
const dice = document.querySelector('.dice');
const player = document.querySelector('.player');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

const shiftPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = 1 - activePlayer;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  if (playing) {
    //Generating the dice Number
    const diceNum = Math.trunc(Math.random() * 6 + 1);
    //display the dice according to the random dice number
    dice.classList.remove('hidden');
    dice.src = `images/dice-${diceNum}.png`;
    // if dice number is 1 switch to other player
    if (diceNum === 1) {
      shiftPlayer();
    } else {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//clicking the Hold button;
hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
    } else shiftPlayer();
  }
});

newGame.addEventListener('click', function () {
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add('hidden');
  if (activePlayer === 0)
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  else shiftPlayer();
});
