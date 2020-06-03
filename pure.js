const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount;
let resetButton;
let randomNumber;

function getRandomNumber() {
  /**
   * This function generates a random number from 1 to 10
   *
   * @return {Number} Return a rundom number.
  */
		return Math.floor(Math.random() * 10);
}

function setInitalState() {
  /**
   * This function sets initial state for variables
  */
  randomNumber = getRandomNumber();
  guessCount = 0;
}

function cleanAndFocus() {
  /**
   * This helper function to clear guessField and set a focus on it
  */
  guessField.value = '';
  guessField.focus();
}

function setLastResultContent(text, color = undefined) {
  /**
   * This helper function to set lastResultContent
   * 
   * @param {String} text                Text value. 
   * @param {String} [color = undefined] Color value as a String. e.g. 'red', 'green', etc.
  */
  lastResult.textContent = text;
  if (color) {
    lastResult.style.backgroundColor = color
  };
}

function setGuessFieldAndSubmitTo(state) {
  /**
  * This helper function to set a state (enable/disable) for guessField and guessSubmit 
  * 
  * @param {Boolean} state State as a logical value. e.g. true or false.
  */
  guessField.disabled = state;
  guessSubmit.disabled = state;
}


function checkGuess() {
  if (guessCount === undefined){
    setInitalState();
  }
  let userGuess = Number(guessField.value);
  guessCount = ++guessCount;
  cleanAndFocus();

  if(guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if(userGuess === randomNumber) {
    setLastResultContent('Congratulations! You got it right!', 'green');
    lowOrHi.textContent = '';
    setGameOver();
  } else if(guessCount < 5) {
    setLastResultContent('Wrong!', 'red');
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  } else {
    setLastResultContent('!!!GAME OVER!!!');
    lowOrHi.textContent = '';
    setGameOver();
  }
}

function setGameOver() {
  setGuessFieldAndSubmitTo(true);
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  const resetParas = document.querySelectorAll('.resultParas p');
  for(let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton);

  setGuessFieldAndSubmitTo(false);
  cleanAndFocus();

  lastResult.style.backgroundColor = 'white';
  setInitalState();  
}

guessSubmit.addEventListener('click', checkGuess);