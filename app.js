const list = ['apple', 'banana', 'pumpkin', 'table'];

const displayContainer = document.querySelector('.display-container');
const inputContainer = document.querySelector('.input-container');
const tryLabel = document.querySelector('.try');
const allCompleted = document.querySelectorAll('.step-circle');
const mistakeLabel = document.querySelector('.mistake');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
let tries = 0;

function grabWord() {
  emptyContainers();
  showPrompt();
}

function showPrompt() {
  const word = list[randomNum(list.length)];
  const answer = word.split('');
  const shuffleWord = word.shuffle();

  console.log(answer);

  for (let i = 0; i < shuffleWord.length; i++) {
    // Create span
    const letterDisplay = document.createElement('span');
    letterDisplay.textContent = shuffleWord[i];
    letterDisplay.classList.add('letter-display');
    displayContainer.appendChild(letterDisplay);

    // Create input
    const letterInput = document.createElement('input');
    letterInput.classList.add('letter-input');
    letterInput.setAttribute('id', `input${i}`);
    letterInput.type = 'text';
    letterInput.maxLength = '1';
    letterInput.value = '';
    inputContainer.appendChild(letterInput);
  }

  // Input logic
  const allInputs = document.querySelectorAll('input');
  allInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      input.textContent = e.target.value;
      input.setAttribute = ('value', e.target.value);

      if (input.value === answer[index]) {
        console.log('success');
        console.log('----------');
      } else {
        tries++;
        tryLabel.textContent = `Tries (${tries}/5):`;
        document.getElementById(`step${tries}`).classList.add('completed');
        mistakeLabel.textContent += `${input.value}, `;
        console.log(tries, 'fail');
        if (tries === 5) {
          console.log('you have failed');
        }
      }
    });
  });
}

// Shuffle function
String.prototype.shuffle = function () {
  const a = this.split(''), //split string into array
    n = a.length; // array length

  for (let i = n - 1; i > 0; i--) {
    //cycle through every index
    const k = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[k];
    a[k] = tmp;
  }
  return a.join('');
};

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function emptyContainers() {
  displayContainer.innerHTML = '';
  inputContainer.innerHTML = '';
  tryLabel.textContent = 'Tries (0/5):';
  allCompleted.forEach((el) => {
    el.classList.remove('completed');
  });
  mistakeLabel.textContent = '';
}

randomBtn.addEventListener('click', grabWord);
resetBtn.addEventListener('click', function () {
  tryLabel.textContent = 'Tries (0/5):';
  allCompleted.forEach((el) => {
    el.classList.remove('completed');
  });
  mistakeLabel.textContent = '';
});

showPrompt();
