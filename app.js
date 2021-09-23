let storedValue = null;
let tempVal = "";
let operator = "";
let prevOperator = "";
let result = 0;
let count = 0;
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
  const numVal = e.target.textContent;
  if (
    screen.textContent.includes(storedValue) &&
    screen.textContent.includes(result)
  ) {
    screen.textContent = "";
  }
  if (screen.textContent.includes("divide")) {
    screen.textContent = "";
    displayCal.textContent = "";
  }
  if (screen.textContent.includes(".")) {
    tempVal += numVal;
    screen.textContent += numVal;
    displayCal.textContent += numVal;
    return;
  }

  if (screen.textContent[0] === "0") {
    if (screen.textContent.includes(".")) {
      return;
    } else {
      screen.textContent = "";
      displayCal.textContent = "";
      tempVal = "";
    }
  }

  tempVal += numVal;
  screen.textContent += numVal;
  displayCal.textContent += numVal;
  if (
    screen.textContent.includes(
      prevOperator ||
        operator ||
        displayCal.textContent.includes(prevOperator || operator)
    )
  ) {
    const toArry = screen.textContent.split("");
    let indexAfterOp = toArry.indexOf(operator) + 1;
    if (screen.textContent[indexAfterOp] === "0") {
      console.log("zero");
    }
  }
}

function backspace() {
  if (
    screen.textContent[screen.textContent.length - 1] === operator ||
    displayCal.textContent[displayCal.textContent.length - 1] === operator
  ) {
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
  displayCal.textContent = displayCal.textContent.slice(0, -1);
}

function clear() {
  screen.textContent = "0";
  displayCal.textContent = "";
  result = 0;
  tempVal = "";
  storedValue = null;
  operator = "";
  prevOperator = "";
  count = 0;
}

function operatorClicked(e) {
  if(tempVal === '0.' || displayCal.textContent === '0.' || tempVal === '0' || screen.textContent === '0'){
    tempVal = ''
    screen.textContent = '0'
    displayCal.textContent = ''
    prevOperator = ''
    operator = ''
    count = 0;
    return
  }
  if (!prevOperator) {
    storedValue = screen.textContent;
    tempVal = "";
  }
  if (prevOperator) {
    arrOps.forEach((op) => {
      if (screen.textContent[screen.textContent.length - 1] === op) {
        screen.textContent = screen.textContent.slice(0, -1);
        prevOperator = e.target.textContent;
      }
      if (displayCal.textContent[displayCal.textContent.length - 1] === op) {
        displayCal.textContent = displayCal.textContent.slice(0, -1);
      }
      calculation(storedValue, tempVal, prevOperator);
      tempVal = "";
    });
    operator = e.target.textContent;
    displayCal.textContent += operator;
  } else {
    operator = e.target.textContent;
    screen.textContent += operator;
    displayCal.textContent += operator;
  }
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
      count = 0;
    } else if (screen.textContent.includes(".") || String(result.length) > 5) {
      result = Number.parseFloat(result).toFixed(2);
      storedValue = result;
      screen.textContent = result;
      displayCal.textContent = result;
      count = 0;
    } else {
      screen.textContent = result;
      displayCal.textContent = result;
      storedValue = result;
      tempVal = "";
      count = 0;
    }
  } else {
    if (!result) {
      screen.textContent = "";
      displayCal.textContent = "";
      count = 0;
    } else {
      displayCal.textContent = result;
      screen.textContent = result;
      tempVal = screen.textContent;
      count = 0;
    }
  }
}

function handleDot(e) {
  screen.textContent.split('').forEach(txt=> {
    if(txt === '.'){
      count++;
    }
  })
  if (count < 3) {
    if (!screen.textContent) {
      screen.textContent += "0" + e.target.textContent;
      displayCal.textContent = "0" + e.target.textContent;
      tempVal = screen.textContent;
      count++;
      return;
    }
    if (!tempVal) {
      screen.textContent = "0" + e.target.textContent;
      displayCal.textContent += "0" + e.target.textContent;
      count++;
      return;
    }
    screen.textContent += e.target.textContent;
    displayCal.textContent += e.target.textContent;
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
