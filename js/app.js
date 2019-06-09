var scores, roundScore, activePlayer, gamePlaying, sixCounter, secondSixCounter, winScore;

init();

document.querySelector('.score__input').addEventListener('input', getInputValue);


document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {

        var dice = Math.floor(Math.random() * 6) + 1;
        var secondDice = Math.floor(Math.random() * 6) + 1;

        dice === 6 ? sixCounter ++ : sixCounter = 0;
        secondDice === 6 ? secondSixCounter ++ : secondSixCounter = 0;

        
        var diceDOM = document.querySelector('.dice');
        diceDOM.src = './img/dice-' + dice + '.png';
        diceDOM.style.display = 'block';

        var secondDiceDOM = document.querySelector('.dice--mirrored');
        secondDiceDOM.src = './img/dice-' + secondDice + '.png';
        secondDiceDOM.style.display = 'block';

        if (dice !== 1 && secondDice !== 1 && sixCounter !== 2 && secondSixCounter !== 2 ) {
   
            roundScore += dice + secondDice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else  if (sixCounter === 2 || secondSixCounter === 2) {

            document.getElementById('score-' + activePlayer).textContent = '0';
            scores[activePlayer] = 0;
            nextPlayer();

        } else {
            nextPlayer();            
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        scores[activePlayer] += Number(roundScore);
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winScore) {

            gamePlaying = false;

            document.getElementById('name-' + activePlayer).textContent = 'Winner !!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice--mirrored').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            activePlayer === 0 ? document.querySelector('.player-0-panel').classList.remove('active') :
            document.querySelector('.player-1-panel').classList.remove('active-2');

            document.getElementById('scoreInput').disabled = true;

            

        } else nextPlayer();
    }
});


document.querySelector('.btn-new').addEventListener('click',  init);

function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    sixCounter = 0;
    secondSixCounter = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active-2');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice--mirrored').style.display = 'none';

}

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    sixCounter = 0;
    secondSixCounter = 0;

    document.querySelector('.score').reset();

    document.getElementById('scoreInput').removeAttribute('disabled');


    winScore = document.getElementById('scoreInput').value;

    gamePlaying = true;

    document.querySelector('.player-0-panel').classList.remove('winner', 'active');
    document.querySelector('.player-1-panel').classList.remove('winner', 'active-2');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice--mirrored').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';


}


function getInputValue (e) {
    if (gamePlaying) {
      winScore = e.target.value;   
    }
}