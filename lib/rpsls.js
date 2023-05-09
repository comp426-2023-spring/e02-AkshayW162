#!/usr/bin/env node

const rpsValidShots = ["rock", "paper", "scissors"];
const rpslsValidShots = ["rock", "paper", "scissors", "lizard", "spock"];

//Rock Paper Scissors function
export function rps(shot){
    //Opponent's choice; randomly generated
    let oppShot = rpsValidShots[Math.floor(rpsValidShots.length * Math.random())]

    //No arg supplied
    if (shot === null || shot === undefined){ return {"player": oppShot}; }
    
    //Convert to lowercase and validate choice
    let argShot = shot.toLowerCase()
    if(!rpsValidShots.includes(argShot)){
        console.error(shot + " is out of range.");
        console.log(
            `Rules for Rock Paper Scissors:

            - Scissors CUTS Paper
            - Paper COVERS Rock
            - Rock CRUSHES Scissors`
        );
        process.exit(1);
    }

    //Create output array for formatting
    let output = {
        "player": shot,
        "opponent": oppShot,
        "result": "" // Initialized as unknown
    };

    //Check wincons
    switch (argShot) {
        case 'rock':
            output['result'] = oppShot === 'scissors' ? 'win' : oppShot === 'rock' ? 'tie' : 'lose';
            break;
        case 'paper':
            output['result'] = oppShot === 'rock' ? 'win' : oppShot === 'paper' ? 'tie' : 'lose';
            break;
        case 'scissors':
            output['result'] = oppShot === 'paper' ? 'win' : oppShot === 'scissors' ? 'tie' : 'lose';
            break;
    }
    return output
}

//Rock Paper Scissors Lizard Spock function
export function rpsls(shot) {
    //Opponent's choice; randomly generated
    let oppShot = rpslsValidShots[Math.floor(rpslsValidShots.length * Math.random())]

    //No arg supplied
    if (shot === null || shot === undefined){ return {"player": oppShot}; }
    
    //Convert to lowercase and validate choice
    let argShot = shot.toLowerCase()
    if(!rpslsValidShots.includes(argShot)){
        console.error(shot + " is out of range.");
        console.log(
            `Rules for the Lizard-Spock Expansion of Rock Paper Scissors:

            - Scissors CUTS Paper
            - Paper COVERS Rock
            - Rock SMOOSHES Lizard
            - Lizard POISONS Spock
            - Spock SMASHES Scissors
            - Scissors DECAPITATES Lizard
            - Lizard EATS Paper
            - Paper DISPROVES Spock
            - Spock VAPORIZES Rock
            - Rock CRUSHES Scissors`
        );
        process.exit(1);
    }

    //Create output array for formatting
    let output = {
        "player": shot,
        "opponent": oppShot,
        "result": "" // Initialized as unknown
    };

    //Check wincons
    switch (argShot) {
        case 'rock':
            output['result'] = oppShot === 'scissors' || oppShot == 'lizard' ? 'win' : oppShot === 'rock' ? 'tie' : 'lose';
            break;
        case 'paper':
            output['result'] = oppShot === 'rock' || oppShot == 'spock' ? 'win' : oppShot === 'paper' ? 'tie' : 'lose';
            break;
        case 'scissors':
            output['result'] = oppShot === 'paper' || oppShot == 'lizard' ? 'win' : oppShot === 'scissors' ? 'tie' : 'lose';
            break;
        case 'lizard':
            output['result'] = oppShot === 'paper' || oppShot == 'spock' ? 'win' : oppShot === 'lizard' ? 'tie' : 'lose';
            break;
        case 'spock':
            output['result'] = oppShot === 'scissors' || oppShot == 'rock' ? 'win' : oppShot === 'spock' ? 'tie' : 'lose';
            break;
    }
    return output
}