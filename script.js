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

let player1;
let player2;
let diceDiv = document.getElementById("dice");
let rollBtn = document.getElementById("roll");
let score = document.getElementsByClassName("scores");
let scoresDiv = document.getElementById("scoresDiv");
let player = document.getElementById("player");
let p1Name = document.getElementById("p1Name");
let p2Name = document.getElementById("p2Name");
let playBtn = document.getElementById("play");
let inputScreen = document.getElementById("inputScreen");
let winningScore = 20;
let winRead;
let p1Score = document.getElementById("p1Score");
let p2Score = document.getElementById("p2Score");
let p1Label = document.getElementById("p1Label");
let p2Label = document.getElementById("p2Label");
let p1SAndL = document.getElementById("p1SAndL");
let p2SAndL = document.getElementById("p2SAndL");
let p1Stats = document.getElementById("p1Stats");
let p1Lowest = document.getElementById("p1Lowest");
let p1LowLab = document.getElementById("p1LowestLab");
let p1WinLab = document.getElementById("p1WinLab");
let p1WinRead = document.getElementById("p1WinRead");
let p1Wins = document.getElementById("p1Wins");
let p2Stats = document.getElementById("p2Stats");
let p2Lowest = document.getElementById("p2Lowest");
let p2LowLab = document.getElementById("p2LowestLab");
let p2WinLab = document.getElementById("p2WinLab");
let p2WinRead = document.getElementById("p2WinRead");
let p2Wins = document.getElementById("p2Wins");

p1Lowest.value = 0;
p2Lowest.value = 0;
p1Wins.value = 0;
p2Wins.value = 0;


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
    score.value = currentPlayer[0].currNum;

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
        p1Score.value = 0;
        p2Score.value = 0;
    })
    inputScreen.style.display = "flex";
}





let getDice = () => {                          //randomly adds score and displays relevant dice image
    let num = diceRoll();
    diceDiv.innerHTML = `<img class="diceImg" src="img/dice${num}.png"/>`
    addScore(num);
    switchPlayers();
    setName();
}

playBtn.addEventListener('click', ()=> {
    player1 = new Player(p1Name.value);
    player2 = new Player(p2Name.value);
    
    currentPlayer.push(player1);
    p1Label.textContent = player1.name
    scoreReads.push(p1Score);
    p1SAndL.style.display = "inline-flex";
    let p1StatHead = document.createElement("LI");
    p1StatHead.textContent = `${player1.name}'s rolls:`;
    p1LowestLab.textContent = `${player1.name}'s lowest number of rolls:`;
    p1WinLab.textContent = `${player1.name}'s wins:`;
    p1Stats.style.display = "flex";



    if(player2.name != "" ){
        currentPlayer.push(player2);        //checks if there is a player2 and adds to currentPlayer if there is
        p2Label.textContent = player2.name
        scoreReads.push(p2Score);
        p2SAndL.style.display = "inline-flex";
        let p2StatHead = document.createElement("LI");
        p2StatHead.textContent = `${player2.name}'s rolls:`;
        p2LowestLab.textContent = `${player2.name}'s lowest number of rolls:`;
        p2WinLab.textContent = `${player2.name}'s wins:`;
        p2Stats.style.display = "flex";

    }

    scoresDiv.style.display = "flex";
    scoresDiv.style.justifyContent = "space-around";
    inputScreen.style.display = "none";
    
    setName();
    
});

let addScore = (num) => {
    currentPlayer[0].currNum += num; 
    scoreReads[0].value = currentPlayer[0].currNum;
    currentPlayer[0].rolls ++;
    score.value = currentPlayer[0].currNum

    checkScore();
}

let updateRolls = ()=> {
    if(currentPlayer[0] == player1 && (p1Lowest.value == 0 || p1Lowest.value > player1.rolls)){
        p1Lowest.value = currentPlayer[0].rolls;
    } else if (p1Lowest.value == 0 || p2Lowest.value > player2.rolls){
        p2Lowest.value = currentPlayer[0].rolls;
    }

}

let upWins = () => {
    if(currentPlayer[0] == player1){
        p1Wins.value ++;
    }else{
        p2Wins.value ++;
    }
}

let checkScore = () => {
    for (let i = 0; i < currentPlayer.length; i++) {
        
        if (currentPlayer[i].currNum >= winningScore && currentPlayer.length > 1) {
            winRead = `<h2>${currentPlayer[i].name.toUpperCase()} IS THE WINNER!!!</h2>
                        <p>They won with ${currentPlayer[i].rolls} rolls.</p>
                        <button id="reset">Reset</button>`
                        inputScreen.style.textAlign = "center";
                        updateRolls();
                        upWins();
                        gameOverRun();
                        currentPlayer[i].win()

        } else if (currentPlayer[i].currNum >= winningScore){
            winRead = `<h2>You got to ${winningScore} with ${currentPlayer[i].rolls} rolls.</h2>
                        <button id="reset">Reset</p1button>`
                        inputScreen.style.textAlign = "center";
                        updateRolls();
                        p1Wins.value ++;
                        gameOverRun();
        }

        
        
    }
}

rollBtn.addEventListener('click', ()=> {
    getDice();

});
