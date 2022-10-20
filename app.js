const add = function(a, b) {
	return parseFloat(a) + parseFloat(b);
};

const subtract = function(a, b) {
	return parseFloat(a) - parseFloat(b);
};

const multiply = function(a, b) {
    return parseFloat(a) * parseFloat(b);
};

const divide = function(a, b) {
    return parseFloat(a) / parseFloat(b);
}

const power = function(a, b) {
	return parseFloat(a) ** parseFloat(b);
};

function calc(a, operator, b) {
    let result = 0;
    if (operator === 'add') result = add(a, b);
    if (operator === 'minus') result = subtract(a, b);
    if (operator === 'multiply') result = multiply(a, b);
    if (operator === 'divide') result = divide(a, b);
    result = Math.round(result * 10000) / 10000; // rounding to 4 decimal places
    return result;
}

const display = document.getElementById('display');
const keys = document.querySelector('.keys');
let afterAction = false;
let firstValue = 0;
let secondValue = 0;
let operator = '';
let lastKeyType = '';

keys.addEventListener('click', e => {
    const key = e.target;
    const action = key.dataset.action;
    if (key.matches('.squarebutton')) { // disables the parent div from being selectable
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('selected')); // loops through all keys and removes .selected
        if (action === 'clear') {
            display.textContent = 0;
            firstValue = 0;
            secondValue = 0;;
        }
        if (!action) {
            if (display.textContent === '0' || afterAction === true) {
                display.textContent = key.textContent;
                afterAction = false;
            } else {
                display.textContent += key.textContent;
            }
        }
        if (action === 'decimal') {
            afterAction = false;
            if (!display.textContent.includes('.')) {
                display.textContent += '.';
            } else if (lastKeyType === 'operator')  { // problem here -- takes 2 clicks to work
                console.log(`afterAction = ${afterAction}`);
                display.textContent = '0.';
            }
        }
        if (action === 'divide' || action === 'multiply' || action === 'minus' || action === 'add') {
            key.classList.add('selected');
            afterAction = true;
            lastKeyType = 'operator';
            firstValue = display.textContent;
            operator = action;
            console.log(`1st value=${firstValue} and operator=${operator}`);
        }
        if (action === 'equal') {
            secondValue = display.textContent;
            console.log(`2nd value=${secondValue}`);
            display.textContent = calc(firstValue, operator, secondValue);
        }
    }
});

// need to work on stringing together events where user presses number > operator > number > operator. The (number, operator, number) needs to calc and become var firstValue