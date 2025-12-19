'use strict';

///////////////////////////////////////
//todo Scoping in Practice
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; // ✅ 'var' is function scoped, so accessible outside the block

      Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven'; // ? This shadows the outer firstName in this block

      Reasssigning outer scope's variable
      output = 'NEW OUTPUT!'; // ✅ Modifies the parent scope variable

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b; // ? Function declaration inside block — NOT accessible outside in strict mode
      }
    }

    console.log(str); // ! ReferenceError: str is block scoped
    console.log(millenial); // ✅ Works because 'millenial' is declared with var
    console.log(add(2, 3)); // ! ReferenceError: add is block scoped in strict mode
    console.log(output); // ✅ Reflects updated 'NEW OUTPUT!'
  }

  printAge();
  return age;
}

const firstName = 'Jonas'; // ✅ Global scope
calcAge(1991); // ✅ Calls main function

console.log(age); // ! Error: age is scoped inside calcAge()
printAge(); // ! Error: not defined in this scope
*/

///////////////////////////////////////
//todo Hoisting and TDZ in Practice

// Variables
// console.log(me); // ✅ undefined due to hoisting
// console.log(job); // ! ReferenceError (TDZ for let)
// console.log(year); // ! ReferenceError (TDZ for const)

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

// Functions
//console.log(addDecl(2, 3)); // ✅ Function declaration is hoisted
// console.log(addExpr(2, 3)); // ! Error: cannot access before initialization
//console.log(addArrow); // ✅ undefined because it's a var
// console.log(addArrow(2, 3)); // ! TypeError: addArrow is not a function

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// Example
// console.log(undefined); // ✅ Just logging undefined
// if (!numProducts) deleteShoppingCart(); // ✅ Will execute because var is hoisted as undefined

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x); // ✅ true (var becomes global property)
// console.log(y === window.y); // ? false, let is block scoped
// console.log(z === window.z); // ? false, const is block scoped

///////////////////////////////////
//todo The this Keyword in Practice

// console.log(this); // ✅ In browser, refers to window

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); // ? undefined in strict mode (regular function)
// };
// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); // ✅ Inherits from parent scope (window in this case)
// };
// calcAgeArrow(1980);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this); // ✅ Refers to jonas object
//     console.log(2037 - this.year);
//   },
// };
// jonas.calcAge();

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge; //!object borrowing
// matilda.calcAge(); // ✅ this now refers to matilda

// const f = jonas.calcAge;
// f(); // ! Undefined this (regular function call)

///////////////////////////////////////
//todo Regular Functions vs. Arrow Functions

// var firstName = 'Matilda';

//!✅ - They dont have this keyword 
//!✅ - In object they borrow this from global window
//!✅ - dont use arrow as method in an object

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
// console.log(this); // ✅ Refers to jonas
// console.log(2037 - this.year);

// For function in method function
//? Solution 1
// const self = this; // ? Common workaround before arrow functions

// const isMillenial = function () {
//   console.log(self);
//   console.log(self.year >= 1981 && self.year <= 1996);//!Self is added as isMillanial is inside another function and it looks for "this" in that par. function instead of object
// };

//? Solution 2 (better)
//     const isMillenial = () => {
//       console.log(this); // ✅ Arrow uses outer this (jonas)
//       console.log(this.year >= 1981 && this.year <= 1996); //!now arrow go out of funtion and now this will be the object 
//     };
//     isMillenial();
//   },

//   greet: () => {
//     console.log(this); // ! Arrow function does NOT have its own this
//     console.log(`Hey ${this.firstName}`); // ! undefined (this is window)
//   },
// };

// jonas.greet(); // ! this.firstName is undefined
// jonas.calcAge(); // ✅ Works as expected

///////////////////////////////////////
//todo arguments keyword 
    //! Not used much anymore 
    //!Only work on regular functions and allow more arguments then the perimeter and store all into array
// const addExpr = function (a, b) {
//   console.log(arguments); // ✅ Available in regular functions
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12); // ✅ Extra arguments ignored in return, but visible

// var addArrow = (a, b) => {
//   console.log(arguments); // ! Error: arguments not available in arrow functions
//   return a + b;
// };
// addArrow(2, 5, 8); // ! Will throw

///////////////////////////////////////
//todo Object References in Practice (Shallow vs. Deep Copies)

// const jessica1 = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
// };

// function marryPerson(originalPerson, newLastName) {
//   originalPerson.lastName = newLastName; // ✅ Direct mutation
//   return originalPerson;
// }

// const marriedJessica = marryPerson(jessica1, 'Davis');
// const marriedJessica = jessica1;
// marriedJessica.lastName = 'Davis';

// console.log('Before:', jessica1); // ✅ Object already mutated
// console.log('After:', marriedJessica); // ✅ Same reference

// const jessica = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
//   familiy: ['Alice', 'Bob'],
// };

// ?Shallow copy
// const jessicaCopy = { ...jessica }; // ✅ Only top-level cloned - array is still the same 
// jessicaCopy.lastName = 'Davis'; // ✅ Separate last name

// jessicaCopy.familiy.push('Mary');
// jessicaCopy.familiy.push('John'); //array for both og and this semi-deep copy is same

// ! Mutates original object too because family array is still shared

// console.log('Before:', jessica);
// console.log('After:', jessicaCopy);

// Deep copy/clone
// const jessicaClone = structuredClone(jessica); // ✅ Deep copy including nested arrays/objects
// jessicaClone.familiy.push('Mary');
// jessicaClone.familiy.push('John');

// console.log('Original:', jessica); // ✅ Unchanged
// console.log('Clone:', jessicaClone); // ✅ Modified copy
