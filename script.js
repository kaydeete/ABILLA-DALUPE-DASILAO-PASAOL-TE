let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = false;

function tossCoin()
{
    var playerOption = document.getElementById('coin-dropdown').value;
    var result = Math.random() < 0.5 ? 'head' : 'tail';
    document.getElementById('reset-btn').disabled = false; 
    document.getElementById('attack-btn').disabled = true;
    document.getElementById('defend-btn').disabled = true;

    if (playerOption == result) // player attacks first
    {
        document.getElementById('attack-btn').disabled = false;
        document.getElementById('defend-btn').disabled = true;
        document.getElementById('game-results').innerHTML = `Coin is ${result}. You chose ${playerOption}! `;
    }
    else // opponent attacks first and player has to defend 
    {
        document.getElementById('attack-btn').disabled = false;
        document.getElementById('defend-btn').disabled = false;
        document.getElementById('game-results').innerHTML = `Coin is ${result}. You chose ${playerOption}! `;
        opponentAD();
    }
}

function calculateDamage() {
    return Math.floor(Math.random() * 5) + 1; // damage for attack
}

function opponentAction()
{
    // 0 for defense and 1 for attack
    var oA = Math.round(Math.random());
    if (oA == 1) {return 'attack';}
    else {return 'defend';}
}

function opponentAD() {
    var action = opponentAction();
    if (action === 'attack') {
        const damage = calculateDamage();
        playerHealth -= damage;
        if (playerHealth < 0)
        {
            playerHealth = 0;
            document.getElementById('player-health').innerHTML = playerHealth;
            document.getElementById('game-results').innerHTML = `Opponent attacks and inflicts ${damage} damage.`;
            checkHealth();
        }
    }
    else {
      document.getElementById('game-results').innerHTML = `Opponent defends.`;
    }
}

function playerAttack()
{
    document.getElementById('defend-btn').disabled = false; 
    document.getElementById('attack-btn').disabled = false;
    var damage = calculateDamage();
    opponentHealth -= damage;
    if (opponentHealth < 0) opponentHealth = 0;
    document.getElementById('opponent-health').innerHTML = opponentHealth;
    document.getElementById('game-results').innerHTML = `You attack and inflict ${damage} damage.`;
    checkHealth();
    opponentAD();
}

function playerDefend()
{
    document.getElementById('defend-btn').disabled = false; 
    document.getElementById('attack-btn').disabled = false;
    var damage = calculateDamage();
    playerHealth -= Math.min(damage, 3);
    if (playerHealth < 0) playerHealth = 0;
    document.getElementById('player-health').innerHTML = playerHealth;
    document.getElementById('game-results').innerHTML = `You defend and block ${Math.min(damage, 3)} damage.`;
    checkHealth();
    opponentAD();
}

function checkHealth() {
    //var dmg = calculateDamage();
    if (playerHealth <= 0) {
        document.getElementById('game-results').innerHTML= 'Opponent wins. Game over!';
        document.getElementById('player-health').innerHTML = "0"
        disableBtn();
    } else if (opponentHealth <= 0) {
        document.getElementById('game-results').innerHTML = 'Player wins. Game over!';
        document.getElementById('opponent-health').innerHTML = "0"
        disableBtn();
    }
}

function disableBtn() {
    document.getElementById('attack-btn').disabled = true;
    document.getElementById('defend-btn').disabled = true;
    document.getElementById('reset-btn').disabled = false;
}

function resetBtn() {
    playerHealth = 100;
    opponentHealth = 100;
    document.getElementById('player-health').innerHTML = playerHealth;
    document.getElementById('opponent-health').innerHTML = opponentHealth;
    document.getElementById('game-results').innerHTML = '';
    disableBtn();
}