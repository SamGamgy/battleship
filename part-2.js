// // Variables

var rs = require('readline-sync');

rs.setDefaultOptions({caseSensitive: true});

let grid = [];

let displayGrid = [];

let limitGrid = [];

let shipArray = [];

let guessArray=[];

let hitArray = [];

let guess='';

let count = 0;
let countdown = 5;

let missCount = 0;
let hitCount = 0;

let X= 0;
let Y= 0;

let x ='';
let y ='';

let playAgain = false;

let guessType = '';

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
function buildLimitGrid (size) {
    for (i=0; i<size; i++) {
        limitGrid[i] = new Array(size);
        for (j=0; j<size; j++) {
            limitGrid[i][j]= numToABC(i)+ (j+1);
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

// generate starting coordinates until no overlap HORIZONTAL
function checkOverlapH (length) {
    genHoriCoord(length);
    for(let i=0; i < length; i++) {
        let yi= y+i;
        let shipLocale = (grid[x][yi]);
        if (checkForShips(shipLocale)) {
            checkOverlapH(length);
    }
}};

// generate starting coordinates until no overlap VERTICAL
function checkOverlapV (length) {
    genVertCoord(length);
    for(let i=0; i < length; i++) {
        let xi= x+i;
        let shipLocale = (grid[(xi)][y]);
        if (checkForShips(shipLocale)) {
            checkOverlapV(length);
    }
}};

// Checks if value is a Ship 
function checkForShips (value) {
    if (value.includes('S1') ) {
        return true}  
    else if (value.includes('S2')) {
        return true}  
    else if (value.includes('S3')) {
        return true}  
    else if (value.includes('S4')) {
        return true}  
    else if (value.includes('S5')) {
        return true}  
    else {
        return false}
}
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
        shipArray.push(removeReplace(x,(y+i), ('S'+ length)));
    }}

    // VERTICAL
    else if (direction === 2) {

    checkOverlapV(length);

    // vertical placement
    for(let i=0; i < length; i++) {
        shipArray.push(removeReplace((x+i),y, ('S'+ length)));
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

    if (guessArray.includes(guess) ) {
        console.log(                '\n   You have already picked this location. Miss!')
    }
    else if (checkForShips(grid[X][Y])) {
        hitArray.push(displayGrid[X].splice(Y,1,'X '));
        console.log(`
                    ${guess}:...HIT!`);
        hitCounter(1);
    }
    else {
        displayGrid[X].splice(Y,1,'O ');
        console.log(`
                   ${guess}:...MISS`);
        missCounter(1);
    }
    
};

function checkSunk (guess) {

    if (guessArray.includes(shipArray[0][0] && shipArray[1][0])) {
        console.log('              **DESTROYER SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
    if (guessArray.includes(shipArray[2][0] && shipArray[3][0] && shipArray[4][0])) {
        console.log('              **SUBMARINE SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
    if (guessArray.includes(shipArray[5][0] && shipArray[6][0] && shipArray[7][0])) {
        console.log('              **CRUISER SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
    if (guessArray.includes(shipArray[8][0] && shipArray[9][0] && shipArray[10][0] && shipArray[11][0])) {
        console.log('               **BATTLESHIP SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
    if (guessArray.includes(shipArray[12][0] && shipArray[13][0] && shipArray[14][0] && shipArray[15][0] && shipArray [16][0])) {
        console.log('               **CARRIER SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
};

// COUNTERS

 function shipCount(num) {
    count = count + num;
    return count;
 }
 function shipCountdown(num) {
    countdown = countdown - num;
    return countdown;
 }

 function missCounter(num){
    missCount = missCount + num;
    return missCount;
 }
 function hitCounter(num){
    hitCount = hitCount + num;
    return hitCount;
 }
// // initiate game function
function startGame () {

rs.question('Press any key to start the game.');

// build grids
buildGrid(10);

buildDisplayGrid(10);

buildLimitGrid(10);

// setup limit
guessType = limitGrid;

// place ships
placeShips(2);
placeShips(3);
placeShips(3);
placeShips(4);
placeShips(5);


// display grid
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
    
// Guess Prompt Loop

while (count < 5) {

guess = rs.question( '\n Enter a location to strike. ie "A2" - - - >', {limit: guessType,
        limitMessage:'That is not a valid location. Please try again.'});

        // Check guess for hit and log message 
        checkGuess(guess);

        // Log Guess
        guessArray.push(guess);

        checkSunk(guess);

        // Show Updated Display Grid
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
        console.log('Ships Sunk: ' + count);
        console.log('Ships Remaining: ' + countdown);

        console.log('\nHit Count: ' + hitCount);
        console.log('Miss Count: ' + missCount);


};
    // Ending Question
if (count = 5) {

console.log('CONGRATULATIONS! You sunk all of the enemy ships!');

playAgain = rs.keyInYN('\n Would you like to play again? Y/N')

if (playAgain) {

    // Clear DATA

    guessArray=[];
    shipArray=[];
    count=0;
    countdown=5;

    // Restart
    startGame()
};
}
}

// initiate game
startGame();