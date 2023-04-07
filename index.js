// Import stylesheets
import './style.css';

const letter = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info.bar');
const ANSWER_LENGTH = 5;

async function init() {
  const currentGuess = '';

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess = currentGuess.substring(0, currentGuess - 1 + letter);
    }
  }

  document.addEventListener('keydown', function handlekeyPress(event) {
    const action = event.key;

    console.log(action);

    if (action === 'Enter') {
      commit();
    } else if (action === 'Backspace') {
      backspace();
    } else if (action === isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
init();
/*
let boxes = document.querySelector('.wordle-layout-grid-container');

function doMoreBoxes() {
  console.log('si');
  for (let i = 1; i <= 29; i++) {
    const moreBoxes = document.createElement('input');
    moreBoxes.setAttribute('class', 'box');
    boxes.appendChild(moreBoxes);
  }
}
doMoreBoxes();
*/
