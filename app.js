document.addEventListener('DOMContentLoaded', function () {
    const attemptsButtons = document.querySelectorAll('.btn-data');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const startButton = document.querySelector('.start-button');
    const startGameSection = document.querySelector('.start-game');
    const gameContainer = document.querySelector('.container');
    const player1Container = document.querySelector('#player1-container');
    const player2Container = document.querySelector('#player2-container');
    const player1ChoiceDiv = document.querySelector('#player1-choice');
    const player2ChoiceDiv = document.querySelector('#player2-choice');
    const player1Score = document.querySelector('#player1-score');
    const player2Score = document.querySelector('#player2-score');
    const resultDiv = document.querySelector('#result');
    const player2Label = document.querySelector('#player2-label');
    let attempts = 0;
    let mode = '';
    let currentAttempt = 0;
    let player1ScoreCount = 0;
    let player2ScoreCount = 0;
    let player1Choice = '';
    let player2Choice = '';
    let currentPlayer = 'player1';

    attemptsButtons.forEach(button => {
        button.addEventListener('click', function () {
            attempts = parseInt(this.getAttribute('data-attempts'));
            attemptsButtons.forEach(btn => btn.classList.remove('btn-active'));
            this.classList.add('btn-active');
        });
    });

    modeButtons.forEach(button => {
        button.addEventListener('click', function () {
            mode = this.getAttribute('data-mode');
            modeButtons.forEach(btn => btn.classList.remove('btn-active'));
            this.classList.add('btn-active');
        });
    });

    startButton.addEventListener('click', function () {
        if (attempts > 0 && mode) {
            startGameSection.style.display = 'none';
            gameContainer.style.display = 'flex';
            player2Container.style.display = mode === 'player' ? 'flex' : 'none';
            player2Label.textContent = mode === 'player' ? 'PLAYER 2' : 'COMPUTER';
        } else {
            alert('Please select the number of attempts and game mode.');
        }
    });

    function playRound(player, choice) {
        if (player === 'player1') {
            player1Choice = choice;
            setTimeout(() => {
                player1ChoiceDiv.innerHTML = `<img src="img/${choice}.png" alt="${choice}" class="fade-in">`;
            }, 200); // Retraso de 200 ms para la animación
            if (mode === 'computer') {
                player2Choice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
                setTimeout(() => {
                    player2ChoiceDiv.innerHTML = `<img src="img/${player2Choice}.png" alt="${player2Choice}" class="fade-in">`;
                }, 400); // Retraso de 400 ms para la animación
                determineWinner();
            } else {
                currentPlayer = 'player2';
            }
        } else {
            player2Choice = choice;
            setTimeout(() => {
                player2ChoiceDiv.innerHTML = `<img src="img/${choice}.png" alt="${choice}" class="fade-in">`;
            }, 200); // Retraso de 200 ms para la animación
            determineWinner();
        }
    }

    function determineWinner() {
        if (player1Choice === player2Choice) {
            resultDiv.textContent = 'It\'s a draw!';
        } else if (
            (player1Choice === 'rock' && player2Choice === 'scissors') ||
            (player1Choice === 'paper' && player2Choice === 'rock') ||
            (player1Choice === 'scissors' && player2Choice === 'paper')
        ) {
            resultDiv.textContent = 'Player 1 wins!';
            player1ScoreCount++;
            player1Score.textContent = player1ScoreCount;
        } else {
            resultDiv.textContent = 'Player 2 wins!';
            player2ScoreCount++;
            player2Score.textContent = player2ScoreCount;
        }

        currentAttempt++;
        if (currentAttempt >= attempts) {
            endGame();
        } else {
            currentPlayer = 'player1';
        }
    }

    function endGame() {
        let finalResult = '';
        if (player1ScoreCount > player2ScoreCount) {
            finalResult = 'Player 1 wins the game!';
        } else if (player2ScoreCount > player1ScoreCount) {
            finalResult = 'Player 2 wins the game!';
        } else {
            finalResult = 'The game is a draw!';
        }
    
        const modal = document.getElementById('myModal');
        const finalResultParagraph = document.getElementById('final-result');
        const span = document.getElementsByClassName('close')[0];
    
        finalResultParagraph.textContent = finalResult;
        modal.style.display = 'flex';
    
        // Close the modal when the user clicks on <span> (x)
        span.onclick = function() {
            modal.style.display = 'none';
            window.location.reload();
        }
    
        // Close the modal when the user clicks anywhere outside of the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                window.location.reload();
            }
        }
    }
    

    const buttons = document.querySelectorAll('.buttons-container img');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if ((currentPlayer === 'player1' && this.getAttribute('data-player') === 'player1') || 
                (currentPlayer === 'player2' && this.getAttribute('data-player') === 'player2')) {
                playRound(this.getAttribute('data-player'), this.getAttribute('data-choice'));
            }
        });
    });
});
