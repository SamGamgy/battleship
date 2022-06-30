// // Variables

var rs = require('readline-sync');


const arrayA = ['A1', 'A2', 'A3'];
const arrayB = ['B1', 'B2', 'B3'];
const arrayC = ['C1', 'C2', 'C3'];

const nestedArray = [arrayA, arrayB, arrayC];

const shipOne = 'S1';
const shipTwo = 'S2';

function removeReplace (array, index, newVar) {
    array.splice(index, 1, newVar);
    return index;
}

// generates random whole number between 0 and argument
function random(gridSize) {
    return Math.floor(Math.random()* gridSize);
}

// places ships randomly in arrays
function placeShips () {
    removeReplace(nestedArray[random(3)], (random(3)), shipOne);
    removeReplace(nestedArray[random(3)], (random(3)), shipTwo);
}


operation = rs.question('Press any key to start the game.');

placeShips();


console.log(arrayA);
console.log(arrayB);
console.log(arrayC);




rs.question('Enter a location to strike. ie "A2"...');


