// // Variables

var rs = require('readline-sync');

const grid = [];


const shipOne = 'S1';
const shipTwo = 'S2';

let shipOneCoord = '';
let shipTwoCoord = '';

let guess='';

let playAgain = false;

// guessType = nestedArray;

let guessArray=[];

// Grid building function
function buildGrid (size) {
    for (i=0; i<size; i++) {
        grid[i] = new Array(size);
        for (j=0; j<size; j++) {
            grid[i][j]= numToABC(i)+ (j+1);
        }
    }
}
// Convert Num to Alphabet
function numToABC (num) {
    let char= String.fromCharCode(num + 65);
    return char;
}

// generates random whole number between 1 and maxNum
function random(maxNum) {
    return Math.floor(Math.random()* maxNum + 1);
}


// generates random coords in specified gridSize
function randomGridCoord(gridSize) {
    return (numToABC(random(gridSize)-1) + (random(gridSize)));
}

function translateCoord (coord) {
    return (i,j);
}
// assign ships random coordinates
function placeShipLength2 () {
    // randomly select direction. 1=horizontal 2=vertical
    let direction=random(2);
    console.log(direction);

    if (direction === 1) {

    // generate random horizontal start coord (excludes last column)
    let i= random(10)-1;
    let j= random(9)-1;
    
    // horizontal placing
    removeReplaceH(i,j, 'S2', 'S2');
    }
    else if (direction === 2) {
    // generate random vertical start coord (excludes last row)
    let i= random(9)-1;
    let j= random(10)-1;

    // vertical placement
    removeReplaceV(i,j, 'S2');
    removeReplaceV((i+1),j, 'S2');
    };
//     while (shipTwoCoord === shipOneCoord) {
//         shipTwoCoord = randomGridCoord();
//     };
};

function removeReplaceH (i, j, ...newVar) {
    grid[i].splice(j, 2, newVar);
}
function removeReplaceV (i, j, ...newVar) {
    grid[i].splice(j, 1, newVar);
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

// TEST

buildGrid(10);

placeShipLength2();

console.log(`
    ${grid[0]}
    ${grid[1]}
    ${grid[2]}
    ${grid[3]}
    ${grid[4]}
    ${grid[5]}
    ${grid[6]}
    ${grid[7]}
    ${grid[8]}
    ${grid[9]}
    `
    );



// initiate game function
// function startGame () {
// rs.question('Press any key to start the game.');

// placeShips();

// console.log(arrayA);
// console.log(arrayB);
// console.log(arrayC);

// while (!(guessArray.includes(shipOneCoord) && guessArray.includes(shipTwoCoord))) {

// guess = rs.question( '\n Enter a location to strike. ie "A2"...\n', {limit: guessType,
//         limitMessage:'That is not a valid location. Please try again.'});

// // Check guess for hit and log message 
// checkGuess(guess);
// // Log Guess
// guessArray.push(guess);
// // Show Guess History
// console.log('Your Strikes:' + guessArray);

// }
// // Ending Question
// playAgain = rs.keyInYN('Would you like to play again? Y/N')

// if (playAgain) {
//     // Clear guessArray
//     guessArray=[];
//     // Restart
//     startGame()};
// }

// // initiate game
// startGame();


