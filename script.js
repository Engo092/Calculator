let displayText = document.querySelector(".displayText");
let displayMath = document.querySelector(".displayMath");
let result = false;


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

function operate(number1, operator, number2) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);

    result = true;

    if (operator == "+") {
        let added = add(number1, number2);
        if (added.toString().length >= 16 && added.toString().includes(".")) {
            added = parseFloat(added.toFixed(8));
        }
        displayText.textContent = added;
        return added;
    }

    if (operator == "-") {
        let subtracted = subtract(number1, number2);
        if (subtracted.toString().length >= 16 && subtracted.toString().includes(".")) {
            subtracted = parseFloat(subtracted.toFixed(8));
        }
        displayText.textContent = subtracted
        return subtracted;
    }

    if (operator == "x") {
        let multiplied = multiply(number1, number2);
        if (multiplied.toString().length >= 16 && multiplied.toString().includes(".")) {
            multiplied = parseFloat(multiplied.toFixed(8));
        }
        displayText.textContent = multiplied
        return multiplied;
    }

    if (operator == "/") {
        let divided = divide(number1, number2);
        if (divided.toString().length >= 16 && divided.toString().includes(".")) {
            divided = parseFloat(divided.toFixed(8));
            console.log(divided);
        }
        displayText.textContent = divided;
        return divided;
    }
    
}

function display(char) {
    if (result == true) {

        if (char == '+' || char == '-' || char == '/' || char == 'x') {
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
        console.log("y");
        for (let i = displayText.textContent.toString().length; i > 0; i--) {
            if (displayText.textContent[i] == '.') {
                return;
            }
            if (displayText.textContent[i] == '+' || displayText.textContent[i] == '/' || displayText.textContent[i] == 'x' || displayText.textContent[i] == '-') {
                break;
            }
        }
    }

    if (displayText.textContent.toString() == '0') {
        if (char == '+' || char == '/' || char == 'x' || char == '.') {
            displayText.textContent += char;
        }
        else {
            displayText.textContent = char;
        }
        
    }
    else {
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

    for (let i = 0; i < str.length; i++) {
        if (i == 0 && str[i] == '-') {
            n1 += str[i];
        }

        else if (str[i] == '+' || str[i] == '-' || str[i] == '/' || str[i] == 'x') {
            if (operatorFound == false) {
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
            n1 += str[i];
        }
        else {
            n2 += str[i];
        }
    }
    
    if (broke == false) {
        operate(n1, operator, n2);
    }
}