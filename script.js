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
    if (operator == "+") {
        console.log(add(number1, number2));
    }

    if (operator == "-") {
        console.log(subtract(number1, number2));
    }

    if (operator == "*") {
        console.log(multiply(number1, number2));
    }

    if (operator == "/") {
        console.log(divide(number1, number2));
    }
}