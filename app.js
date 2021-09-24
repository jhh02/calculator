const subDisplay = document.querySelector(".calculating");
const mainDisplay = document.querySelector(".calculation");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equal = document.querySelector(".equal");
const floatDot = document.querySelector(".floatdot");

const arrOps = ["+", "-", "×", "÷"];
let numDotCount = 0;
let result = 0;
let storedValue = null;
let tempValue = "";
let operator = "";
let prevOperator = "";

function operate(a, b, op) {
  return op === "+"
    ? a + b
    : op === "-"
    ? a - b
    : op === "×"
    ? a * b
    : op === "÷" && b === 0
    ? "You can't divide a number by 0"
    : a / b;
}

function numClicked(e) {
  const numVal = e.target.textContent;

  if (
    mainDisplay.textContent.includes(storedValue) &&
    mainDisplay.textContent.includes(result)
  ) {
    mainDisplay.textContent = "";
  }

  if (mainDisplay.textContent.includes("divide")) {
    mainDisplay.textContent = "";
    subDisplay.textContent = "";
  }

  if (mainDisplay.textContent.includes(".")) {
    tempValue += numVal;
    mainDisplay.textContent += numVal;
    subDisplay.textContent += numVal;
    return;
  }

  if (mainDisplay.textContent[0] === "0") {
    if (mainDisplay.textContent.includes(".")) {
      return;
    } else {
      mainDisplay.textContent = "";
      subDisplay.textContent = "";
      tempValue = "";
    }
  }

  tempValue += numVal;
  mainDisplay.textContent += numVal;
  subDisplay.textContent += numVal;
}

function backspace() {
  if (
    subDisplay.textContent[subDisplay.textContent.length - 1] === operator &&
    mainDisplay.textContent[mainDisplay.textContent.length - 1] ===
      String(result)[String(result).length - 1]
  ) {
    subDisplay.textContent = subDisplay.textContent.slice(0, -1);
    operator = "";
    prevOperator = "";
    return;
  }

  if (
    mainDisplay.textContent[mainDisplay.textContent.length - 1] === operator ||
    subDisplay.textContent[subDisplay.textContent.length - 1] === operator
  ) {
    operator = "";
    prevOperator = "";
  } else if (mainDisplay.textContent === String(result)) {
    result = +String(result).slice(0, -1);
    storedValue = +String(storedValue).slice(0, -1);
  } else if (
    mainDisplay.textContent[mainDisplay.textContent.length - 1] ===
    tempValue[tempValue.length - 1]
  ) {
    tempValue = tempValue.slice(0, -1);
  }

  if (mainDisplay.textContent === "") {
    storedValue = "";
    tempValue = "";
    operator = "";
  }

  mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
  subDisplay.textContent = subDisplay.textContent.slice(0, -1);
}

function clear() {
  result = 0;
  numDotCount = 0;
  storedValue = null;
  tempValue = "";
  operator = "";
  prevOperator = "";
  mainDisplay.textContent = "0";
  subDisplay.textContent = "";
}

function operatorClicked(e) {
  if (
    tempValue === "0." ||
    subDisplay.textContent === "0." ||
    tempValue === "0" ||
    mainDisplay.textContent === "0"
  ) {
    numDotCount = 0;
    tempValue = "";
    operator = "";
    prevOperator = "";
    mainDisplay.textContent = "0";
    subDisplay.textContent = "";
    return;
  }

  if (!prevOperator) {
    storedValue = mainDisplay.textContent;
    tempValue = "";
  }

  if (prevOperator) {
    arrOps.forEach((op) => {
      if (mainDisplay.textContent[mainDisplay.textContent.length - 1] === op) {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        prevOperator = e.target.textContent;
      }

      if (subDisplay.textContent[subDisplay.textContent.length - 1] === op) {
        subDisplay.textContent = subDisplay.textContent.slice(0, -1);
      }

      calculation(storedValue, tempValue, prevOperator);
      tempValue = "";
    });

    operator = e.target.textContent;
    subDisplay.textContent += operator;
  } else {
    operator = e.target.textContent;
    mainDisplay.textContent += operator;
    subDisplay.textContent += operator;
  }

  prevOperator = operator;
}

function calculation(e) {
  if (!tempValue) {
    return;
  }

  if (tempValue && !storedValue && !result) {
    mainDisplay.textContent = tempValue;
    return;
  }

  if (tempValue && operator) {
    result = operate(+storedValue, +tempValue, operator);
    operator = "";
    if (isNaN(result)) {
      storedValue = 0;
      result = 0;
      tempValue = 0;
      numDotCount = 0;
      mainDisplay.textContent = "You can't divide a number by 0";
    } else if (
      mainDisplay.textContent.includes(".") ||
      String(result.length) > 4
    ) {
      console.log('working');
      result = Number.parseFloat(result).toFixed(2);
      numDotCount = 0;
      storedValue = result;
      subDisplay.textContent = result;
      mainDisplay.textContent = result;
    } else {
      console.log('not working 1');
      tempValue = "";
      numDotCount = 0;
      result = Number.parseFloat(result).toFixed(2)
      storedValue = result;
      mainDisplay.textContent = result;
      subDisplay.textContent = result;
    }
  } else {
    if (!result) {
      console.log('not working 2');
      numDotCount = 0;
      mainDisplay.textContent = "";
      subDisplay.textContent = "";
    } else {
      console.log('not working 3');
      numDotCount = 0;
      subDisplay.textContent = result;
      mainDisplay.textContent = result;
      tempValue = mainDisplay.textContent;
    }
  }
}

function handlefloatDot(e) {
  if (mainDisplay.textContent[mainDisplay.textContent.length - 1] === "." || tempValue.split('').includes('.')) {
    return;
  }

  mainDisplay.textContent.split("").forEach((txt) => {
    if (txt === ".") {
      numDotCount++;
    }
  });

  if (numDotCount < 3) {
    if (!mainDisplay.textContent) {
      numDotCount++;
      tempValue = mainDisplay.textContent;
      mainDisplay.textContent += "0" + e.target.textContent;
      subDisplay.textContent = "0" + e.target.textContent;
      return;
    }

    if (!tempValue) {
      numDotCount++;
      mainDisplay.textContent = "0" + e.target.textContent;
      subDisplay.textContent += "0" + e.target.textContent;
      return;
    }
    
    tempValue += e.target.textContent;
    mainDisplay.textContent += e.target.textContent;
    subDisplay.textContent += e.target.textContent;
  }
}

function init() {
  clearBtn.addEventListener("click", clear);
  equal.addEventListener("click", calculation);
  deleteBtn.addEventListener("click", backspace);
  floatDot.addEventListener("click", handlefloatDot);
  numbers.forEach((el) => el.addEventListener("click", numClicked));
  operators.forEach((el) => el.addEventListener("click", operatorClicked));
}

init();
