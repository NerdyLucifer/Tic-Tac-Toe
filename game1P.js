console.log('1 player mode');

let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');
let spaces = [null, null, null, null, null, null, null, null, null];
let score1 = 0;
let score2 = 0;
let tie=0;
let count = 0;
let tiec = document.getElementById('tieCount');
var origBoard;
const huPlayer = 'X';
const aiPlayer = 'O';

const cells = Array.from(document.querySelectorAll('.box'));

startGame();


function startGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(e) {
    if (spaces[Number(e.target.id[4])] == null) {
        turn(Number(e.target.id[4]), huPlayer);
        turn(bestSpot(), aiPlayer);
    }
}

function turn(squareId, player) {
    count++;
    spaces[squareId] = player;
    cells[squareId].innerText = player;
    if (playerHasWon(huPlayer)) {
        score1++;
        p1.innerText = String(score1);
        reset();
    }
    else if (playerHasWon(aiPlayer)) {
        score2++;
        p2.innerText = String(score2);
        reset();
    }
    checkTie();
}

function playerHasWon(CP) {
    if (spaces[0] == CP && spaces[1] == CP && spaces[2] == CP) {
        return true;
    }
    else if (spaces[0] == CP && spaces[3] == CP && spaces[6] == CP) {
        return true;
    }
    else if (spaces[0] == CP && spaces[4] == CP && spaces[8] == CP) {
        return true;
    }

    else if (spaces[2] == CP && spaces[5] == CP && spaces[8] == CP) {

        return true;
    }
    else if (spaces[2] == CP && spaces[4] == CP && spaces[6] == CP) {
        return true;
    }

    else if (spaces[8] == CP && spaces[7] == CP && spaces[6] == CP) {
        return true;
    }
    else if (spaces[4] == CP && spaces[1] == CP && spaces[7] == CP) {
        return true;
    }
    else if (spaces[4] == CP && spaces[3] == CP && spaces[5] == CP) {
        return true;
    }
    return false;
};

function bestSpot() {
    return emptySquares();
}

function emptySquares() {
    for (let i = 0; i < spaces.length; i++) {
        if (spaces[i]==null) {
            return i;
        }
    }
}

function checkTie(){
    if (count==9) {
        count=0;
        tie++;
        tiec.innerText=tie;
        reset();
        return true;
    }
    else
    {
        return false;
    }
}

function reset() {
    for (let i = 0; i < spaces.length; i++) {
        spaces[i]=null;
        cells[i].innerText='';
        count=0;
    }
}