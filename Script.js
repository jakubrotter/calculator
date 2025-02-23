document.addEventListener("keydown", function(event) {
    let key = event.key;
    
    if (/[\d+\-*/().]/.test(key)) {
        appendToDisplay(key);
    }


    if (key === "Enter") {
        event.preventDefault();
        calculate();
    }


    if (key === "Backspace") {
        removeLastCharacter();
    }

    if (key === "Escape") {
        clearDisplay();
    }

    if (key.toLowerCase() === "r") {
        appendToDisplay("√");
    }
    if (key.toLowerCase() === "c") {
        clearDisplay();
    }
});

function appendToDisplay(value) {
    let display = document.getElementById('num');

    if (value === '.' && display.value.slice(-1) === '.') {
        return;
    }

    if (value === '√') {
        display.value += '√(';
        return;
    }

    if (value === '/') {
        if (display.value.slice(-1) === '/' || display.value === '') {
            return;
        }
        display.value += '/';
        return;
    }

    if (value === ')') {
        let openCount = (display.value.match(/\(/g) || []).length;
        let closeCount = (display.value.match(/\)/g) || []).length;

        if (openCount > closeCount) {
            display.value += ')';
        }
        return;
    }

    display.value += value;
}

function removeLastCharacter() {
    let display = document.getElementById('num');
    display.value = display.value.slice(0, -1); // Remove last character
}

function calculate() {
    let display = document.getElementById('num');
    try {

        let expression = display.value.replace(/√\(/g, 'Math.sqrt(');

        expression = expression.replace(/\b0+(\d+)/g, '$1');

        display.value = new Function(`return ${expression}`)();
    } catch (error) {
        display.value = 'Error';
    }
}

function clearDisplay() {
    document.getElementById("num").value = "";
}
