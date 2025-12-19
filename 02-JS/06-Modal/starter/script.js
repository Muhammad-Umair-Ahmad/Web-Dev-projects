'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeM = document.querySelector('.close-modal');
const showM = document.querySelectorAll('.show-modal'); //querySelectorAll for 3 different bottons

const openMm = function () {
  console.log('ahh');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeMm = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//----------------------- Work logic ----------------------------
for (let i = 0; i < showM.length; i++) {
  showM[i].addEventListener('click', openMm);
}

closeM.addEventListener('click', closeMm);
overlay.addEventListener('click', closeMm); //we dont add () infront of closeMm because itll be a quick call to function

//for esc key we put eventlisterner on the whole document as this is a global event

document.addEventListener('keydown', function (e) {
  if (
    !overlay.classList.contains('hidden') &&
    !modal.classList.contains('hidden' && e.key == 'Escape')
  ) {
    closeMm();
  }
});
