let displayValue = "";
let tempVal = "";
let value = "";
let operator = "";
let result = "";
const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".calculation");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

let display = screen.textContent;

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") {
    result = add(a, b);
    screen.textContent = result;
    displayValue = result;
  }
  if (operator === "-") {
    result = subtract(a, b);
    screen.textContent = result;
    displayValue = result;
  }
  if (operator === "×") {
    result = multiply(a, b);
    screen.textContent = result;
    displayValue = result;
  }
  if (operator === "÷") {
    result = divide(a, b);
    screen.textContent = result.toFixed;
    displayValue = result;
  }
  return;
}

function clicked(e) {
  const btn = e.target;
  const btnValue = e.target.textContent;
  // Number
  if (btn.classList.contains("num")) {
    // Store value
    value += btnValue;
    displayValue += btnValue;
    screen.textContent = displayValue;
    if (!displayValue.includes(".")) {
      if (displayValue[0] === "0") {
        displayValue = "";
        screen.textContent = 0;
      }
    }
  }
  // Operator
  if (btn.classList.contains("operator")) {
    // operator not assigned
    operator = btnValue;
    if (
      displayValue[displayValue.length - 1] === "+" ||
      displayValue[displayValue.length - 1] === "-" ||
      displayValue[displayValue.length - 1] === "×" ||
      displayValue[displayValue.length - 1] === "÷"
    ) {
      displayValue = displayValue.slice(0, -1);
    }
    displayValue += operator;
    screen.textContent = displayValue;
    getTempVal(value);
    value = "";
  }
  if (screen.textContent[0] === operator) {
    displayValue = "";
    screen.textContent = "";
  }

  if (btn.classList.contains("equal")) {
    operate(operator, tempVal, +value);
  }
  if (btn.classList.contains("dot")) {
    if (!displayValue) {
      displayValue = "0.";
      screen.textContent = displayValue;
    }
    if (!displayValue.includes(".")) {
      displayValue += btn.textContent;
    }
  }
  if (btn.classList.contains("delete")) {
    backspace();
  }
}

function backspace() {
  screen.textContent = screen.textContent.slice(0, -1);
  displayValue = +String(displayValue).slice(0, -1);
  if (result) {
    result = +String(result).slice(0, -1);
  }
}

function clear() {
  displayValue = "";
  screen.textContent = "";
  result = 0;
  tempVal = "";
  value = "";
}

function getTempVal(value) {
  if (result) {
    return (tempVal = result);
  }
  tempVal = +value;
  return tempVal;
}

function init() {
  btns.forEach((el) => el.addEventListener("click", clicked));
}

init();
