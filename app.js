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
    return result.toFixed(4);
}

const display = document.getElementById('display');
const keys = document.querySelector('.keys');
let afterAction = false;
let firstValue = 0;
let secondValue = 0;
let operator = '';

keys.addEventListener('click', e => {
    const key = e.target;
    const action = key.dataset.action;
    if (key.matches('.squarebutton')) { // disables the parent div from being selectable
        // loops through all keys and removes .selected
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('selected'));
        if (action === 'clear') {
            display.textContent = 0;
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
            display.textContent += '.';
        }
        if (action === 'divide' || action === 'multiply' || action === 'minus' || action === 'add') {
            key.classList.add('selected');
            afterAction = true;
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