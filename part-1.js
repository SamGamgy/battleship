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

function randomGridCoord() {
    let letter = random(3)

    if (letter === 2) {letter = 'C'}
    else if (letter === 1) {letter = 'B'}
    else if (letter === 0) {letter = 'A'}

    return (letter + (random(3) + 1));
    
}

// places ships randomly in arrays
function placeShips () {
    const shipOneCoord = randomGridCoord();
    let shipTwoCoord = randomGridCoord();

    if (shipTwoCoord === shipOneCoord) {
        shipTwoCoord = randomGridCoord();
    };


    console.log('\n*Hidden* Ship 1 : '+ shipOneCoord);
    console.log('*Hidden* Ship 2 : '+ shipTwoCoord + '\n');
}

// initiate game
operation = rs.question('Press any key to start the game.');

placeShips();

console.log(arrayA);
console.log(arrayB);
console.log(arrayC);

// rs.question( '\n Enter a location to strike. ie "A2"...');


