'use strict';

let randNum = Math.trunc(Math.random() * 20) + 1;
console.log(randNum);
let hs = 0;
let score;
document.querySelector('.check').addEventListener('click', function () {
  let checkVal = document.querySelector('.guess').value;
  if (checkVal == randNum) {
    document.querySelector('.message').textContent = 'You Won! Correct Guess.';
    document.querySelector('.number').textContent = randNum;
    document.querySelector('body').style.backgroundColor = '#60b347';
    hs = document.querySelector('.highscore').textContent;
    score = document.querySelector('.score').textContent;
  } else if (checkVal != randNum) {
    if (document.querySelector('.score').textContent > 0) {
      document.querySelector('.score').textContent =
        document.querySelector('.score').textContent - 1;

      if (Number(checkVal) > randNum + 4) {
        document.querySelector('.message').textContent =
          'Too large. Try smaller number';
      } else if (Number(checkVal) < randNum - 4) {
        document.querySelector('.message').textContent =
          'Too small. Try larger number';
      } else {
        document.querySelector('.message').textContent = "'You're Close";
      }
    }
  } else {
    document.querySelector('.message').textContent =
      'You loose! You used your lifetime.';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  randNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  console.log(randNum);
  if (hs > score) {
    document.querySelector('.highscore').textContent = hs;
  } else {
    document.querySelector('.highscore').textContent = score;
  }
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = 20;
  document.querySelector('.number').textContent = '?';
});
