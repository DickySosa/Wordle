// Import stylesheets
import './style.css';

const letter = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info.bar');

async function init() {
  document.addEventListener('keydown', function handlekeyPress(event) {
    const action = event.key;

    console.log(action);
  });
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
