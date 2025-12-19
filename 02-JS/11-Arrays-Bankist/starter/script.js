"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
    type : 'Premium'

};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -30],
  interestRate: 1.5,
  pin: 2222,
    type : 'Gold'

};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
    type : 'Standard'

};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type : 'Standard'
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");

const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// // let Display = function (movements) {
// //   movements.forEach((movements, i) => {
// //    containerMovements.innerHtml = '';
// //    let type = movements > 0 ? 'Deposit' : 'Withdrawal';
// //     let html = `<div class="movements__row">
// //   <div class="movements__type movements__type--${type.toLowerCase()}">
// //             ${i + 1} ${type}
// //           </div>
// //           <div class="movements__value">${movements}</div>
// //         </div>`;
// //     containerMovements.insertAdjacentHTML('afterbegin', html);
// //   });
// // };
// // Display(account1.movements);

let displayMovements = function (array, sort = false) {
  let toSort = sort ? array.slice().sort((a,b) => a-b) : array
  containerMovements.innerHTML = "";
  toSort.forEach(function (mov, i) {
    let type = mov < 0 ? "withdrawal" : "deposit";

    let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

//todo: maps:
let createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(letter => letter[0])
      .join("");
  });
};
createUserName(accounts);
console.log(accounts);

//todo: filter:
let deposits = account1.movements.filter(mov => mov > 0);
// console.log(deposits);

let withdrews = account1.movements.filter(mov => mov < 0);
// console.log(withdrews);

//todo: Reduce

let totalBalance = function(acc){
  let balance = acc.movements.reduce((acc, currentValue)=> currentValue + acc,0 )
  acc.balance = balance;
  labelBalance.textContent = `$${balance}`
}
// totalBalance(account1.movements)


let summaryCalc = (account) => {
  let inCalc = account.movements.filter(mov => mov > 0).reduce((acc, mov)=> mov + acc, 0)
  let outCalc = account.movements.filter(mov => mov < 0).reduce((acc, mov)=> mov + acc, 0)
  let interestCalc = account.movements.filter(mov => mov >= 0).map(mov => (mov * account.interestRate )/ 100).filter(int => int >= 1).reduce((acc, mov)=> mov + acc, 0)
  labelSumIn.textContent = `$${inCalc}`
  labelSumOut.textContent = `$${Math.abs(outCalc)}`
  labelSumInterest.textContent = `$${Math.abs(interestCalc)}`

}

// summaryCalc(account1)

let currentAccount;

let updateUI = cur => {
  displayMovements(cur.movements)
  //Total balance:
  totalBalance(cur)
  //summary
  summaryCalc(cur)
}


//even handlers
btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if(currentAccount?.pin === +(inputLoginPin.value)){
  //initial Display
  labelWelcome.textContent = `Welcome, Back ${currentAccount.owner.split(' ')[0]}`
  containerApp.style.opacity = 1;
    updateUI(currentAccount)
    inputLoginUsername.value = inputLoginPin.value = ''
  }
})




btnTransfer.addEventListener('click', function(e){
  e.preventDefault()
  // inputTransferTo
  // inputTransferAmount
  // if()
  let amount = +(inputTransferAmount.value)
  let amountTo = accounts.find(acc => inputTransferTo.value === acc.username)
  inputTransferTo.value = inputTransferTo.value = ''
  console.log(amountTo);
  if(amount > 0 && currentAccount.balance >= amount && currentAccount.username != amountTo?.username){
    // console.log('Valid');
    currentAccount.movements.push(-amount)
    amountTo.movements.push(amount)
    updateUI(currentAccount)
  }

  else{
    // console.log('Invalid');
  }
})

btnClose.addEventListener('click', e => {
  e.preventDefault();
// const inputCloseUsername = document.querySelector(".form__input--user");
// const inputClosePin = document.querySelector(".form__input--pin");
  let user = accounts.find(acc => inputCloseUsername.value === acc.username)
  


  if(currentAccount.username === user?.username && user?.pin === currentAccount.pin){
    // console.log('close')
    let index = accounts.findIndex(i => i.username === user.username)
    console.log(index);
    accounts.splice(index, 1)
    console.log(accounts);
    containerApp.style.opacity = 0
  }
      inputCloseUsername.value = inputClosePin.value = ''

})

btnLoan.addEventListener('click', e => {
  e.preventDefault()
  let amount = +(inputLoanAmount.value)
  if(amount >= 0 && currentAccount.movements.some(e => e >= ((0.1 * amount) + amount))){
    currentAccount.movements.push(amount)
    updateUI(currentAccount)
  }
})

let sorted = false

btnSort.addEventListener('click', e => {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})

let groupedMov = Object.groupBy(accounts, acc => {
  let counter = acc.movements.length;

  if (counter >= 5) return 'Very Active';
  if (counter >= 3) return 'Active';
  if (counter >= 1) return 'Very Low Rate';
  return 'No Activity';
});

// console.log(groupedMov);

let listType = Object.groupBy(accounts, acc => acc.type)
// console.log(listType);

//todo: Using array method on nodelist

labelBalance.addEventListener('click', el => {
  const move = Array.from(document.querySelectorAll('.movements_value'),el=> +(el.textContent.replace(1,0)))
})

//?Extra practice
// //practice 1
// let allDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((acc, i) => acc + i,0)
// console.log(allDepositSum);

// //practice 2
// let numDeposit1000 = accounts.flatMap(acc => acc.movements).reduce((acc, cur)=>{
// cur>=1000? acc++ : acc
// return acc
// },0)
// console.log(numDeposit1000);

// //practice 3
// let {depositing, withdraws} = accounts.flatMap(acc => acc.movements).reduce((obj, cur) => {
// obj[cur > 0? 'depositing' : 'withdraws'] += cur;
// return obj;
// }, {depositing:0,withdraws:0})

// //practice 4
// //this is a nice title -> This Is a Nice Title

// let converter = (title) => {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   let init = title
//     .toLowerCase()
//     .split(' ')
//     .map((word, i) => {
//       if (exceptions.includes(word) && i !== 0) {
//         return word; // keep lowercase if not the first word
//       } else {
//         return word[0].toUpperCase() + word.slice(1);
//       }
//     })
//     .join(' ');
//   return init;
// };

// console.log(converter('this is a nice title'))