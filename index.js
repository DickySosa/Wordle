// Import stylesheets
import './style.css';

const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

async function init() {
  let currentGuess = '';
  let currentRow = 0;

  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  setLoading(false);
  console.log(word);

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      //add letter to the end
      currentGuess += letter;
    } else {
      //replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  //navegate through the lines of the boxes
  async function commit() {
    if (currentGuess.length != ANSWER_LENGTH) {
      //do nothing
      return;
    }

    currentRow++;
    currentGuess = '';
  }

  //fuction that helps to go back in the boxes
  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = '';
  }

  //validate the keys and comands
  document.addEventListener('keydown', function handlekeyPress(event) {
    const action = event.key;

    if (action === 'Enter') {
      commit();
    } else if (action === 'Backspace') {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

//Use this function to test is a string is a single alphabetical string is a letter
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
//loading div
function setLoading(isLoading) {
  loadingDiv.classList.toggle('show', isLoading);
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
