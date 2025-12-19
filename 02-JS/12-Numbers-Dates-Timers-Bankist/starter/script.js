'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-08-20T17:01:17.194Z',
    '2025-08-24T23:36:17.929Z',
    '2025-08-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

let dateFormater = function(theDate, acc){
  const daysPassed = (date1,date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)
  let daysNum = Math.round(daysPassed(new Date(), theDate))
  let day = `${theDate.getDate()}`.padStart(2,0)
let month = `${theDate.getMonth()+1}`.padStart(2,0)
let year = theDate.getFullYear();

if(daysNum === 0){
  return "Today"
}
else if(daysNum ===1){
  return "Yesterday"
}
else if(daysNum <= 7){
  return '1 week ago'
}
const options = {

  day : 'numeric',
  month : 'numeric',
  year : 'numeric',
}
let dated = new Intl.DateTimeFormat(acc, options).format(theDate)
return dated
}

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  let combined = account.movements.map((mov,i)=>({
    movement: mov,
    date: account.movementsDates.at(i),
  }));
  // const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;
if(sort) combined.sort((a,b) => a.movement - b.movement)

  combined.forEach(function (obj, i) {
    const { movement, date } = obj;
let theDate = new Date(date);
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    let dated = dateFormater(theDate, account.locale)
    let formatedCur = new Intl.NumberFormat(account.locale,{
      style: 'currency',
      currency: account.currency
    }).format(movement)
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}
      

     </div>
         <div class="movements__date">${dated}</div>

        <div class="movements__value">${formatedCur}</div>
      </div>
      
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = (acc.movements.reduce((acc, mov) => acc + mov, 0)).toFixed(2);
  labelBalance.textContent = `${new Intl.NumberFormat(acc.locale,{style: 'currency', currency: acc.currency}).format(acc.balance)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = (acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)).toFixed(2);
  labelSumIn.textContent =`${new Intl.NumberFormat(acc.locale,{style: 'currency', currency: acc.currency}).format(incomes)}`;

  const out = (acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)).toFixed(2);
  labelSumOut.textContent = `${new Intl.NumberFormat(acc.locale,{style: 'currency', currency: acc.currency}).format(out)}`;

  const interest = (acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0)).toFixed(2);
  labelSumInterest.textContent = `${new Intl.NumberFormat(acc.locale,{style: 'currency', currency: acc.currency}).format(interest)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timerId;

let timer = function() {
  // Clear previous timer if it exists
  if (timerId) clearInterval(timerId);

  let time = 300; // 5 minutes

  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timerId);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  tick();
  timerId = setInterval(tick, 1000);
  return timerId;
};
  


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    timer();
let currentDate = new Date();
let day = `${currentDate.getDate()}`.padStart(2,0)
let month = `${currentDate.getMonth()+1}`.padStart(2,0)
let year = currentDate.getFullYear();
let rnT = `${currentDate.getHours()}`.padStart(2,0) + `:${currentDate.getMinutes()}`.padStart(2,0)
let timeTime = `${day}/${month}/${year},${rnT}`;
const options = {
  hour : 'numeric',
  minute : 'numeric',
  day : 'numeric',
  month : 'numeric',
  year : 'numeric',
}
labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(currentDate)
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // console.log(currentAccount.movements);
    // console.log(receiverAcc.movements);
    currentAccount.movementsDates.push(new Date().toISOString())
    // console.log(currentAccount.movementsDates);
    receiverAcc.movementsDates.push(new Date().toISOString())
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount =(Math.floor(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    let upto = setTimeout(() => {currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentAccount);
  },2000)
  inputLoanAmount.value = '';
}});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault(); 
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});


labelBalance.addEventListener('click', function(){
  [...document.querySelectorAll('.movements__row')].forEach(
    function(row,i){
      if(i%2==0){
        row.style.backgroundColor = 'pink'
      }
      if (i%3 == 0){
        row.style.backgroundColor = 'blue'

      }
    }
  )
})

//! -------------------------------------- My Work --------------------------------------

//FAKE LOGIN
// currentAccount = account1;
// updateUI(currentAccount)
// containerApp.style.opacity = 100;


