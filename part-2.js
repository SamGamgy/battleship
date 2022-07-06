// // Variables

var rs = require('readline-sync');

let grid = [];

let shipArray = [];

let shipOneCoord = '';
let shipTwoCoord = '';

let guess='';

let x ='';
let y ='';

let X= 0;
let Y= 0;

let playAgain = false;


let guessArray=[];

let displayGrid = [];

let guessType = displayGrid;



// Grid building function
function buildGrid (size) {
    for (i=0; i<size; i++) {
        grid[i] = new Array(size);
        for (j=0; j<size; j++) {
            grid[i][j]= numToABC(i)+ (j+1);
        }
    }
}
function buildDisplayGrid (size) {
    for (i=0; i<size; i++) {
        displayGrid[i] = new Array(size);
        for (j=0; j<size; j++) {
            displayGrid[i][j]= numToABC(i)+ (j+1);
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
// function randomGridCoord(gridSize) {
//     return (numToABC(random(gridSize)-1) + (random(gridSize)));
// }

// function translateCoord (coord) {
//     return (i,j);
// }

// generate starting coordinates until no overlap HORIZONTAL
function checkOverlapH (length) {
    genHoriCoord(length);
    for(let i=0; i < length; i++) {
        let yi= y+i;
        if (grid[x][yi].includes('SH')) {
            checkOverlapH(length);
    }
}};

// generate starting coordinates until no overlap VERTICAL
function checkOverlapV (length) {
    genVertCoord(length);
    for(let i=0; i < length; i++) {
        let xi= x+i;
        if (grid[(xi)][y].includes('SH')) {
            checkOverlapV(length);
    }
}};

// generate random starting coord -- VERTICAL
function genVertCoord (length) {
    x= random(11 - length)-1;
    y= random(10)-1;
}

// generate random starting coord -- HORIZONTAL
function genHoriCoord (length) {
    x= random(10)-1;
    y= random(11 - length)-1;
}

// Replace Grid Coord with Ship 
function removeReplace (i, j, ...newVar) {
    return grid[i].splice(j, 1, newVar);
};


function placeShips (length) {
    // randomly select direction. 1=horizontal 2=vertical
    let direction = random(2);

    // HORIZONTAL
    if (direction === 1) {
    
    checkOverlapH(length);
   
    // horizontal placing
    for(i=0; i < length; i++){
        shipArray.push(removeReplace(x,(y+i), ('SH')));
    }}

    // VERTICAL
    else if (direction === 2) {

    checkOverlapV(length);

    // vertical placement
    for(let i=0; i < length; i++) {
        shipArray.push(removeReplace((x+i),y, ('SH')));
        }}
};
// Converts guess into grid coordinates
function guessCoord(string) {

    let x = string.slice(0,1);
    let y = string.slice(1,3);

     X = (x.charCodeAt(0) - 65);
     Y = (Number(y)-1);

    return(X,Y);
}

// Guess response generator
function checkGuess (guess) {
    guessCoord(guess);

    if (guessArray.includes(shipArray)) {
        console.log('You have destroyed all battleships!')
    }
    else if (guessArray.includes(guess) ) {
        console.log('You have already picked this location. Miss!')
    }
    else if (grid[X][Y].includes('SH')) {
        displayGrid[X].splice(Y,1,'X ');
        console.log('HIT!');
    }
    else {
        displayGrid[X].splice(Y,1,'O ');
        console.log('You have missed!');
    }
};


// // initiate game function
function startGame () {
rs.question('Press any key to start the game.');

buildGrid(10);

buildDisplayGrid(10);

placeShips(2);
placeShips(3);
placeShips(3);
placeShips(4);
placeShips(5);


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

    console.log(`
    ${displayGrid[0]}
    ${displayGrid[1]}
    ${displayGrid[2]}
    ${displayGrid[3]}
    ${displayGrid[4]}
    ${displayGrid[5]}
    ${displayGrid[6]}
    ${displayGrid[7]}
    ${displayGrid[8]}
    ${displayGrid[9]}
    `
    );

 console.log(shipArray);

 

while (!(guessArray.includes(shipArray))) {

guess = rs.question( '\n Enter a location to strike. ie "A2"...\n', {limit: guessType,
        limitMessage:'That is not a valid location. Please try again.'});

// Check guess for hit and log message 
checkGuess(guess);
// Log Guess
guessArray.push(guess);
// Show Guess History
console.log('Your Strikes:' + guessArray);

console.log(`
    ${displayGrid[0]}
    ${displayGrid[1]}
    ${displayGrid[2]}
    ${displayGrid[3]}
    ${displayGrid[4]}
    ${displayGrid[5]}
    ${displayGrid[6]}
    ${displayGrid[7]}
    ${displayGrid[8]}
    ${displayGrid[9]}
    `
    );

}
// Ending Question
playAgain = rs.keyInYN('Would you like to play again? Y/N')

if (playAgain) {
    // Clear guessArray
    guessArray=[];
    shipArray=[];
    // Restart
    startGame()};
}
// initiate game
startGame();