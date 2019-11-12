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

    addRoll(num) {
        this.currNum + num;
    }
}

const currentPlayer = [];


let diceDiv = document.getElementById("dice");
let rollBtn = document.getElementById("roll");
let score = document.getElementById("score");
let p1Name = document.getElementById("p1Name");
let p2Name = document.getElementById("p2Name");
let playBtn = document.getElementById("play");
let inputScreen = document.getElementById("inputScreen");
let winningScore = 20;
let winRead;

score.value = 0;

let diceRoll = () => {
    return 1 + Math.floor(Math.random() * 6);
}

let gameOverRun = () => {
    inputScreen.innerHTML = winRead;
    let reset = document.getElementById("reset");
    reset.addEventListener('click', () => {
        inputScreen.style.display = none;
        for (let i = 0; i < currentPlayer.length; i++) {
            currentPlayer[i].rolls=0;
            currentPlayer[i].currNum=0
        }
    })
    inputScreen.style.display = flex;
}

let checkScore = () => {
    for (let i = 0; i < currentPlayer.length; i++) {
        if (currentPlayer[i].currNum >= winningScore && currentPlayer.length > 1) {
            winRead = `<h2>${currentPlayer[i].name.toUpperCase()} IS THE WINNER!!!</h2>
                        <p>They won with ${currentPlayer[i].rolls} rolls.</p>
                        <button id="reset">Reset<button>`
        } else {
            winRead = `<h2>You got to ${winningScore} with ${currentPlayer[i].rolls} rolls.</h2>
                        <button id="reset">Reset<button>`
        }
        gameOverRun();
    }
}

let addScore = (num) => {
    let preScore = parseInt(score.value, 10);

    if(preScore > 0){ 
        score.value = preScore + num;
    } else {
        score.value = num;
    }
    checkScore();
}

let getDice = () => {                          //randomly adds score and displays relevant dice image
    let num = diceRoll();
    diceDiv.innerHTML = `<img class="diceImg" src="img/dice${num}.png"/>`
    addScore(num);
}

playBtn.addEventListener('click', ()=> {
    let player1 = new Player(p1Name.value);
    let player2 = new Player(p2Name.value);
    
    currentPlayer.push(player1);

    if(player2.name != "" ){
        currentPlayer.push(player2);        //checks if there is a player2 and adds to currentPlayer if there is
    }

    inputScreen.style.display = "none";
    console.log(currentPlayer)
});

rollBtn.addEventListener('click', ()=> {
    getDice();
});
