class Player {
    constructor(name)
    {
        this.name = name;
        this.score = 0;
        this.currNum = 0;
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

score.value = 0;


let diceRoll = () => {
    return 1 + Math.floor(Math.random() * 6);
}

let addScore = (num) => {
    let preScore = parseInt(score.value, 10);

    if(preScore > 0){ 
        score.value = preScore + num;
    } else {
        score.value = num;
    }
}

let getDice = () => {
    let num = diceRoll();
    diceDiv.innerHTML = `<img class="diceImg" src="img/dice${num}.png"/>`
    addScore(num);
}

rollBtn.addEventListener('click', ()=> {
    getDice();
})
