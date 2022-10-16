
const display = document.getElementById('display');
const keys = document.querySelector('.keys');

window.addEventListener('keydown', function(e) {
    console.log(e.keyCode);
});

keys.addEventListener('click', e => {
    const key = e.target;
    const action = key.dataset.action;
    if (key.matches('.squarebutton')) { // disables the parent div from being selectable
        if (action == null) console.log(`number key: ${key.textContent}`);
        if (action === 'clear' || action === 'positive_negative' || action === 'percent' || action === 'divide' || action === 'multiply' || action === 'minus' || action === 'add' || action === 'equal') {
            console.log(`execute operation: ${action}`);
        }
    }
});