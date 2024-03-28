let playerHealth = 100;
let opponentHealth = 100;
var result;
var playerOpt;
var oAD;
var playerTurn = 0;
var dmg;

function tossCoin()
{
    playerOpt = document.getElementById('coin-dropdown').value;
    result = Math.random() < 0.5 ? 'head' : 'tail';
    document.getElementById('reset-btn').disabled = false; 
    document.getElementById('atk').disabled = true;
    document.getElementById('def').disabled = true;
    document.getElementById('game-results').innerHTML = "Coin is " + result + "! You chose " + playerOpt + "!";
    
    if(result == playerOpt)
    {
        document.getElementById('atk').disabled = false;
        document.getElementById('def').disabled = true;
        
    }
    else
    {
        allow();
    }
}

function allow()
{
    document.getElementById('atk').disabled = false;
    document.getElementById('def').disabled = false;
}

function calculateDamage()
{
    return Math.floor(Math.random() * 5) + 1;
}

function opponentAction()
{
    return oAD = Math.random() < 0.5 ? 'atk' : 'def'; 
}

function playerAttack(playerTurn)
{
    allow();
    dmg = calculateDamage();
    if (playerTurn == 1)
    {
        document.getElementById('choice').innerHTML = "You attacked!";
        dmg;
        opponentHealth -= dmg;
        document.getElementById('opponent-health').innerHTML = opponentHealth;
        document.getElementById('game-results').innerHTML = "You inflict" + dmg + "damage.";
    }
    else
    {
        oAD = opponentAction();
            if (oAD == 'atk')
            {
                dmg;
                opponentHealth -= dmg;
                var odmg = calculateDamage();
                playerHealth -= odmg;
                document.getElementById('choice').innerHTML = "Both attacked!" ;
                document.getElementById('game-results').innerHTML = "You inflict " + dmg + " damage. Opponent inflict " + odmg + " damage.";
                document.getElementById('opponent-health').innerHTML = opponentHealth;
            }
            else if (oAD =='def')
            {
                dmg;
                dmg -= 3;
                document.getElementById('choice').innerHTML = "The opponent defended.";
                opponentHealth -= dmg;
                if (dmg == 1 || dmg ==2)
                {
                    opponentHealth -= dmg;
                    document.getElementById('game-results').innerHTML = "You inflict " + dmg + " damage.";
                }
                else
                {
                    document.getElementById('game-results').innerHTML = "You inflict " + dmg + " damage." + "<br>" + 'The Opponent was able to block your attack.';
                }
            }
    }
    checkHealth();
}

function playerDefend()
{
    allow();
    oAD = opponentAction();
    playerOpt = 'def';
    document.getElementById('choice').innerHTML="";
    if (playerOpt == oAD)
    {
        document.getElementById('game-results').innerHTML="You both defended!";
    }
    else if ((playerOpt == 'atk') || (oAD == 'def'))
    { 
        dmg = calculateDamage();
        dmg -= 3;
        document.getElementById('choice').innerHTML="The Opponent attacked.";
        if ((dmg == 1) || (dmg == 2))
        {
            playerHealth -= dmg;
            document.getElementById('game-results').innerHTML="Sinubukan mong depensahan pero hindi ito sapat! Nakatama ka ng " + dmg + " ,kawawa ka naman!";
        }
        else
        {
            document.getElementById('game-results').innerHTML="Tuluyan mo itong nadepensahan! CONGRATS!";
        }
    }
    checkHealth();
}

function checkHealth() {
    dmg = calculateDamage();
    if ((playerHealth -=dmg) <= 0) {
        document.getElementById('choice').innerHTML="";
        document.getElementById('game-results').innerHTMLt = 'Opponent wins. Game over!';
        document.getElementById('player-health').innerHTML = "0"
        disableButtons();
    } else if ((opponentHealth -= dmg) <= 0) {
        document.getElementById('choice').innerHTML="";
        document.getElementById('game-results').innerHTML = 'Player wins. Game over!';
        document.getElementById('opponent-health').innerHTML = "0"
        disableButtons();
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
    document.getElementById('game-actions').style.display = 'none';
    document.getElementById('game-results').innerHTML = '';
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('atk').disabled = false;
    document.getElementById('def').disabled = false;
}