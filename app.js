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

function clear() {
    display.textContent = 0;
    firstValue = 0;
    secondValue = 0;
    lastKeyType = '';
}

function percentage(value) {
    return value / 100;
}

const display = document.getElementById('display');
const keys = document.querySelector('.keys');
let firstValue = 0;
let secondValue = 0;
let operator = '';
let lastKeyType = '';
let calcResult = 0;

keys.addEventListener('click', e => {
    const key = e.target;
    const action = key.dataset.action;
    if (key.matches('.squarebutton')) { // disables the parent div from being selectable
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('selected')); // loops through all keys and removes .selected
        if (action === 'clear') {
            clear();
        }
        if (!action) {
            if (lastKeyType === 'equal') {
                clear();
            }
            if (display.textContent === '0.') {
                display.textContent += key.textContent;
            } else if (display.textContent === '0' || lastKeyType === 'operator') {
                display.textContent = key.textContent;
            } else {
                display.textContent += key.textContent;
            }
            lastKeyType = 'number'
        }
        // if (Boolean(firstValue) && lastKeyType !== 'operator') {
        //     secondValue = display.textContent;
        //     calcResult = calc(firstValue, operator, secondValue);
        // }
        if (action === 'decimal') {
            if (!display.textContent.includes('.')) {
                display.textContent += '.';
            } else if (lastKeyType === 'operator')  { // issue here - takes 2 clicks to show up on display
                display.textContent = '0.';
            }
        }
        if (action === 'divide' || action === 'multiply' || action === 'minus' || action === 'add') {
            if (lastKeyType === 'operator') {
                key.classList.remove('selected');
                key.classList.add('selected');
                return;
            }
            secondValue = display.textContent;
            if (lastKeyType === 'equal') {
                firstValue = display.textContent;
                lastKeyType = 'operator';
                operator = action;
                key.classList.remove('selected');
                key.classList.add('selected');
                return;
            }
            if (Boolean(firstValue) && Boolean(operator)) {
                display.textContent = calc(firstValue, operator, secondValue);
            }
            key.classList.add('selected');
            lastKeyType = 'operator';
            firstValue = display.textContent;
            operator = action;
            console.log(`1st value=${firstValue} and operator=${operator}`);
        }
        if (action === 'equal') {
            secondValue = display.textContent;
            console.log(`2nd value=${secondValue}`);
            display.textContent = calc(firstValue, operator, secondValue);
            lastKeyType = 'equal';
        }
    }
});

// need to work on stringing together events where user presses number > operator > number > operator. The (number, operator, number) needs to calc and become var firstValue