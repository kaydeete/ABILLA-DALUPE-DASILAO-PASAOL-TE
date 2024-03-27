let playerHealth = 100;
let opponentHealth = 100;
let playerTurn = false;

function tossCoin(playerChoice) {
    const result = Math.random() < 0.5 ? 'head' : 'tail';
    const message = `Coin is ${result}. You chose ${playerChoice}!`;

    if (playerChoice === result) {
        playerTurn = true;
        document.getElementById('game-actions').style.display = 'block';
        document.getElementById('attack-btn').disabled = false;
        document.getElementById('defend-btn').disabled = true;
    } else {
        playerTurn = false;
        document.getElementById('game-actions').style.display = 'block';
        document.getElementById('attack-btn').disabled = false;
        document.getElementById('defend-btn').disabled = false;
    }

    alert(message);
}

function calculateDamage() {
    return Math.floor(Math.random() * 5) + 1;
}

function opponentAction() {
    return Math.random() < 0.5 ? 'attack' : 'defend';
}

function playerAttack() {
    const damage = calculateDamage();
    opponentHealth -= damage;
    document.getElementById('opponent-health').textContent = opponentHealth;
    document.getElementById('game-results').textContent = `You inflict ${damage} damage.`;
    checkHealth();
    toggleButtons();
}

function playerDefend() {
    const damage = calculateDamage();
    playerHealth -= damage;
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('game-results').textContent = `Opponent inflicts ${damage} damage.`;
    checkHealth();
    toggleButtons();
}

function checkHealth() {
    if (playerHealth <= 0) {
        document.getElementById('game-results').textContent = 'Opponent wins.';
        toggleButtons();
    } else if (opponentHealth <= 0) {
        document.getElementById('game-results').textContent = 'Player wins.';
        toggleButtons();
    }
}

function toggleButtons() {
    document.getElementById('attack-btn').disabled = !document.getElementById('attack-btn').disabled;
    document.getElementById('defend-btn').disabled = !document.getElementById('defend-btn').disabled;
    document.getElementById('reset-btn').disabled = !document.getElementById('reset-btn').disabled;
}

function resetGame() {
    playerHealth = 100;
    opponentHealth = 100;
    playerTurn = false;
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('opponent-health').textContent = opponentHealth;
    document.getElementById('game-results').textContent = '';
    document.getElementById('game-actions').style.display = 'none';
    document.getElementById('reset-btn').disabled = true;
}