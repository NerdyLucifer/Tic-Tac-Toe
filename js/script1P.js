let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');
let score1 = 0;
let score2 = 0;
let tiec = document.getElementById('tieCount');
let origBoard;
let huPlayer = 'O';
let aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6]
];

const cells = document.querySelectorAll('.box');
startGame();

function selectSym(sym) {
    huPlayer = sym;
    aiPlayer = sym === 'O' ? 'X' : 'O';
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', turnClick, false);
    }
    if (aiPlayer === 'X') {
        turn(bestSpot(), aiPlayer);
    }
    document.querySelector('.selectSymbol').style.display = "none";
}

function startGame() {
      document.querySelector('#start').style.display = "none";
      tiec.innerText='';
    //   document.querySelector('.endgame .text').innerText ="";
    document.querySelector('.selectSymbol').style.display = "flex";
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer);
        if (!checkWin(origBoard, huPlayer) && !checkTie())
            turn(bestSpot(), aiPlayer);
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
    checkTie();
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e == player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    if (gameWon.player == huPlayer) {
        score1++;
        p1.innerText = String(score1);
        tiec.innerText="You Won!";
        tiec.style.color='Green';
    }
    else {
        score2++;
        p2.innerText = String(score2);
        tiec.innerText="You Lost!";
        tiec.style.color='Red';
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    document.querySelector('#start').style.display = "block";
}


function emptySquares() {
    return origBoard.filter((elm, i) => i == elm);
}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
    if (emptySquares().length == 0) {
        tiec.innerText="Tie!";
        tiec.style.color='Blue';
        document.querySelector('#start').style.display = "block";
        return true;
    }
    return false;
}

function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length == 0) {
        return { score: 0 };
    }

    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer)
            move.score = minimax(newBoard, huPlayer).score;
        else
            move.score = minimax(newBoard, aiPlayer).score;
        newBoard[availSpots[i]] = move.index;
        if ((player == aiPlayer && move.score == 10) || (player == huPlayer && move.score == -10))
            return move;
        else
            moves.push(move);
    }

    let bestMove, bestScore;
    if (player == aiPlayer) {
        bestScore = -1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        bestScore = 1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}