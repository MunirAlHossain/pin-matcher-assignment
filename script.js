
// List of  variable

const numberKeyPad = document.querySelector('.numbers');
let userInput = document.getElementById('user-pin-input');

const submitBtn = document.getElementById('submit-btn');

const wrongNotify = document.getElementById('wrong-pin');
const successNotify = document.getElementById('correct-pin');

let tryLeft = document.getElementById('maxTry');
let totalTry = 3;


// Rendom Numbers Generator Section

const generateBtn = document.getElementById('generate-btn');
const generatedPin = document.getElementById('random-number');
generateBtn.addEventListener('click', function () {
  generatedPin.value = randomRange(1000, 9999);
  
  resetStage();
});

function randomRange(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}


// Hide Section
function hideAllMessage() {
  wrongNotify.style.display = 'none';
  successNotify.style.display = 'none';
}
hideAllMessage();

// User Input Section
numberKeyPad.addEventListener('click', function (e) {
  hideAllMessage();
  let targetKey = e.target;
  keyPadInput(targetKey);
});

function keyPadInput(targetKey) {
  if (targetKey.classList.contains('button')) {

    // Clear 'C' btn
    if (targetKey.dataset.type == 'clear') {
      userInput.value = '';
    }

    // BackSpace '<' btn
    else if (targetKey.dataset.type == 'backSpace') {
      let inputString = userInput.value;
      userInput.value = inputString.slice(0, inputString.length - 1);
    }

    // when click on the reset number btn
    else {
      const newDigit = targetKey.innerHTML;
      userInput.value += newDigit;
    }
  }

  if (
    targetKey.classList.contains('submit-btn') &&
    generatedPin.value.length > 0
  ) {
    varifyUserInput();
  }
}

function varifyUserInput() {
  if (userInput.value == generatedPin.value) {
    successNotify.style.display = 'block';
  }
  // When input  mismatch
  else {
    wrongNotify.style.display = 'block';
    totalTry--;
    tryLeft.innerText = totalTry;

    if (totalTry == 0) {
      submitBtn.disabled = true;
      
    }
  }
}

// Reset Stage after 3 Try:
function resetStage() {
  totalTry = 3;
  tryLeft.innerText = totalTry;
  userInput.value = '';
  hideAllMessage();
}