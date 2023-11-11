document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('.display');
  const input = document.querySelector('.input');
  const tryText = document.querySelector('.try');
  const mistakeText = document.querySelector('.mistake');
  const allCircles = document.querySelectorAll('.step-circle');
  const randomBtn = document.getElementById('randomBtn');
  const resetBtn = document.getElementById('resetBtn');

  const list = ['flower', 'valley', 'lake', 'meadow', 'ocean']; // hard-coded list
  let tries = 0;
  let circleIndex = 0;
  let finalAnswer = [];

  randomBtn.addEventListener('click', grabWord);
  resetBtn.addEventListener('click', removeContent);

  function grabWord() {
    display.innerHTML = '';
    input.innerHTML = '';
    removeContent();
    showPrompt();
  }

  function showPrompt() {
    const word = list[randomNum(list.length)];
    const answer = word.split('');
    const shuffleWord = word.shuffle();

    for (let i = 0; i < shuffleWord.length; i++) {
      // create span
      const letterDisplay = document.createElement('span');
      letterDisplay.textContent = shuffleWord[i];
      letterDisplay.classList.add('letter-display');
      display.appendChild(letterDisplay);

      // create input
      const letterInput = document.createElement('input');
      letterInput.classList.add('letter-input');
      letterInput.setAttribute('id', `input${i}`);
      letterInput.type = 'text';
      letterInput.maxLength = '1';
      letterInput.value = '';
      input.appendChild(letterInput);
    }

    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        input.textContent = e.target.value;
        input.setAttribute('value', `${e.target.value}`);

        // letter inputs + focus/blur
        const letters = /^[a-zA-Z]+$/;
        const nextInputIndex = index + 1;
        if (input.value.match(letters) && nextInputIndex < allInputs.length) {
          document.getElementById(`input${nextInputIndex}`).focus();
        } else {
          document.activeElement.blur();
        }

        //condition: wrong inputs
        if (input.value.match(letters) && input.value !== answer[index]) {
          tries++;
          circleIndex++;
          if (tries < 6) {
            tryText.textContent = `Tries (${tries}/5):`;
            mistakeText.textContent += `${input.value}, `;
            document.getElementById(`step${circleIndex}`).classList.add('completed');
          } else if (tries === 6) {
            alert('😭 Game over...');
            grabWord();
          }
        }

        // condition: correct inputs get pushed into new array
        if (input.value === answer[index]) {
          finalAnswer.push(document.getElementById(`input${index}`).value);
        }

        // condition: solved
        if (answer.join('') === finalAnswer.join('')) {
          alert('🎉 Success!');
          grabWord();
        }
      });
    });
  }

  // fisher-yates shuffle
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

  function randomNum(max) {
    return Math.floor(Math.random() * max);
  }

  function removeContent() {
    tries = 0;
    circleIndex = 0;
    finalAnswer = [];
    tryText.textContent = 'Tries (0/5):';
    allCircles.forEach((el) => {
      el.classList.remove('completed');
    });
    mistakeText.textContent = '';
  }

  // fire up random word when page loads
  showPrompt();
});
