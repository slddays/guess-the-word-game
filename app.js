const displayContainer = document.querySelector('.display-container');
const inputContainer = document.querySelector('.input-container');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
const list = ['apple', 'banana', 'chocolate', 'table']; //hard-coded a list of words

function grabWord() {
  displayContainer.innerHTML = '';
  inputContainer.innerHTML = '';

  showPrompt();
  // addEventListener for keypress for input?
}

function showPrompt() {
  const index = randomNum(list.length);
  const word = list[index];
  const answer = word.split('');
  const shuffleWord = word.shuffle();

  console.log(answer);
  console.log(shuffleWord);

  for (let i = 0; i < shuffleWord.length; i++) {
    const letterDisplay = document.createElement('span');
    letterDisplay.textContent = shuffleWord[i];
    letterDisplay.classList.add('letter-display');
    displayContainer.appendChild(letterDisplay);

    const letterInput = document.createElement('input');
    letterInput.type = 'text';
    letterInput.maxLength = '1';
    letterInput.value = '';
    letterInput.classList.add('letter-input');
    inputContainer.appendChild(letterInput);
  }
}

// shuffle letters of a string (fisher-yates shuffle)
String.prototype.shuffle = function () {
  const a = this.split(''), //split string into array
    n = a.length; // array length

  for (let i = n - 1; i > 0; i--) {
    //cycle through every index
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

randomBtn.addEventListener('click', grabWord);
showPrompt();

const allInputs = document.querySelectorAll('input');
for (let input of allInputs) {
  input.addEventListener('keypress', function () {
    console.log('its working');
  });
}
