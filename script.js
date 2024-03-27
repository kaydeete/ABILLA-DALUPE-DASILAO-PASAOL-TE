let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = false;

function calculateDamage() {
    return Math.floor(Math.random() * 5) + 1;
}

function tossCoin() {
    document.getElementById('reset-btn').disabled = false; 
    const selectedOption = document.getElementById('coin-dropdown').value;
    const result = Math.random() < 0.5 ? 'head' : 'tail';

    if (selectedOption === result) {
        playerTurn = true;
        document.getElementById('game-actions').style.display = 'block';
        document.getElementById('attack-btn').disabled = false;
        document.getElementById('defend-btn').disabled = true;
        document.getElementById('game-results').textContent = `Coin is ${result}. You chose ${selectedOption}! `;
    } else {
        playerTurn = false;
        document.getElementById('game-actions').style.display = 'block';
        document.getElementById('attack-btn').disabled = true;
        document.getElementById('defend-btn').disabled = false; 
        document.getElementById('game-results').textContent = `Coin is ${result}. You chose ${selectedOption}. You will defend.`;
    }
}

function opponentAction() {
    const isAttack = Math.random() < 0.5;
    if (isAttack) {
        const playerDamage = calculateDamage();
        if (playerDamage === 0) {
            document.getElementById('game-results').textContent = 'The opponent completely blocked the attack!';
            return 'defend';
        } else {
            opponentHealth -= playerDamage;
            document.getElementById('opponent-health').textContent = opponentHealth;
            return 'attack';
        }
    } else {
        return 'defend';
    }
    //return Math.random() < 0.5 ? 'attack' : 'defend';
}

function playerAction(action) {

    document.getElementById('attack-btn').disabled = false;
    document.getElementById('defend-btn').disabled = false;

    if (action === 'attack') {
        document.getElementById('game-results').textContent = 'You will attack. You attack!';
        const damage = calculateDamage();
        opponentHealth -= damage;
        document.getElementById('opponent-health').textContent = opponentHealth;
        document.getElementById('game-results').textContent += ` You inflict ${damage} damage.`;
    } else if (action === 'defend') {
        document.getElementById('game-results').textContent = 'You defend!';
        const damage = calculateDamage();
        playerHealth -= damage;
        document.getElementById('player-health').textContent = playerHealth;
        document.getElementById('game-results').textContent += ` Opponent inflicts ${damage} damage.`;
    }
    checkHealth();
}

function playerDefend() {
    let opponentDamage = 1; // Assume opponent always inflicts 1 damage when attacking

    // Check if player successfully blocks opponent's attack
    const playerBlocked = Math.random() < 0.5;

    if (playerBlocked) {
        document.getElementById('game-results').textContent = `You completely blocked the opponent.`;
    } else {
        // Check if opponent is also defending
        const opponentDefending = Math.random() < 0.5;

        if (opponentDefending) {
            document.getElementById('game-results').textContent = `The opponent defended too.`;
        }
        else {
            document.getElementById('game-results').textContent = `Opponent inflicts ${opponentDamage} damage.`;
            playerHealth -= opponentDamage;
            document.getElementById('player-health').textContent = playerHealth;
        }
    }

    checkHealth();
    isPlayerTurn = true;
    document.getElementById('attack-btn').disabled = false;
    document.getElementById('defend-btn').disabled = false;
}
playerDefend();

function checkHealth() {
    if (playerHealth <= 0) {
        document.getElementById('game-results').textContent = 'Opponent wins. Game over!';
        disableButtons();
    } else if (opponentHealth <= 0) {
        document.getElementById('game-results').textContent = 'Player wins. Game over!';
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
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('opponent-health').textContent = opponentHealth;
    document.getElementById('game-actions').style.display = 'none';
    document.getElementById('game-results').textContent = '';
    document.getElementById('reset-btn').disabled = true;
}