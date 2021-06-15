console.log('Welcome to the game');
let player1 = document.getElementById('p1');
let player2 = document.getElementById('p2');
let cMode = document.getElementById('selectMode');
let tiec = document.getElementById('tieCount');
let toggleName = document.getElementById('name');
let s1 = 0;
let s2 = 0;
let count = 0;
let spaces = [null, null, null, null, null, null, null, null, null];
let CP = 'X';
const boxes = Array.from(document.getElementsByClassName('box'));

mode2P();

function mode2P() {
    document.getElementById('start').style.display='none';
    boxes.forEach((box) => {
        box.addEventListener('click', boxClicked2P);
    });
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

function reset() {
    for (let i = 0; i < spaces.length; i++) {
        spaces[i] = null;
    }
    boxes.forEach(box => {
        box.innerText = '';
    });
    tiec.innerText='';
    mode2P();
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
                tiec.innerText ='Player1 Won!';
                tiec.style.color='Green';
                boxes.forEach((box) => {
                    box.removeEventListener('click', boxClicked2P);
                });
                document.getElementById('start').style.display='block';
            }
            else if (CP == 'O') {
                s2++;
                player2.innerText = String(s2);
                tiec.innerText ='Player2 Won!';
                tiec.style.color='Red';
                boxes.forEach((box) => {
                    box.removeEventListener('click', boxClicked2P);
                });
                document.getElementById('start').style.display='block';
            }
            count = 0;
        }
        else if (count == 9) {
            count = 0;
            tiec.innerText ='Tie!';
            tiec.style.color='Blue';
            boxes.forEach((box) => {
                box.removeEventListener('click', boxClicked2P);
            });
            document.getElementById('start').style.display='block';
        }
        if (CP == 'X') {
            CP = 'O';
        }
        else {
            CP = 'X';
        }
    }
};

