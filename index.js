// Import stylesheets
import './style.css';

const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

async function init() {
  let currentGuess = '';
  let currentRow = 0;
  const ROUNDS = 6;

  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split('');
  let done = false;
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

    //Correct, close, wrong
    //split what it does is that return a string coverten into an array. try  "POOLS".split

    const guesParts = currentGuess.split('');
    const map = makeMap(wordParts);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guesParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');
        map[guesParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guesParts[i] === wordParts[i]) {
        //do nothing, its already done
        /*wordParts is an array, function .includes helps  us to verify if wordParts
        have anywhere guesParts inside of it*/
      } else if (wordParts.includes(guesParts[i]) && map[guesParts[i]] > 0) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add('close');
        map[guesParts[i]]--;
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong');
      }
    }

    //win or lose

    if (currentGuess === word) {
      alert('You Win!');
      done = true;
      return;
    }

    currentRow++;
    currentGuess = '';

    if (currentRow === ROUNDS) {
      alert(`you lose, the words was ${word}`);
      done = true;
    }
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

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
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
