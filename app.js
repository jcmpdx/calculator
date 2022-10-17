const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
}

const power = function(a, b) {
	return a ** b;
};

const display = document.getElementById('display');
const keys = document.querySelector('.keys');
let afterAction = false;

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
        }
    }

});