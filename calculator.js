const calculator = {
    displayValue: '0',
    firstOperand: null,
    SecondOperand: false,
    operator: null,
  };
  
  function numInsert(digit) {
    const { displayValue, SecondOperand } = calculator;
  
    if (SecondOperand === true) {
      calculator.displayValue = digit;
      calculator.SecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function inputDecimal(dot) {
    if (calculator.SecondOperand === true) {
        calculator.displayValue = "0."
      calculator.waitingForSecondOperand = false;
      return
    }
  
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.SecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
  
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
  
      calculator.displayValue = `${parseFloat(result.toFixed(6))}`;
      calculator.firstOperand = result;
    }

  
    calculator.SecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') 
    { 
      if(firstOperand / secondOperand === Infinity){
      const display = document.querySelector('.result');
      display.value = calculator.displayValue;
      display.value = 'wyd bro?'
      return resetCalculator();
    }
      return firstOperand / secondOperand;
    }
    return secondOperand;
  }


  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.SecondOperand = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.result');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          numInsert(value);
        }
    }
  
    updateDisplay();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key == "0") {numInsert('0'); updateDisplay();}
    else if (event.key == "1") {numInsert('1'); updateDisplay();}
    else if (event.key == "2") {numInsert('2'); updateDisplay();}
    else if (event.key == "3") {numInsert('3'); updateDisplay();}
    else if (event.key == "4") {numInsert('4'); updateDisplay();}
    else if (event.key == "5") {numInsert('5'); updateDisplay();}
    else if (event.key == "6") {numInsert('6'); updateDisplay();}
    else if(event.key == "7") {numInsert('7'); updateDisplay();}
    else if(event.key == "8") {numInsert('8'); updateDisplay();}
    else if(event.key == "9") {numInsert('9'); updateDisplay();}
    else if(event.key == ".") {inputDecimal('.'); updateDisplay();}
    else if(event.key == 'Backspace') {resetCalculator(); updateDisplay();}
    else if (event.key == "=") {handleOperator('='); updateDisplay();}
    else if (event.key == "+") {handleOperator('+'); updateDisplay();}
    else if (event.key == "-") {handleOperator('-'); updateDisplay();}
    else if (event.key == "*") {handleOperator('*'); updateDisplay();}
    else if (event.key == "/") {handleOperator('/'); updateDisplay();}
});
