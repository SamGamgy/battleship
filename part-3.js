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
const buildGrid = size => {
    for (i=0; i<size; i++) {
        grid[i] = new Array(size);
        for (j=0; j<size; j++) {
            grid[i][j]= numToABC(i)+ (j+1);
        }
    }
}
const buildDisplayGrid = size => {
    for (i=0; i<size; i++) {
        displayGrid[i] = new Array(size);
        for (j=0; j<size; j++) {
            displayGrid[i][j]= '     ';
        }
    }
}
const buildLimitGrid = size => {
    for (i=0; i<size; i++) {
        limitGrid[i] = new Array(size);
        for (j=0; j<size; j++) {
            limitGrid[i][j]= numToABC(i)+ (j+1);
        }
    }
}

// Convert Num to Alphabet
const numToABC = num => {
    let char= String.fromCharCode(num + 65);
    return char;
}

// generates random whole number between 1 and maxNum
const random = maxNum => Math.floor(Math.random()* maxNum + 1);


// generate starting coordinates until no overlap HORIZONTAL
const checkOverlapH = length => {
    genHoriCoord(length);
    for(let i=0; i < length; i++) {
        let yi= y+i;
        let shipLocale = (grid[x][yi]);
        if (checkForShips(shipLocale)) {
            checkOverlapH(length);
    }
}};

// generate starting coordinates until no overlap VERTICAL
const checkOverlapV = length => {
    genVertCoord(length);
    for(let i=0; i < length; i++) {
        let xi= x+i;
        let shipLocale = (grid[(xi)][y]);
        if (checkForShips(shipLocale)) {
            checkOverlapV(length);
    }
}};

// Checks if value is a Ship 
const checkForShips = value => {
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
// Checks for Hit or Miss
const checkForHitMiss = value => {
    if (value.includes('X') ) {
        return true}  
    else if (value.includes('O')) {
        return true}   
    else {
        return false}
}
// generate random starting coord -- VERTICAL
const genVertCoord = length => {
    x= random(11 - length)-1;
    y= random(10)-1;
}

// generate random starting coord -- HORIZONTAL
const genHoriCoord = length => {
    x= random(10)-1;
    y= random(11 - length)-1;
}

// Replace Grid Coord with Ship 
const removeReplace = (i, j, ...newVar) =>  grid[i].splice(j, 1, newVar);

const placeShips = length => {
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
const guessCoord = string => {

    let x = string.slice(0,1);
    let y = string.slice(1,3);

   
     X = (x.charCodeAt(0) - 65);
     Y = (Number(y)-1);
    
    return(X,Y);
}

// Guess response generator

const checkGuess = guess => {
    guessCoord(guess);

    if (checkForHitMiss(displayGrid[X][Y]) ) {
        console.log(                '\n                  You have already picked this location. Try Again')
    }
    else if (checkForShips(grid[X][Y])) {
        hitArray.push(displayGrid[X].splice(Y,1,'  X  '));
        console.log(`
                              Xx--${guess}...HIT--xX
                                `);
        hitCounter(1);
    }
    else {
        displayGrid[X].splice(Y,1,'  O  ');
        console.log(`
                              ----${guess}...MISS----
                            `);
        missCounter(1);
    }
    
};

const everyIncludes = (values, array) => {
    return values.every(value => {
        return array.includes(value);
    })
}


const checkSunk = guess => {

    let destroyer = [shipArray[0][0], shipArray[1][0]];
    let submarine = [shipArray[2][0] , shipArray[3][0] , shipArray[4][0]];
    let cruiser = [shipArray[5][0] , shipArray[6][0] , shipArray[7][0]];
    let battleship = [shipArray[8][0] , shipArray[9][0] , shipArray[10][0] , shipArray[11][0]];
    let carrier = [shipArray[12][0] , shipArray[13][0] , shipArray[14][0] , shipArray[15][0] , shipArray [16][0]];

    if (everyIncludes(destroyer, guessArray)) {
        console.log('                                 **DESTROYER SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
    if (everyIncludes(submarine, guessArray)) {
        console.log('                                **SUBMARINE SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
    if (everyIncludes(cruiser, guessArray)) {
        console.log('                                 **CRUISER SUNK**')
        guessArray=[];      
        shipCount(1);
        shipCountdown(1);
    }
    if (everyIncludes(battleship, guessArray)) {
        console.log('                                  **BATTLESHIP SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
    if (everyIncludes(carrier, guessArray)) {
        console.log('                                  **CARRIER SUNK**')
        guessArray=[];
        shipCount(1);
        shipCountdown(1);
    }
};

// COUNTERS

 const shipCount = num => {
    count = count + num;
    return count;
 }
 const shipCountdown = num => {
    countdown = countdown - num;
    return countdown;
 }

 const missCounter = num => {
    missCount = missCount + num;
    return missCount;
 }
 const hitCounter = num => {
    hitCount = hitCount + num;
    return hitCount;
 }
// // initiate game function
const startGame = () => {

rs.question('\n                      Press any key to start the game.');

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


// Display GUI
console.log(
    `      
                                Welcome to
                                BATTLESHIP 
    
            1     2     3     4     5     6     7     8     9     10  
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      A  |${displayGrid[0][0]}|${displayGrid[0][1]}|${displayGrid[0][2]}|${displayGrid[0][3]}|${displayGrid[0][4]}|${displayGrid[0][5]}|${displayGrid[0][6]}|${displayGrid[0][7]}|${displayGrid[0][8]}|${displayGrid[0][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      B  |${displayGrid[1][0]}|${displayGrid[1][1]}|${displayGrid[1][2]}|${displayGrid[1][3]}|${displayGrid[1][4]}|${displayGrid[1][5]}|${displayGrid[1][6]}|${displayGrid[1][7]}|${displayGrid[1][8]}|${displayGrid[1][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      C  |${displayGrid[2][0]}|${displayGrid[2][1]}|${displayGrid[2][2]}|${displayGrid[2][3]}|${displayGrid[2][4]}|${displayGrid[2][5]}|${displayGrid[2][6]}|${displayGrid[2][7]}|${displayGrid[2][8]}|${displayGrid[2][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      D  |${displayGrid[3][0]}|${displayGrid[3][1]}|${displayGrid[3][2]}|${displayGrid[3][3]}|${displayGrid[3][4]}|${displayGrid[3][5]}|${displayGrid[3][6]}|${displayGrid[3][7]}|${displayGrid[3][8]}|${displayGrid[3][9]}|      
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      E  |${displayGrid[4][0]}|${displayGrid[4][1]}|${displayGrid[4][2]}|${displayGrid[4][3]}|${displayGrid[4][4]}|${displayGrid[4][5]}|${displayGrid[4][6]}|${displayGrid[4][7]}|${displayGrid[4][8]}|${displayGrid[4][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      F  |${displayGrid[5][0]}|${displayGrid[5][1]}|${displayGrid[5][2]}|${displayGrid[5][3]}|${displayGrid[5][4]}|${displayGrid[5][5]}|${displayGrid[5][6]}|${displayGrid[5][7]}|${displayGrid[5][8]}|${displayGrid[5][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      G  |${displayGrid[6][0]}|${displayGrid[6][1]}|${displayGrid[6][2]}|${displayGrid[6][3]}|${displayGrid[6][4]}|${displayGrid[6][5]}|${displayGrid[6][6]}|${displayGrid[6][7]}|${displayGrid[6][8]}|${displayGrid[6][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      H  |${displayGrid[7][0]}|${displayGrid[7][1]}|${displayGrid[7][2]}|${displayGrid[7][3]}|${displayGrid[7][4]}|${displayGrid[7][5]}|${displayGrid[7][6]}|${displayGrid[7][7]}|${displayGrid[7][8]}|${displayGrid[7][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      I  |${displayGrid[8][0]}|${displayGrid[8][1]}|${displayGrid[8][2]}|${displayGrid[8][3]}|${displayGrid[8][4]}|${displayGrid[8][5]}|${displayGrid[8][6]}|${displayGrid[8][7]}|${displayGrid[8][8]}|${displayGrid[8][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      J  |${displayGrid[9][0]}|${displayGrid[9][1]}|${displayGrid[9][2]}|${displayGrid[9][3]}|${displayGrid[9][4]}|${displayGrid[9][5]}|${displayGrid[9][6]}|${displayGrid[9][7]}|${displayGrid[9][8]}|${displayGrid[9][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
       `      );

    
// Guess Prompt Loop

while (count < 5) {

guess = rs.question( '\n         Enter a location to strike. ie "A2" - - - >   ', {limit: guessType,
        limitMessage:'                That is not a valid location. Please try again.'});

        // Check guess for hit and log message 
        checkGuess(guess);

        // Log Guess
        guessArray.push(guess);

        // Check for sunk ships
        checkSunk(guess);


        // GUI
        console.log(
            `                          
           
            1     2     3     4     5     6     7     8     9     10  
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      A  |${displayGrid[0][0]}|${displayGrid[0][1]}|${displayGrid[0][2]}|${displayGrid[0][3]}|${displayGrid[0][4]}|${displayGrid[0][5]}|${displayGrid[0][6]}|${displayGrid[0][7]}|${displayGrid[0][8]}|${displayGrid[0][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      B  |${displayGrid[1][0]}|${displayGrid[1][1]}|${displayGrid[1][2]}|${displayGrid[1][3]}|${displayGrid[1][4]}|${displayGrid[1][5]}|${displayGrid[1][6]}|${displayGrid[1][7]}|${displayGrid[1][8]}|${displayGrid[1][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      C  |${displayGrid[2][0]}|${displayGrid[2][1]}|${displayGrid[2][2]}|${displayGrid[2][3]}|${displayGrid[2][4]}|${displayGrid[2][5]}|${displayGrid[2][6]}|${displayGrid[2][7]}|${displayGrid[2][8]}|${displayGrid[2][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      D  |${displayGrid[3][0]}|${displayGrid[3][1]}|${displayGrid[3][2]}|${displayGrid[3][3]}|${displayGrid[3][4]}|${displayGrid[3][5]}|${displayGrid[3][6]}|${displayGrid[3][7]}|${displayGrid[3][8]}|${displayGrid[3][9]}|      
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      E  |${displayGrid[4][0]}|${displayGrid[4][1]}|${displayGrid[4][2]}|${displayGrid[4][3]}|${displayGrid[4][4]}|${displayGrid[4][5]}|${displayGrid[4][6]}|${displayGrid[4][7]}|${displayGrid[4][8]}|${displayGrid[4][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      F  |${displayGrid[5][0]}|${displayGrid[5][1]}|${displayGrid[5][2]}|${displayGrid[5][3]}|${displayGrid[5][4]}|${displayGrid[5][5]}|${displayGrid[5][6]}|${displayGrid[5][7]}|${displayGrid[5][8]}|${displayGrid[5][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      G  |${displayGrid[6][0]}|${displayGrid[6][1]}|${displayGrid[6][2]}|${displayGrid[6][3]}|${displayGrid[6][4]}|${displayGrid[6][5]}|${displayGrid[6][6]}|${displayGrid[6][7]}|${displayGrid[6][8]}|${displayGrid[6][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      H  |${displayGrid[7][0]}|${displayGrid[7][1]}|${displayGrid[7][2]}|${displayGrid[7][3]}|${displayGrid[7][4]}|${displayGrid[7][5]}|${displayGrid[7][6]}|${displayGrid[7][7]}|${displayGrid[7][8]}|${displayGrid[7][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      I  |${displayGrid[8][0]}|${displayGrid[8][1]}|${displayGrid[8][2]}|${displayGrid[8][3]}|${displayGrid[8][4]}|${displayGrid[8][5]}|${displayGrid[8][6]}|${displayGrid[8][7]}|${displayGrid[8][8]}|${displayGrid[8][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
      J  |${displayGrid[9][0]}|${displayGrid[9][1]}|${displayGrid[9][2]}|${displayGrid[9][3]}|${displayGrid[9][4]}|${displayGrid[9][5]}|${displayGrid[9][6]}|${displayGrid[9][7]}|${displayGrid[9][8]}|${displayGrid[9][9]}|       
         |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
       `      );

        console.log('       Ships Sunk: ' + count);
        console.log('       Ships Remaining: ' + countdown);

        console.log('\n       Hit Count: ' + hitCount);
        console.log('       Miss Count: ' + missCount);

};
    // Ending Question
if (count = 5) {

console.log('           CONGRATULATIONS! You sunk all of the enemy ships!');

playAgain = rs.keyInYN('\n          Would you like to play again? Y/N')

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
