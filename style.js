const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".calculator button");

let currentInput = "";

const updateDisplay = () => {
  display.textContent = currentInput || "0";
};
const isValidExpression = (expression) => {
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];
    if (!"0123456789+-*/.()x ".includes(char)) {
      return false;
    }
  }
  return true;
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("del")) {
      currentInput = currentInput.slice(0, -1);
    } else if (button.classList.contains("reset")) {
      currentInput = "";
    } else if (button.classList.contains("equal")) {
      try {
        if (isValidExpression(currentInput)) {
          let result = eval(currentInput.replace(/x/g, "*"));

          if (result % 1 !== 0) {
            currentInput = parseFloat(result.toFixed(3)).toString();
          } else {
            currentInput = result.toString();
          }
        } else {
          currentInput = "Error";
        }
      } catch {
        currentInput = "Error";
      }
    } else {
      currentInput += value;
    }

    updateDisplay();
  });
});

updateDisplay();
