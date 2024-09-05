let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");

player1.classList.add('blink');
player2.classList.remove('blink');
let turnO = true; //Player1

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        count++;
        console.log(count);
        if(turnO){
            // box.style.color = '#320E3B';
            box.textContent='O';
            turnO = false;
            player1.classList.remove('blink');
            player2.classList.add('blink');
        } else {
            box.textContent='X';
            box.style.color = '#893168';
            turnO = true; 
            player2.classList.remove('blink');
            player1.classList.add('blink');   
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner" + " " + pos1Val);
                showWinner(pos1Val);
                boxes[pattern[0]].style.backgroundColor = 'lightgreen';
                boxes[pattern[1]].style.backgroundColor = 'lightgreen';
                boxes[pattern[2]].style.backgroundColor = 'lightgreen';
            }
        }

        if(count === 9){
            msgContainer.classList.remove('hide');
            msg.innerText = "No one is winner!!";
            newGameBtn.textContent = "Try again";
            resetBtn.style.display = 'none';
            player1.classList.remove('blink');
            player2.classList.remove('blink');
        }
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
    resetBtn.classList.add('hide');
    player1.classList.remove('blink');
    player2.classList.remove('blink');
} 

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

function resetGame(){
    count = 0;
    turnO = true;
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
        box.style.backgroundColor = '#f0f0f0';
    });
    msgContainer.classList.add('hide');
    newGameBtn.textContent = "New Game";
    resetBtn.classList.remove('hide');
    player1.classList.add('blink');
    player2.classList.remove('blink');
}

let count = 0;



resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);