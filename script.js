let playerHealth = 100;
let opponentHealth = 100;
let result;
let playerOpt;
let oAD;
let dmg;

function tossCoin() {
    playerOpt = document.getElementById('coin-dropdown').value;
    result = Math.random() < 0.5 ? 'head' : 'tail';
    document.getElementById('reset-btn').disabled = false;
    document.getElementById('atk').disabled = true;
    document.getElementById('def').disabled = true;
    document.getElementById('game-results').innerHTML = "Coin is " + result + "! You chose " + playerOpt + "!";
    
    if (result == playerOpt) {
        document.getElementById('atk').disabled = false;
        document.getElementById('def').disabled = true;
    } else {
        allow();
    }
}

function allow() {
    document.getElementById('atk').disabled = false;
    document.getElementById('def').disabled = false;
}

function calculateDamage() {
    return Math.floor(Math.random() * 5) + 1;
}

function opponentAction() {
    return Math.random() < 0.5 ? 'atk' : 'def'; 
}

function playerAttack(playerTurn) {
    allow();
    if (playerTurn == 1) {
        document.getElementById('choice').innerHTML = "You attacked!";
        dmg = calculateDamage();
        opponentHealth -= dmg;
        document.getElementById('game-results').innerHTML = "You inflict " + dmg + " damage.";
    } else {
        oAD = opponentAction();
        if (oAD == 'atk') {
            dmg = calculateDamage();
            opponentHealth -= dmg;
            var odmg = calculateDamage();
            playerHealth -= odmg;
            document.getElementById('choice').innerHTML = "Both attacked!";
            document.getElementById('game-results').innerHTML = "You inflict " + dmg + " damage. Opponent inflicts " + odmg + " damage.";
        } else if (oAD == 'def') {
            dmg = calculateDamage();
            var blockedDamage = Math.min(dmg, 3); // Maximum of 3 damage can be blocked
            opponentHealth -= dmg - blockedDamage;
            document.getElementById('choice').innerHTML = "The opponent defended.";
            document.getElementById('game-results').innerHTML = "You inflict " + (dmg - blockedDamage) + " damage.";
        }
    }
    checkHealth();
}

function playerDefend() {
    allow();
    oAD = opponentAction();
    playerOpt = 'def';
    document.getElementById('choice').innerHTML = "";
    if (playerOpt == oAD) {
        document.getElementById('game-results').innerHTML = "You both defended!";
    } else if ((playerOpt == 'atk') || (oAD == 'def')) {
        dmg = calculateDamage();
        var blockedDamage = Math.min(dmg, 3); // Maximum of 3 damage can be blocked
        playerHealth -= dmg - blockedDamage;
        document.getElementById('choice').innerHTML = "The Opponent attacked.";
        document.getElementById('game-results').innerHTML = "You defend and take " + (dmg - blockedDamage) + " damage.";
    }
    checkHealth();
}

function checkHealth() {
    if (playerHealth <= 0) {
        document.getElementById('game-results').innerHTML = 'Opponent wins. Game over!';
        document.getElementById('player-health').innerHTML = "0";
        disableButtons();
    } else if (opponentHealth <= 0) {
        document.getElementById('game-results').innerHTML = 'Player wins. Game over!';
        document.getElementById('opponent-health').innerHTML = "0";
        disableButtons();
    } else {
        document.getElementById('player-health').innerHTML = playerHealth;
        document.getElementById('opponent-health').innerHTML = opponentHealth;
    }
}

function disableButtons() {
    document.getElementById('atk').disabled = true;
    document.getElementById('def').disabled = true;
    document.getElementById('reset-btn').disabled = false;
}

function resetBtn() {
    playerHealth = 100;
    opponentHealth = 100;
    document.getElementById('player-health').innerHTML = playerHealth;
    document.getElementById('opponent-health').innerHTML = opponentHealth;
    document.getElementById('game-results').innerHTML = '';
    document.getElementById('choice').innerHTML = '';
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('atk').disabled = false;
    document.getElementById('def').disabled = false;
}