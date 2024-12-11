document.addEventListener("DOMContentLoaded", () => {
    let currentInput = "";
    const screen = document.getElementById("calculator__screen");

    function updateScreen() {
        screen.value = currentInput;
    }

    function appendNumber(number) {
        currentInput += number;
        updateScreen();
    }

    function removeSigns() {
        currentInput = currentInput.slice(0, -1);
        updateScreen();
    }

    function appendOperation(operation) {
        if (currentInput && !/[+\-*/]/.test(currentInput[currentInput.length - 1])) {
            currentInput += operation;
            updateScreen();
        } else if (currentInput && /[+\-*/]/.test(currentInput[currentInput.length - 1])) {
            return; 
        }
    }
    
    function clearScreen() {
        currentInput = "";
        updateScreen();
    }

    function appendComma() {
        const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
        if (lastNumber && !lastNumber.includes(".")) {
            currentInput += ".";
            updateScreen();
        }
    }

    function calculate() {
        try {
            // Zastępujemy 'x' na '*' w celu wykonania operacji mnożenia
            let expression = currentInput.replace('x', '*');
            
            // Zastępujemy '/' na dzielenie
            expression = expression.replace(/(\d+(\.\d+)?)\/(\d+(\.\d+)?)/g, (match, p1, p2, p3, p4) => {
                return parseFloat(p1) / parseFloat(p3); // Zapewnia, że liczby są prawidłowo dzielone
            });
            
            // Sprawdzamy czy wynik jest poprawny przed obliczeniem
            if (expression.includes("/0")) {
                currentInput = "Błąd"; // Obsługa dzielenia przez zero
            } else {
                // Wykonujemy obliczenie, poprawiając problem z kropkami
                const result = new Function("return " + expression)();
                currentInput = result.toString();
            }
        } catch (e) {
            currentInput = "Błąd"; // W razie błędu
        }
        updateScreen();
    }

    function squareRoot() {
        try {
            const result = Math.sqrt(eval(currentInput.replace('x', '*')));
            currentInput = result.toString();
        } catch (e) {
            currentInput = "Błąd";
        }
        updateScreen();
    }

    function power() {
        try {
            const result = Math.pow(eval(currentInput.replace('x', '*')), 2);
            currentInput = result.toString();
        } catch (e) {
            currentInput = "Błąd";
        }
        updateScreen();
    }

    window.appendNumber = appendNumber;
    window.appendOperation = appendOperation;
    window.clearScreen = clearScreen;
    window.removeSigns = removeSigns;
    window.appendComma = appendComma;
    window.calculate = calculate;
    window.squareRoot = squareRoot;
    window.power = power;
});
