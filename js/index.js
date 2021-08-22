let displayValue = '0';
const inputValue = document.querySelector('.input-value');
inputValue.textContent = displayValue;
let evaluated = false;

const buttons = document.querySelectorAll('.calc-buttons button');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButtton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
const decimalButton = document.querySelector('.decimal');

numberButtons.forEach((button) => {
	button.addEventListener('click', populate);
});
operatorButtons.forEach((button) => {
	button.addEventListener('click', populate);
});
decimalButton.addEventListener('click', populate);

equalsButtton.addEventListener('click', onEquals);
clearButton.addEventListener('click', onClear);
backspaceButton.addEventListener('click', onBackspace);

function add(num1, num2) {
	return (num1 + num2).toString();
}

function subtract(num1, num2) {
	return (num1 - num2).toString();
}

function multiply(num1, num2) {
	return (num1 * num2).toString();
}

function divide(num1, num2) {
	return (num1 / num2).toString();
}

function operate(operator, num1, num2) {
	switch (operator) {
		case '+':
			return add(num1, num2);
		case '-':
			return subtract(num1, num2);
		case '*':
			return multiply(num1, num2);
		case '/':
			return divide(num1, num2);
		default:
			return 'Illegal Operation';
	}
}

// Multiplication and division are evaluated together as they have tthe same operator precedence
function evaluateMultDiv(expression) {
	let i = 0;
	while (i < expression.length) {
		if (expression[i] === '*') {
			expression.splice(
				i - 1,
				3,
				operate('*', Number(expression[i - 1]), Number(expression[i + 1]))
			);
			i--;
		} else if (expression[i] === '/') {
			expression.splice(
				i - 1,
				3,
				operate('/', Number(expression[i - 1]), Number(expression[i + 1]))
			);
			i--;
		}
		i++;
	}
	return expression;
}

// Addition and subtraction are evaluated together as they have tthe same operator precedence
function evaluateAddSub(expression) {
	let j = 0;
	while (j < expression.length) {
		if (expression[j] === '+') {
			expression.splice(
				j - 1,
				3,
				operate('+', Number(expression[j - 1]), Number(expression[j + 1]))
			);
			j--;
		} else if (expression[j] === '-') {
			expression.splice(
				j - 1,
				3,
				operate('-', Number(expression[j - 1]), Number(expression[j + 1]))
			);
			j--;
		}
		j++;
	}
	return expression;
}

function evaluate(expression) {
	expression = evaluateMultDiv(expression);
	expression = evaluateAddSub(expression);
	inputValue.textContent = expression[0];
	displayValue = expression[0];
}

// Add value of button pressed to the input box
function populate(event) {
	let isSymbol = (value) => ['/', '*', '-', '+'].includes(value);
	let value = event.target['value'];
	if (isSymbol(value)) {
		if (isSymbol(displayValue[displayValue.length - 2])) {
			displayValue = displayValue.substring(0, displayValue.length - 3);
		}

		displayValue += ' ' + value + ' ';

		currentCharSize = 3;
		evaluated = false;
	} else if (value === '.') {
		let i = displayValue.length - 1;
		let hasDecimal = false;
		while (i > 0 && displayValue[i] !== ' ') {
			if (displayValue[i] === '.') {
				hasDecimal = true;
			}
			i--;
		}
		if (!hasDecimal) {
			displayValue += '.';
			if (evaluated === true) evaluated = false;
		}
	} else {
		if (evaluated === true) {
			displayValue = value;
			evaluated = false;
		} else {
			if (displayValue === '0') {
				displayValue = value;
			} else {
				displayValue += value;
			}
		}
		currentCharSize = 1;
	}
	inputValue.textContent = displayValue;
}

function onEquals() {
	evaluate(displayValue.split(' '));
	evaluated = true;
}

function onClear() {
	displayValue = '0';
	inputValue.textContent = displayValue;
}

function onBackspace() {
	if (displayValue.length == 1) {
		displayValue = '0';
	} else if (displayValue[displayValue.length - 1] === ' ') {
		displayValue = displayValue.substring(0, displayValue.length - 3);
	} else {
		displayValue = displayValue.substring(0, displayValue.length - 1);
	}
	inputValue.textContent = displayValue;
}
