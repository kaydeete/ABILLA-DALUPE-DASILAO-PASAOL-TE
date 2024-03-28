let playerHealth = 100;
let opponentHealth = 100;
let result;
let playerOpt;
let oAD;
let dmg;
let action;

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
            if (((dmg-blockedDamage)==1) ||((dmg-blockedDamage)==2))
            {
            document.getElementById('game-results').innerHTML = "You inflict " + (dmg - blockedDamage) + " damage.";
            }
            else
            {
                document.getElementById('game-results').innerHTML = "You inflict " + (dmg - blockedDamage) + " damage." + "<br>" + 'The Opponent was able to block your attack.';
            }
        }
    }
    checkHealth();
}

function playerDefend() {
    allow();
    oAD = opponentAction();
    document.getElementById('choice').innerHTML = "";
    document.getElementById('game-results').innerHTML = "";
    if (oAD == 'atk')
    {
        dmg = calculateDamage();
        var blockedDamage = Math.min(dmg, 3); // Maximum of 3 damage can be blocked
        playerHealth -= dmg - blockedDamage;
        document.getElementById('choice').innerHTML = "The Opponent attacked.";
        if (((dmg-blockedDamage)==1) ||((dmg-blockedDamage)==2))
            {
                document.getElementById('game-results').innerHTML = "You defend and take " + (dmg - blockedDamage) + " damage.";
            }
            else
            {
                document.getElementById('game-results').innerHTML = "You defend and take " + (dmg - blockedDamage) + " damage. <br>You were able to successfully block the attack.";
            }
    }
    else if ('def' == oAD) {
        document.getElementById('game-results').innerHTML = "You both defended!";
    }
    checkHealth();
}

function checkHealth() {
    if (playerHealth <= 0) {
        document.getElementById('game-results').innerHTML = 'Opponent wins. Game over! Might as well coquitte.';
        document.getElementById('player-health').innerHTML = "0";
        disableButtons();
    } else if (opponentHealth <= 0) {
        document.getElementById('game-results').innerHTML = 'Player wins. Game over! How many letters on coquette? 8 yum yum!';
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
