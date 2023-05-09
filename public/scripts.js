#!/usr/bin/env node


const gameMode = document.getElementById("gameMode");
const oppType = document.getElementById("oppType");
const playContainer = document.getElementById("playContainer");
const resultContainer = document.getElementById("resultContainer");


const playerShots = createShotOptions("playerShots");
const oppShots = createShotOptions("oppShots");


let isPlayerText = false;
let isOpponentText = false;


const playerText = createHeaderText("player-text", "Player Shot: ");
const opponentText = createHeaderText("opponent-text", "Opponent Shot: ");
opponentText.style.display = "none";


gameMode.addEventListener("change", () => {
    const value = gameMode.value;
    dropDowner(playerShots, value);
    dropDowner(oppShots, value);
});


oppType.addEventListener("change", () => {
    const value = oppType.value;
    oppOrNot(value);
});


playContainer.appendChild(playerShots);
playContainer.appendChild(oppShots);


const gameResult = document.createElement("h3");
gameResult.id = "play-result";


let showResetButton = false;


async function play() {
    const game = gameMode.value;
    const shot = playerShots.value;
    const againstOpp = oppType.value === "opponent";


    if (againstOpp) {
        const url = `http://localhost:8080/app/${game}/play/${shot}`;
        const body = await fetchData(url);
        gameResult.innerText = `Player Shot: ${body.player}\nOpponent Shot: ${body.opponent}\nGame Result: you ${body.result}!`;
    } else {
        const url = `http://localhost:8080/app/${game}/play`;
        const body = await fetchData(url);
        gameResult.innerText = `Player Shot: ${body.player}`;
    }


    if (!showResetButton) {
        let resetButton = document.createElement("button");
        resetButton.onclick = () => { reset(); }
        resetButton.innerText = 'Reset';
        resultContainer.append(resetButton);
        showResetButton = true;
    }


    resultContainer.appendChild(gameResult);
}


function reset() {
    location.reload();
}


function createShotOptions(id) {
    const selectElement = document.createElement("select");
    selectElement.id = id;


    const options = [
        { value: "Rock", text: "Rock" },
        { value: "Paper", text: "Paper" },
        { value: "Scissors", text: "Scissors" },
        { value: "Lizard", text: "Lizard" },
        { value: "Spock", text: "Spock" },
    ];


    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.text = option.text;
        selectElement.appendChild(optionElement);
    });


    return selectElement;
}


function createHeaderText(id, text) {
    const headerText = document.createElement("h4");
    headerText.id = id;
    headerText.textContent = text;
    return headerText;
}


function dropDowner(dropDown, value) {
    const gameModes = {
        rps: ["Rock", "Paper", "Scissors"],
        rpsls: ["Rock", "Paper", "Scissors", "Lizard", "Spock"],
    };


    const options = gameModes[value];
    const selectedValue = dropDown.value;


    dropDown.innerHTML = "";


    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        dropDown.appendChild(optionElement);
    });


    //Reset values
    if (options.includes(selectedValue)) {
        dropDown.value = selectedValue;
    }
}


function oppOrNot(value) {
    if (value === "opponent") {
        opponentText.style.display = "block";
        oppShots.style.display = "block";
    } else{
        opponentText.style.display = "none";
        oppShots.style.display = "none";
    }
}
   
async function fetchData(url) {
    const response = await fetch(url);
    const body = await response.json();
    return body;
}
