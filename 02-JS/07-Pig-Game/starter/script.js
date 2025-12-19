'use strict';
//full scores after addition
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0full = document.getElementById('score--0'); //same as queryselector('#score')
const score1full = document.querySelector('#score--1');
score0full.textContent = 0;
score1full.textContent = 0;

//dice rolls score
const score0 = document.getElementById('current--0');
const score1 = document.getElementById('current--1');

score0.textContent = 0;
score1.textContent = 0;

//dice System Logic
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
diceImg.classList.add('hidden');

//intials
let num = 0;
let sum = 0;
let sum1 = 0;

//player 1
let turn = 0; //1 == player2

//stale
let gameState = 1;

const togglePlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//--------------------------------------------------------------- logic ------------------------------------------------------------
rollDice.addEventListener('click', function () {
  if (!gameState) return;
  //putting dice
  num = Math.trunc(Math.random() * 6) + 1;
  diceImg.classList.remove('hidden');
  // if (num == 1) {
  //   diceImg.src = './dice-1.png';
  // } else if (num == 2) {
  //   diceImg.src = './dice-2.png';
  // } else if (num == 3) {
  //   diceImg.src = './dice-3.png';
  // } else if (num == 4) {
  //   diceImg.src = './dice-4.png';
  // } else if (num == 5) {
  //   diceImg.src = './dice-5.png';
  // } else if (num == 6) {
  //   diceImg.src = './dice-6.png';
  // }
  //or
  diceImg.src = `dice-${num}.png`;

  if (num == 1) {
    if (!turn) {
      turn = 1;
      score0.textContent = 0;
      sum = 0;
      togglePlayer();
    } else {
      sum1 = 0;
      turn = 0;
      score1.textContent = 0;
      togglePlayer();
    }
  } else {
    if (!turn) {
      sum = sum + num;
      score0.textContent = sum;
    } else {
      sum1 = sum1 + num;
      score1.textContent = sum1;
    }
  }
});

hold.addEventListener('click', function () {
  if (!gameState) return;

  if (!turn) {
    turn = 1;
    score0full.textContent = +score0full.textContent + sum;
    sum = 0;
    if (score0full.textContent >= 100) {
      gameState = false;
      player0.classList.add('player--winner');
    }
    togglePlayer();
    
  } else {
    turn = 0;
    score1full.textContent = +score1full.textContent + sum1;
    sum1 = 0;
    if (score1full.textContent >= 100) {
      gameState = false;
      player1.classList.add('player--winner');
    }
    togglePlayer();
  }
});

newGame.addEventListener('click', function () {
  turn = 0;
  sum = 0;
  sum1 = 0;
  score1.textContent = 0;
  score0.textContent = 0;
  score0full.textContent = 0;
  score1full.textContent = 0;
  num = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
});
