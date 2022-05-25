class Calculator {
  constructor() {
    this.clear();
  }

  setValues(prev, curr, op) {
    this.previousOperand = prev;
    this.currentOperand = curr;
    this.operation = op;
    this.updateDisplay();
  }

  clear() {
    this.setValues("", "", undefined);
  }

  partialClear() {
    this.setValues(this.previousOperand, "", this.operation);
  }

  delete() {
    this.setValues(
      this.previousOperand,
      this.currentOperand.toString().slice(0, -1),
      this.operation
    );
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.setValues(
      this.previousOperand,
      this.currentOperand.toString() + number.toString(),
      this.operation
    );
  }

  negate() {
    if (this.currentOperand === "" || this.currentOperand === ".") return;
    this.setValues(
      this.previousOperand,
      (-1 * parseFloat(this.currentOperand)).toString(),
      this.operation
    );
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.setValues(this.currentOperand, "", operation);
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      case "Xʸ":
        computation = Math.pow(prev, curr);
        break;
      case "√":
        if (prev < 0 && !(curr % 2)) {
          computation = "Cannot compute";
          break;
        }
        let n = prev < 0 ? prev * -1 : prev;
        computation =
          !(curr % 2) && prev < 0
            ? -Math.pow(n, 1 / curr)
            : Math.pow(n, 1 / curr);
        break;
      case "LOG":
        if (prev < 0 || curr < 0) {
          computation = "Cannot compute";
          break;
        }
        computation = Math.log(curr) / Math.log(prev);
        break;
      default:
        return;
    }
    this.setValues("", computation.toString(), undefined);
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else return integerDisplay;
  }

  updateDisplay() {
    if (
      this.currentOperand === "Cannot compute" ||
      this.previousOperand === "Cannot compute"
    ) {
      $(".currDataRender")[0].innerText =
        this.currentOperand.toString() + this.previousOperand.toString();
      $(".prevDataRender")[0].innerText = "";
      this.previousOperand = "";
      this.currentOperand = "";
      this.operation = undefined;
      return;
    }
    $(".currDataRender")[0].innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      $(".prevDataRender")[0].innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      $(".prevDataRender")[0].innerText = "";
    }
  }
}

const calculator = new Calculator();

$(".numberButton").click((e) => {
  calculator.appendNumber(e.currentTarget.innerText);
});

$(".operationButton").click((e) => {
  calculator.chooseOperation(e.currentTarget.innerText);
});

$(".equalsButton").click(() => {
  calculator.compute();
});

$(".allClearButton").click(() => {
  calculator.clear();
});

$(".partialClearButton").click(() => {
  calculator.partialClear();
});

$(".deleteButton").click(() => {
  calculator.delete();
});

$(".negateButton").click(() => {
  calculator.negate();
});
