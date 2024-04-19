const readline = require('readline');

let space = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
let token = 'X';
let tieM = false;
let n1, n2;

function displayBoard() {
    console.log(`   |     |   `);
    console.log(` ${space[0][0]} |  ${space[0][1]}  | ${space[0][2]} `);
    console.log(`___|_____|___`);
    console.log(`   |     |   `);
    console.log(` ${space[1][0]} |  ${space[1][1]}  | ${space[1][2]} `);
    console.log(`___|_____|___`);
    console.log(`   |     |   `);
    console.log(` ${space[2][0]} |  ${space[2][1]}  | ${space[2][2]} `);
    console.log(`   |     |   `);
}

function getPlayerMove() {
    let digit;
    if (token === 'X') {
        console.log(`${n1} Please enter `);
    } else if (token === '0') {
        console.log(`${n2} Please enter `);
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('', (input) => {
        digit = parseInt(input);
        rl.close();
        if (digit >= 1 && digit <= 9) {
            let row = Math.floor((digit - 1) / 3);
            let column = (digit - 1) % 3;
            if (space[row][column] !== 'X' && space[row][column] !== '0') {
                space[row][column] = token;
                token = token === 'X' ? '0' : 'X';
            } else {
                console.log("Invalid move. Try again.");
                getPlayerMove();
            }
        } else {
            console.log("Invalid input. Please enter a number between 1 and 9.");
            getPlayerMove();
        }
    });
}

function checkForWin() {
    for (let i = 0; i < 3; i++) {
        if (space[i][0] === space[i][1] && space[i][0] === space[i][2] ||
            space[0][i] === space[1][i] && space[0][i] === space[2][i]) {
            return true;
        }
    }
    if (space[0][0] === space[1][1] && space[1][1] === space[2][2] ||
        space[0][2] === space[1][1] && space[1][1] === space[2][0]) {
        return true;
    }
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (space[x][y] !== 'X' && space[x][y] !== '0') {
                return false;
            }
        }
    }
    tieM = true;
    return true;
}

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the name of first player: ', (name1) => {
        n1 = name1;
        rl.question('Enter the name of second player: ', (name2) => {
            n2 = name2;
            console.log(`${n1} is player1 so he/she will play first`);
            console.log(`${n2} is player2 so he/she will play second`);

            rl.close();

            let gameOver = false;
            while (!gameOver) {
                displayBoard();
                getPlayerMove();
                gameOver = checkForWin();
            }

            if (token === 'X' && !tieM) {
                console.log(`${n2} Wins!!`);
            } else if (token === '0' && !tieM) {
                console.log(`${n1} wins!!`);
            } else {
                console.log("It is a draw");
            }
        });
    });
}

main();

