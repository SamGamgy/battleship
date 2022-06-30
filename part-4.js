// // Variables

var rs = require('readline-sync');

var operation = '';
var num1=0;
var num2=0;

var operationType= [ '+', '-' , '*' , '/' ]

function calc (num1, num2, operation) {
    if (operation === '+') {
        return num1 + num2;
    }
    if (operation === '-') {
        return num1 - num2;
    }
    if (operation === '*') {
        return num1 * num2;
    }
    if (operation === '/') {
        return num1 / num2;
    }
}

// // // Operation selector
operation = rs.question('What operation would you like to perform? ', {limit: operationType,
limitMessage:'That is not a valid operation. Please try again.'});


// // // Number Selectors
num1 = rs.questionInt('Please enter the first number. ');

num2 = rs.questionInt('Please enter the second number. ');

// // // Function  and Result
console.log('The result is: ' + calc(num1, num2, operation))