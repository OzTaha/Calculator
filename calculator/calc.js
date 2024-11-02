let display = document.getElementById("display");
let currentInput = "";
let operator = "";
let firstOperand = "";

window.onbeforeunload = function () {
  clearDisplay();
};

// Klavye ile etkileşim
document.addEventListener("keydown", handleKeyboardInput);

// Butonlara tıklama işlevleri
function appendNumber(number) {
  if (currentInput === "0" && number !== "0") {
    currentInput = "";
  }
  currentInput += number;
  updateDisplay();
}

function setOperation(op) {
  if (currentInput === "") return;
  if (firstOperand !== "") {
    calculateResult();
  }
  operator = op;
  firstOperand = currentInput;
  currentInput = "";
}

function clearDisplay() {
  currentInput = "";
  operator = "";
  firstOperand = "";
  updateDisplay("0");
}

function calculateResult() {
  let result;
  let secondOperand = currentInput;
  if (firstOperand === "" || secondOperand === "" || operator === "") return;

  switch (operator) {
    case "+":
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case "-":
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case "*":
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case "/":
      if (secondOperand === "0") {
        display.value = "Sıfıra bölünemez";
        clearAll();
        return;
      }
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
    default:
      return;
  }

  currentInput = result.toString();
  updateDisplay(currentInput);
  clearAll();
}

// Yardımcı fonksiyonlar
function updateDisplay(value = currentInput) {
  display.value = value || "0";
}

function clearAll() {
  currentInput = "";
  operator = "";
  firstOperand = "";
}

// Klavye girişi kontrolü
function handleKeyboardInput(event) {
  const key = event.key;

  if (!isNaN(key) && key !== " ") {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    setOperation(key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  } else if (key === "Backspace") {
    event.preventDefault();
    removeLastDigit();
  }
}

function removeLastDigit() {
  currentInput = currentInput.slice(0, -1) || "0";
  updateDisplay();
}
