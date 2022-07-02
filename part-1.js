// // Variables

var rs = require('readline-sync');

const arrayA = ['A1', 'A2', 'A3'];
const arrayB = ['B1', 'B2', 'B3'];
const arrayC = ['C1', 'C2', 'C3'];

const nestedArray = [arrayA, arrayB, arrayC];

const shipOne = 'S1';
const shipTwo = 'S2';

let shipOneCoord = '';
let shipTwoCoord = '';

let guess='';

let playAgain = false;

guessType = nestedArray;

let guessArray=[];

// USE for in PART 3 GUI
// function removeReplace (array, index, newVar) {
//     array.splice(index, 1, newVar);
//     return index;
// }

// generates random whole number between 0 and argument
function random(gridSize) {
    return Math.floor(Math.random()* gridSize);
}
// generates random coords
function randomGridCoord() {
    let letter = random(3)

    if (letter === 2) {letter = 'C'}
    else if (letter === 1) {letter = 'B'}
    else if (letter === 0) {letter = 'A'}

    return (letter + (random(3) + 1));
    
}

// assign ships random coordinates
function placeShips () {
    shipOneCoord = randomGridCoord();
    shipTwoCoord = randomGridCoord();

    while (shipTwoCoord === shipOneCoord) {
        shipTwoCoord = randomGridCoord();
    };
}

// guess response generator
function checkGuess (guess) {
    if (guessArray.includes(shipOneCoord)  && guess === shipTwoCoord) {
        console.log('You have destroyed all battleships!')
    }
    else if (guessArray.includes(shipTwoCoord)  && guess === shipOneCoord) {
        console.log('You have destroyed all battleships!')
    }
    else if (guessArray.includes(guess) ) {
        console.log('You have already picked this location. Miss!')
    }
    else if (guess === shipOneCoord || guess === shipTwoCoord) {
        console.log('HIT! You have sunk a battleship. 1 ship remaining')
    }
    else console.log('You have missed!');
}


// initiate game function
function startGame () {
rs.question('Press any key to start the game.');

placeShips();

console.log(arrayA);
console.log(arrayB);
console.log(arrayC);

while (!(guessArray.includes(shipOneCoord) && guessArray.includes(shipTwoCoord))) {

guess = rs.question( '\n Enter a location to strike. ie "A2"...\n', {limit: guessType,
        limitMessage:'That is not a valid location. Please try again.'});

// Check guess for hit and log message 
checkGuess(guess);
// Log Guess
guessArray.push(guess);
// Show Guess History
console.log('Your Strikes:' + guessArray);

}
// Ending Question
playAgain = rs.keyInYN('Would you like to play again? Y/N')

if (playAgain) {
    // Clear guessArray
    guessArray=[];
    // Restart
    startGame()};
}

// initiate game
startGame();


