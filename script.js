let displayText = document.querySelector(".displayText");
let displayMath = document.querySelector(".displayMath");
let result = false;


window.addEventListener('keydown', keyboardDisplay);


function keyboardDisplay(e) {
    let key = parseInt(e.key);
    if (!isNaN(key)) {
        display(e.key);
    }
    else {
        if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == 'x' || e.key == '/' || e.key == '^' || e.key == '!' || e.key == '.') {
            if (e.key == '*') {
                display('x');
            }
            else {
                display(e.key);
            }
        }
        else if (e.key == 'Enter') {
            calculate();
        }
        else if (e.key == 'Backspace' || e.key == 'Delete') {
            deleteCharacter();
        }
        else if (e.key == 'Escape') {
            clearDisplay();
        }
    }
}


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


function exponential(a, b) {
    let swapped = false;
    let bNegative = false;
    b = Math.round(b);
    
    if (a == 0 && b == 0) {
        return 1;
    }

    if (a < 0) {
        a = a * -1;
        swapped = true;
    }

    if (b < 0) {
        b = b * -1;
        bNegative = true;
    }
    
    let result = a;

    for (let i = 1; i < b; i++) {
        result *= a;
    }

    if (bNegative == true) {
        result = 1 / result;
    }

    if (swapped == true) {
        result *= -1;
    }

    return result;
}


function factor(a) {
    a = Math.round(a);
    let negative = false;

    if (a == 0) {
        return 1;
    }

    if (a < 0) {
        negative = true;
        a *= -1;
    }

    let result = 1;

    for (let i = 1; i <= a; i++) {
        result *= i;
    }

    if (negative == true) {
        result *= -1;
    }

    return result;
}


function operate(number1, operator, number2) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);

    result = true;

    if (operator == "+") {
        let added = add(number1, number2);
        displayText.textContent = roundDecimals(added);
        return added;
    }

    if (operator == "-") {
        let subtracted = subtract(number1, number2);
        displayText.textContent = roundDecimals(subtracted);
        return subtracted;
    }

    if (operator == "x") {
        let multiplied = multiply(number1, number2);
        displayText.textContent = roundDecimals(multiplied);
        return multiplied;
    }

    if (operator == "/") {
        let divided = divide(number1, number2);
        displayText.textContent = roundDecimals(divided);
        return divided;
    }

    if (operator == "^") {
        let exponentiated = exponential(number1, number2);
        displayText.textContent = roundDecimals(exponentiated);
        return exponentiated;
    }
}


function display(char) {

    // This code checks if current displayed number is a result from previous math, not clearing the display if user enters an operator
    if (result == true) {
        if (char == '+' || char == '-' || char == '/' || char == 'x' || char == '!' || char == '^') {
            result = false;
            if (isNaN(displayText.textContent) || !isFinite(displayText.textContent)) {
                displayText.textContent = '0';
            }
        }
        else {
            clearDisplay();
        }
    }

    if (char == '.') {
        let valid = checkIfValid('.');
        if (valid == false) {
            return;
        }
    }

    if (char == '^')  {
        let valid = checkIfValid('^');
        if (valid == false) {
            return;
        }
    }

    if (displayText.textContent.toString() == '0') {
        if (char == '+' || char == '/' || char == 'x' || char == '.' || char == '!' || char == '^') {
            displayText.textContent += char;
        }
        else {
            displayText.textContent = char;
        }
        
    }
    else {

        // Prevents operators immediately after another operator
        if (char == '+' || char == '/' || char == 'x' || char == '.' || char == '^') {
            let len = displayText.textContent.toString().length - 1;
            if (displayText.textContent[len] == '+' || displayText.textContent[len] == '/' || displayText.textContent[len] == 'x' ||
            displayText.textContent[len] == '.' || displayText.textContent[len] == '^' || displayText.textContent[len] == '-') {
                displayText.textContent = displayText.textContent.slice(0, -1);
            }
            else if (char == '!' && displayText.textContent[len] == '!'){
                displayText.textContent = displayText.textContent.slice(0, -1);
            }
        }

        if (char == '-') {
            let len = displayText.textContent.toString().length - 1;
            if (displayText.textContent[len] == '-') {
                displayText.textContent = displayText.textContent.slice(0, -1);
            }
        }
        displayText.textContent += char;
    }
}


function clearDisplay() {
    displayText.textContent = '0';
    result = false;
    displayMath.textContent = '';
}


function deleteCharacter() {
    if (result == true) {
        displayMath.textContent = '';
        clearDisplay();
    }
    displayText.textContent = displayText.textContent.slice(0, -1);
    if (displayText.textContent == '') {
        displayMath.textContent = '';
        displayText.textContent = '0';
    }
}


function calculate(str = displayText.textContent, initial = true) {
    let n1 = '';
    let operator = '';
    let n2 = '';
    let numberDone = false;
    let operatorFound = false;
    let broke = false;    
    
    // Following code is for formula display
    if (initial == true) {
        displayMath.textContent = "";
        for (let i = 0; i < str.length; i++) {
            if (str[i] == '+' || str[i] == '-' || str[i] == '/' || str[i] == 'x') {
                displayMath.textContent += " " + str[i] + " "
            }
            else {
                displayMath.textContent += str[i];
            }
        }
        displayMath.textContent += " =";
    }
    
    // Deals with operation logic, evaluating numbers in pairs
    for (let i = 0; i < str.length; i++) {
        if (i == 0 && str[i] == '-') {
            n1 += str[i];
        }

        else if (str[i] == '+' || str[i] == '-' || str[i] == '/' || str[i] == 'x' || str[i] == '^') {
            if (str[i] == '-' && str[i-1] == '^' || str[i-1] == '+' || str[i-1] == '-' || str[i-1] == '/' || str[i-1] == 'x') {
                n2 += str[i];
            }

            else if (operatorFound == false) {
                operator += str[i];
                numberDone = true;
                operatorFound = true;
            }
            else {
                if (isNaN(parseInt(n1)) || isNaN(parseInt(n2))) {
                    result = true;
                    displayText.textContent = "NaN";
                    displayMath.textContent = "";
                    broke = true;
                    break;
                }
                else {
                    let newNumber1 = operate(n1, operator, n2);
                    let newString = newNumber1 + str.slice(i);
                    calculate(newString, false);
                    broke = true;
                    break;
                }
            }
        }
        else if (numberDone == false) {
            if (str[i] == '!') {
                console.log(n1);
                n1 = factor(n1);
            }
            else {
                n1 += str[i];
            }
        }
        else {
            if (str[i] == '!') {
                n2 = factor(n2);
            }
            else {
                n2 += str[i];
            }
        }
    }
    if (broke == false) {
        if (operatorFound == false && str.includes('!')) {
            displayText.textContent = n1;
        }
        operate(n1, operator, n2);
    }
}


function checkIfValid(char) {
    for (let i = displayText.textContent.toString().length; i > 0; i--) {
        if (displayText.textContent[i] == char) {
            return false;
        }
        if (displayText.textContent[i] == '+' || displayText.textContent[i] == '/' || displayText.textContent[i] == 'x' || displayText.textContent[i] == '-') {
            return true;
        }
    }
    return true;
}


function roundDecimals(int) {
    if (int.toString().length >= 16 && int.toString().includes(".")) {
        return parseFloat(int.toFixed(8));
    }
    return int;
}