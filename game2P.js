console.log('Welcome to the game');
let player1 = document.getElementById('p1');
let player2 = document.getElementById('p2');
let cMode = document.getElementById('selectMode');
let tiec = document.getElementById('tieCount');
let toggleName = document.getElementById('name');
let s1 = 0;
let s2 = 0;
let tie = 0;
let count = 0;
// let mode = 2;
let spaces = [null, null, null, null, null, null, null, null, null];
let CP = 'X';
const boxes = Array.from(document.getElementsByClassName('box'));

cMode.addEventListener('click', () => {
    // if (mode == 2) {
    //     mode = 1;
    //     cMode.innerText = '1P';
    //     toggleName.innerText='Computer(O)'
    // }
    // else {
    //     mode = 2;
    //     cMode.innerText = '2P';
    //     toggleName.innerText='Player2(O)'
    // }
    s1 = 0;
    s2 = 0;
    tie = 0;
    count = 0;
    reset();
    tiec.innerText = '0';
    player1.innerText = '0';
    player2.innerText = '0';
    console.log('Reset');
});

// if (mode == 2) {
//     mode2P();
// }
// else {
//     mode1P();
// }

mode2P();

function mode2P() {
    boxes.forEach((box) => {
        box.addEventListener('click', boxClicked2P);
    });
}


function isTie() {
    let count = 0;
    for (let index = 0; index < spaces.length; index++) {
        if (spaces[index] == null) {
            count++;
        }
    }
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
};

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
    // else if (spaces[4] == CP && spaces[6] == CP && spaces[4] == CP) {
    //     return true;
    // }
    return false;
};

function reset() {
    for (let i = 0; i < spaces.length; i++) {
        spaces[i] = null;
    }
    boxes.forEach(box => {
        box.innerText = '';
    });
};

// 2-Players Mode Functions
function boxClicked2P(e) {
    const index = Number(e.target.id[4]);
    console.log(index);
    if (spaces[index] == null) {
        spaces[index] = CP;
        count++;
        console.log(count);
        e.target.innerText = CP;
        if (playerHasWon(CP)) {
            if (CP == 'X') {
                s1++;
                player1.innerText = String(s1);
            }
            else if (CP == 'O') {
                s2++;
                player2.innerText = String(s2);
            }
            reset();
            count = 0;
        }
        else if (count == 9) {
            count = 0;
            tie++;
            tiec.innerText = tie;
            reset();
        }
        if (CP == 'X') {
            CP = 'O';
        }
        else {
            CP = 'X';
        }
    }
};

