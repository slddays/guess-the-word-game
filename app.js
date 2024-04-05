const btnContainer = document.querySelector('.btn');
const circles = document.querySelectorAll('.step-circle');
const circleContainer = document.querySelector('.circle');
const displayContainer = document.querySelector('.display');
const inputContainer = document.querySelector('.input');
const mistakeText = document.querySelector('.progress__mistake--text');
const tryText = document.querySelector('.progress__try--text');

const list = ['flower', 'valley', 'lake', 'meadow', 'ocean']; // hard-coded list
let userAnswer = [];
let tries = 0;
const maxTry = 6;

let word, wordShuffled;

// Fisher-Yates Shuffle
String.prototype.shuffle = function () {
  const a = this.split(''),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    const k = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[k];
    a[k] = tmp;
  }
  return a.join('');
};

// Functions
function resetContent() {
  userAnswer = [];
  tries = 0;

  tryText.textContent = 'Tries (0/5):';
  mistakeText.textContent = '';
  circles.forEach((el) => el.classList.remove('completed'));
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function focusNext(el, i, inputs) {
  if (i > inputs.length) el.blur();
  if (i < inputs.length - 1) el.nextElementSibling.focus();
}

function checkAnswer(el, i) {
  const answer = word.split('');
  // Input is wrong
  if (el.value !== answer[i]) {
    tries++;

    if (tries < maxTry) {
      const currStepEl = document.querySelector(`.step-circle[data-step="${tries}"]`);

      tryText.textContent = `Tries (${tries}/5):`;
      mistakeText.textContent += `${el.value}, `;
      currStepEl.classList.add('completed');
    }

    if (tries === maxTry) {
      alert('😭 Game over...');
      startGame();
    }
  }

  // Input is correct
  if (el.value === answer[i]) userAnswer.push(el.value);
  if (userAnswer.join('') === answer.join('')) {
    alert('🎉 Success!');
    startGame();
  }
}

// Init Functions
function showPrompt() {
  word = list[randomNum(list.length)];
  wordShuffled = word.shuffle().split('');

  wordShuffled.forEach((el, i) => {
    // Create span
    displayContainer.insertAdjacentHTML('beforeend', `<span class="display__letter">${el}</span>`);

    // Creat input
    inputContainer.insertAdjacentHTML(
      'beforeend',
      `<input class="input__letter" id="input-${i}" type="text" maxLength="1" value=""></input>`
    );
  });
}

function startGame() {
  displayContainer.innerHTML = '';
  inputContainer.innerHTML = '';
  resetContent();
  showPrompt();
}

startGame();

// Event Listeners
inputContainer.addEventListener('input', function (e) {
  const inputs = document.querySelectorAll('.input__letter');
  const inputRule = /^[a-zA-Z]+$/;

  inputs.forEach((el, i) => {
    if (el === e.target) {
      // Set Value
      el.setAttribute('value', `${e.target.value}`);
      el.textContent = e.target.value;
    }

    // Check if input is a letter
    if (el === e.target && el.value.match(inputRule)) {
      focusNext(el, i, inputs);
      checkAnswer(el, i);
    }
  });
});

// Todo: reset btn remove input 'value' and 'text'

btnContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn--random')) startGame();
  if (e.target.classList.contains('btn--reset')) {
    if (tries === 0) return;
    resetContent();
  }
});
