
//   let firstInput = document.getElementById("firstNumber");
//   const secondInput = document.getElementById("secondNumber");
//   const resultDisplay = document.getElementById("Result");

//   const firstNumber = Number(firstInput.value);
//   const secondNumber = Number(secondInput.value);

//   if (firstInput.value === ""  secondInput.value === "") {
//     resultDisplay.textContent = "Please enter valid numbers";
//     return;
//   }
//   if (isNaN(firstNumber)  isNaN(secondNumber)) {
//     resultDisplay.textContent = "Please enter valid numbers";
//     return;
//   }

//   switch (operator) {
//     case "+":
//       resultDisplay.textContent =
//         parseInt(firstNumber) + parseInt(secondNumber);
//       break;
//     case "-":
//       resultDisplay.textContent =
//         parseInt(firstNumber) - parseInt(secondNumber);
//       break;
//     case "*":
//       resultDisplay.textContent =
//         parseInt(firstNumber) * parseInt(secondNumber);
//       break;
//     case "/":
//       resultDisplay.textContent =
//         parseInt(firstNumber) / parseInt(secondNumber);
//       break;
//   }

// }

//object literal
let calculator = {
  inputText: document.getElementById("txtbox"),
  firstValue: null,
  secondValue: null,
  Operator: "",

  isValidNumber: function (value) {
    if (value === null || value === undefined || value === "") {
      return false;
    }

    const number = Number(value);
    return Number.isFinite(number);
  },

  WriteText: function (button) {
    if (!this.inputText) {
      console.error("Calculator input not found.");
      return;
    }

    if (!button || button.value === undefined || button.value === null) {
      console.error("Invalid button value.");
      return;
    }

    this.inputText.value += button.value;
  },

  operatorClick: function (currentOperator) {
    if (!this.inputText) {
      console.error("Calculator input not found.");
      return;
    }

    if (!currentOperator || !currentOperator.value) {
      console.error("No valid operator was provided.");
      return;
    }

    const currentText = this.inputText.value.trim();

    if (currentText === "") {
      console.warn("Please enter a number before choosing an operator.");
      return;
    }

    const lastCharacter = currentText.slice(-1);
    if (["+", "-", "*", "/"].includes(lastCharacter)) {
      this.inputText.value = currentText.slice(0, -1) + currentOperator.value;
      this.Operator = currentOperator.value;
      return;
    }

    const firstNumber = Number(currentText);
    if (!Number.isFinite(firstNumber)) {
      console.error("The current value is not a valid number.");
      return;
    }

    this.firstValue = firstNumber;
    this.Operator = currentOperator.value;
    this.inputText.value += currentOperator.value;
  },
  Calculation: function () {
    if (!this.inputText) {
      console.error("Calculator input not found.");
      return;
    }

    const expression = this.inputText.value.trim();

    if (expression === "" || this.Operator === "") {
      console.warn("Please enter a valid expression before calculating.");
      return;
    }

    const operatorIndex = expression.lastIndexOf(this.Operator);
    if (operatorIndex === -1 || operatorIndex === expression.length - 1) {
      console.warn("Expression is incomplete.");
      return;
    }

    const firstText = expression.slice(0, operatorIndex);
    const secondText = expression.slice(operatorIndex + 1);

    if (!this.isValidNumber(firstText) || !this.isValidNumber(secondText)) {
      console.error("Expression contains invalid numbers.");
      return;
    }

    this.firstValue = Number(firstText);
    this.secondValue = Number(secondText);

    if (this.Operator === "/" && this.secondValue === 0) {
      this.inputText.value = "Error";
      console.error("Cannot divide by zero.");
      return;
    }

    switch (this.Operator) {
      case "+":
        this.inputText.value = this.firstValue + this.secondValue;
        break;
      case "-":
        this.inputText.value = this.firstValue - this.secondValue;
        break;
      case "*":
        this.inputText.value = this.firstValue * this.secondValue;
        break;
      case "/":
        this.inputText.value = this.firstValue / this.secondValue;
        break;
      default:
        this.inputText.value = "Error";
        console.error("Invalid operator.");
        return;
    }

    this.Operator = "";
    this.firstValue = null;
    this.secondValue = null;
  },
  Delete: function () {
    this.inputText.value = "";
    this.firstValue = null;
    this.secondValue = null;
    this.secondText = null;
    this.Operator = null;
    this.expression = null;
  },
  dotClick: function () {
    if (!this.inputText) {
      console.error("Calculator input not found.");
      return;
    }

    const currentValue = this.inputText.value;

    if (currentValue === "") {
      this.inputText.value = "0.";
      return;
    }

    if (currentValue.endsWith(".")) {
      return;
    }

    this.inputText.value += ".";
  },
};
