let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = false;

function tossCoin()
{
    var playerOption = document.getElementById('coin-dropdown').value;
    var result = Math.random() < 0.5 ? 'head' : 'tail';
    document.getElementById('reset-btn').disabled = false; 
    document.getElementById('attack-btn').disabled = false;
    document.getElementById('defend-btn').disabled = false;

    if (playerOption == result)
    {
        document.getElementById('attack-btn').disabled = false;
        document.getElementById('defend-btn').disabled = true;
        document.getElementById('game-results').innerHTML = `Coin is ${result}. You chose ${playerOption}! `;
    }
    else
    {
        document.getElementById('attack-btn').disabled = true;
        document.getElementById('defend-btn').disabled = true;
        document.getElementById('game-results').innerHTML = `Coin is ${result}. You chose ${playerOption}! `;
    }
}

function calculateDamage() {
    return Math.floor(Math.random() * 5) + 1; // damage for attack
}

function opponentAction()
{
    var oppAD = Math.random();
    switch(oppAD)
    {
        case 0:
            var odmg = calculateDamage();
            document.getElementById('game-results').innetHTML = "Opponent inflicts " + ${odmg} + " damage.";

            if (odmg <=3 )
            {
                document.getElementById('game-results').innerHTML = 'You have completely blocked the opponent.';
            }
            else
            {
                document.getElementById('game-results').innerHTML = "You both attack each other.";
            }
            break;
        case 1:
            var pdmg = calculateDamage();
            if (pdmg <=3)
            {
                document.getElementById('game-results').innerHTML = "Opponent completely blocked the attack!";
            }
            break;
    }
}
function playerAction(action)
{
    switch(action)
    {
        case 'attack':
            playerAttack();
            document.getElementById('game-results').innerHTML = "You will attack.";
            break;
        case 'defend':
            playerDefend()
            document.getElementById('game-results').innerHTML = 'You will defend.';
    }
}

function playerAttack()
{
    document.getElementById('attack-btn').disabled = false;
    document.getElementById('defend-btn').disabled = false;

    if (action == 'attack') {
        document.getElementById('game-results').innerHTML = 'You attack!';
        const damage = calculateDamage();
        opponentHealth -= damage;
        document.getElementById('opponent-health').innerHTML = opponentHealth;
        document.getElementById('game-results').innerHTML += ` You inflict ${damage} damage.`;
    }
    checkHealth();
}

function playerDefend()
{
    document.getElementById('attack-btn').disabled = false;
    document.getElementById('defend-btn').disabled = false;

    if (opponentDefend())
    {
        document.getElementById('game-results').innerHTML += "The opponent defended too";
    }
    else {
        document.getElementById('game-results').innerHTML += "You defended";
    }
}

function opponentAttack()
{
    var odmg = calculateDamage();
    document.getElementById('game-results').innerHTML = "Opponent inflicts ${odmg} damage";
    if (odmg <=3)
    {
        document.getElementById('game-results').innerHTML = "You have completely blocked the opponent";
    }
    else if (action == 'attack')
    {
        document.getElementById('game-results').innerHTML = "You both attack each other";
        playerHealth -= odmg;
    }
}

function opponentDefend ()
{
    var pdmg = calculateDamage();
    if (pdmg <=3)
    {
        document.getElementById('game-results').innerHTML = "Opponent complete blocked the attack!";
    }
}

function checkHealth() {
    var dmg = calculateDamage();
    if ((playerHealth -=dmg) <= 0) {
        document.getElementById('game-results').innerHTMLt = 'Opponent wins. Game over!';
        document.getElementById('player-health').innerHTML = "0"
        disableButtons();
    } else if ((opponentHealth -= dmg) <= 0) {
        document.getElementById('game-results').innerHTML = 'Player wins. Game over!';
        document.getElementById('opponent-health').innerHTML = "0"
        disableButtons();
    }
}

function disableButtons() {
    document.getElementById('attack-btn').disabled = true;
    document.getElementById('defend-btn').disabled = true;
    document.getElementById('reset-btn').disabled = false;
}

function resetBtn() {
    playerHealth = 100;
    opponentHealth = 100;
    document.getElementById('player-health').innerHTML = playerHealth;
    document.getElementById('opponent-health').innerHTML = opponentHealth;
    document.getElementById('game-actions').style.display = 'none';
    document.getElementById('game-results').innerHTML = '';
    document.getElementById('reset-btn').disabled = true;
}