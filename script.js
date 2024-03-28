let playerHealth = 100;
let opponentHealth = 100;
let result;
let playerOpt;
let oAD;
let dmg;
let action;

//Function to start a coin toss and initialize the game state
function tossCoin() {
    //Get the players choice from the drop down menu
    playerOpt = document.getElementById('coin-dropdown').value;
    //Randomly determines the result of the coin toss
    result = Math.random() < 0.5 ? 'head' : 'tail';
    //Enables the reset button and disable attack and defend buttons
    document.getElementById('reset-btn').disabled = false;
    document.getElementById('atk').disabled = true;
    document.getElementById('def').disabled = true;
    //Displays the coin toss result and players choice
    document.getElementById('game-results').innerHTML = "Coin is " + result + "! You chose " + playerOpt + "!";
    //Enables the attack button if players choice matches the coin toss result otherwise it allows both actions (attack and defend) 
    if (result == playerOpt) {
        document.getElementById('atk').disabled = false;
        document.getElementById('def').disabled = true;
    } else {
        //Function to enable both attack and defend buttons
        allow();
    }
}

//Function to allow the player to choose between attack and defend
function allow() {
    document.getElementById('atk').disabled = false;
    document.getElementById('def').disabled = false;
}

//Function to calculate a random damage whithin a certain range
function calculateDamage() {
    return Math.floor(Math.random() * 5) + 1;
}

//Function to stimulate opponents action
function opponentAction() {
    return Math.random() < 0.5 ? 'atk' : 'def'; 
}

//Function to handle players attack action
function playerAttack(playerTurn) {
    allow();
    if (playerTurn == 1) { //
        document.getElementById('choice').innerHTML = "You attacked!";
        dmg = calculateDamage();
        opponentHealth -= dmg;
        document.getElementById('game-results').innerHTML = "You inflict " + dmg + " damage.";
    } else { //It displays the players attack action and the damage result
        oAD = opponentAction();
        if (oAD == 'atk') {
            dmg = calculateDamage();
            opponentHealth -= dmg;
            var odmg = calculateDamage();
            playerHealth -= odmg;
            document.getElementById('choice').innerHTML = "Both attacked!";
            document.getElementById('game-results').innerHTML = "You inflict " + dmg + " damage. Opponent inflicts " + odmg + " damage.";
        } else if (oAD == 'def') { //Handle opponent defending
            dmg = calculateDamage();
            var blockedDamage = Math.min(dmg, 3); // Maximum of 3 damage can be blocked
            opponentHealth -= dmg - blockedDamage;
            document.getElementById('choice').innerHTML = "The opponent defended.";
            //Display damage result after considering opponents defense
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
    checkHealth(); //Check player's health after action
}

//Function to handle player's defend action
function playerDefend() {
    allow();
    oAD = opponentAction();
    document.getElementById('choice').innerHTML = "";
    document.getElementById('game-results').innerHTML = "";
    if (oAD == 'atk')
    {//Determine opponents function and calculate the damages

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
    else if ('def' == oAD) { //Both players defended
        document.getElementById('game-results').innerHTML = "You both defended!";
    }
    checkHealth(); //Check the health after player's action
}

//Function to check the players' health and dtermine the game result
function checkHealth() {
    if (playerHealth <= 0) {//Disables the attack or defend buttons if the game is over
        document.getElementById('game-results').innerHTML = 'Opponent wins. Game over! Might as well coquitte.';
        document.getElementById('player-health').innerHTML = "0";
        disableButtons();
    } else if (opponentHealth <= 0) {//Disables the attack or defend buttons if the game is over

        document.getElementById('game-results').innerHTML = 'Player wins. Game over! How many letters on coquette? 8 yum yum!';
        document.getElementById('opponent-health').innerHTML = "0";
        disableButtons();
    } else {//As the game continues it gives the players' updated health
        document.getElementById('player-health').innerHTML = playerHealth;
        document.getElementById('opponent-health').innerHTML = opponentHealth;
    }
}

//Function to disable the attack or defend buttons and enable the reset button
function disableButtons() {
    document.getElementById('atk').disabled = true;
    document.getElementById('def').disabled = true;
    document.getElementById('reset-btn').disabled = false;
}

//Function to reset the game
function resetBtn() {
    playerHealth = 100;
    opponentHealth = 100;
    document.getElementById('player-health').innerHTML = playerHealth;
    document.getElementById('opponent-health').innerHTML = opponentHealth;
    document.getElementById('game-results').innerHTML = '';
    document.getElementById('choice').innerHTML = '';
    //This conditions to disable the attack or defend button and enables the coin toss button
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('atk').disabled = true;
    document.getElementById('def').disabled = true;
}

