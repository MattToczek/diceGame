class Player {
    constructor(name)
    {
        this.name = name;
        this.score = 0;
        this.currNum = 0;
        this.rolls = 0;
    }

    win(){
        this.score++;
    }

}

const currentPlayer = [];
const scoreReads =[];


let diceDiv = document.getElementById("dice");
let rollBtn = document.getElementById("roll");
let score = document.getElementsByClassName("scores");
let player = document.getElementById("player");
let p1Name = document.getElementById("p1Name");
let p2Name = document.getElementById("p2Name");
let playBtn = document.getElementById("play");
let inputScreen = document.getElementById("inputScreen");
let winningScore = 20;
let winRead;
let p1Score = document.getElementById("p1Score");
let p2Score = document.getElementById("p2Score");


for (let i = 0; i < score.length; i++) {
    score[i].value = 0;
    
} 


let diceRoll = () => {
    return 1 + Math.floor(Math.random() * 6);
}

let switchPlayers = () => {
    if (currentPlayer.length>1) {
        let temp = currentPlayer[0];
        let tempScore = scoreReads[0];
        currentPlayer[0] = currentPlayer[1];
        scoreReads[0] = scoreReads[1];
        currentPlayer[1] = temp;
        scoreReads[1] = tempScore;
    }
    
}

let setName = () => {
    player.textContent = `${currentPlayer[0].name} it's your turn!`;
    score.value = currentPlayer[0].currNum
}

let gameOverRun = () => {
    inputScreen.innerHTML = winRead;
    let reset = document.getElementById("reset");
    reset.addEventListener('click', () => {
        inputScreen.style.display = "none";
        for (let i = 0; i < currentPlayer.length; i++) {
            currentPlayer[i].rolls=0;
            currentPlayer[i].currNum=0
        }
    })
    inputScreen.style.display = "flex";
}

let checkScore = () => {
    for (let i = 0; i < currentPlayer.length; i++) {
        if (currentPlayer[i].currNum >= winningScore && currentPlayer.length > 1) {
            winRead = `<h2>${currentPlayer[i].name.toUpperCase()} IS THE WINNER!!!</h2>
                        <p>They won with ${currentPlayer[i].rolls} rolls.</p>
                        <button id="reset">Reset<button>`
                        gameOverRun();
                        currentPlayer[i].win()
        } else if (currentPlayer[i].currNum >= winningScore){
            winRead = `<h2>You got to ${winningScore} with ${currentPlayer[i].rolls} rolls.</h2>
                        <button id="reset">Reset<button>`
                        gameOverRun();
        }
        
    }
}

let addScore = (num) => {
    currentPlayer[0].currNum += num; 
    scoreReads[0].value = currentPlayer[0].currNum;
    currentPlayer[0].rolls ++;
    score.value = currentPlayer[0].currNum
    checkScore();
}

let getDice = () => {                          //randomly adds score and displays relevant dice image
    let num = diceRoll();
    diceDiv.innerHTML = `<img class="diceImg" src="img/dice${num}.png"/>`
    addScore(num);
    switchPlayers();
    setName();
}

playBtn.addEventListener('click', ()=> {
    let player1 = new Player(p1Name.value);
    let player2 = new Player(p2Name.value);
    
    currentPlayer.push(player1);
    scoreReads.push(p1Score);

    if(player2.name != "" ){
        currentPlayer.push(player2);        //checks if there is a player2 and adds to currentPlayer if there is
        scoreReads.push(p2Score);
    }

    inputScreen.style.display = "none";
    console.log(currentPlayer)
    setName();
    
});

rollBtn.addEventListener('click', ()=> {
    getDice();
});
