let storedValue = null;
let tempVal = "";
let operator = "";
let prevOperator = "";
let result = 0;
const arrOps = ["+", "-", "×", "÷"];

const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const screen = document.querySelector(".calculation");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equal = document.querySelector(".equal");
const displayCal = document.querySelector(".calculating");
const dot = document.querySelector(".dot");

function minus(a, b) {
  return a - b;
}
function plus(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return "You can't divide a number by 0";
  } else {
    return a / b;
  }
}

function operate(a, b, operator) {
  if (operator === "+") {
    return plus(a, b);
  }
  if (operator === "-") {
    return minus(a, b);
  }
  if (operator === "×") {
    return multiply(a, b);
  }
  if (operator === "÷") {
    return divide(a, b);
  }
  return;
}

function numClicked(e) {
  if (screen.textContent.includes(result)) {
    screen.textContent = "";
  }
  let numVal = e.target.textContent;
  if (screen.textContent.includes("divide")) {
    screen.textContent = "";
  }
  if (screen.textContent.includes(".")) {
    tempVal += numVal;
    screen.textContent += numVal;
    return;
  }
  if (screen.textContent[0] === "0") {
    if (screen.textContent.includes(".")) {
      tempVal += numVal;
      screen.textContent += numVal;
      return;
    } else {
      screen.textContent = "";
      tempVal = "";
    }
  }

  tempVal += numVal;
  screen.textContent += numVal;
}

function backspace() {
  if (screen.textContent[screen.textContent.length - 1] === operator) {
    operator = "";
    prevOperator = "";
  } else if (screen.textContent === String(result)) {
    result = +String(result).slice(0, -1);
    storedValue = +String(storedValue).slice(0, -1);
  } else if (
    screen.textContent[screen.textContent.length - 1] ===
    tempVal[tempVal.length - 1]
  ) {
    tempVal = tempVal.slice(0, -1);
  }
  if (screen.textContent === "") {
    storedValue = "";
    tempVal = "";
    operator = "";
  }
  screen.textContent = screen.textContent.slice(0, -1);
}

function clear() {
  screen.textContent = "0";
  result = 0;
  tempVal = "";
  storedValue = "";
  operator = "";
}

function operatorClicked(e) {
  if (!prevOperator) {
    storedValue = screen.textContent;
    tempVal = "";
  }

  if (prevOperator) {
    arrOps.forEach((op) => {
      if (screen.textContent[screen.textContent.length - 1] === op) {
        screen.textContent = screen.textContent.slice(0, -1);
        prevOperator = e.target.textContent;
        screen.textContent += prevOperator;
      }
    });
  } else {
    operator = e.target.textContent;
    screen.textContent += operator;
  }
  if (prevOperator) {
    calculation(storedValue, tempVal, prevOperator);
    tempVal = "";
  }
  operator = e.target.textContent;
  prevOperator = operator;
}

function calculation(e) {
  if (!tempVal) {
    return;
  }
  if (tempVal && !storedValue && !result) {
    screen.textContent = tempVal;
    return;
  }
  if (tempVal && operator) {
    result = operate(+storedValue, +tempVal, operator);
    operator = "";
    if (isNaN(result)) {
      screen.textContent = "You can't divide a number by 0";
      storedValue = 0;
      result = 0;
      tempVal = 0;
    } else if (screen.textContent.includes(".")) {
      result = Number.parseFloat(result).toFixed(2);
      storedValue = result;
      screen.textContent = result;
    } else {
      screen.textContent = result;
      storedValue = result;
      tempVal = "";
    }
  } else {
    if (!result) {
      screen.textContent = "";
    } else {
      screen.textContent = result;
      tempVal = screen.textContent;
    }
  }

  console.log(
    `storedValue:${storedValue}, tempVal:${tempVal}, result:${result}`
  );
}

function handleDot(e) {
  if (!screen.textContent) {
    screen.textContent = "0.";
    tempVal = screen.textContent;
  }
  if (!screen.textContent.includes(".")) {
    screen.textContent += e.target.textContent;
    tempVal += e.target.textContent;
  }
}

function init() {
  nums.forEach((el) => el.addEventListener("click", numClicked));
  operators.forEach((el) => el.addEventListener("click", operatorClicked));
  equal.addEventListener("click", calculation);
  clearBtn.addEventListener("click", clear);
  deleteBtn.addEventListener("click", backspace);
  dot.addEventListener("click", handleDot);
}

init();
