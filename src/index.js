let mainStr = '';
let numbers = document.querySelectorAll(".number");
let operations = document.querySelectorAll(".operation");
let decimalBtn = document.getElementById("decimal");
let clearBtns = document.querySelectorAll(".clear-btn");
let display = document.getElementById("display");
display.innerHTML = '0';

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryWaitingOperation = "";


for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener("click", (e) => {
		  numberPress(e.target.textContent);
		  showDisplay(e.target.textContent)
    })
}


for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener("click", (e) => {
		  operation(e.target.textContent);
		  showDisplay(e.target.textContent)
		showDisplay(operation(e.target.textContent))

    })
}


for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener("click", (e) => {
        clear(e.srcElement.id)
    })
}

decimalBtn.addEventListener("click", decimal);

function numberPress(number) {

    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if (display.value === "0.00") {
            display.value = number;
        } else {
            display.value += number;
        }
    }

}


function operation(symbol) {

    if (memoryNewNumber && memoryWaitingOperation !== "=") {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryWaitingOperation === "+") {
            memoryCurrentNumber = parseFloat(memoryCurrentNumber) + parseFloat(display.value);

        } else if (memoryWaitingOperation === "-") {
            memoryCurrentNumber -= parseFloat(display.value);
        } else if (memoryWaitingOperation === "x") {
            memoryCurrentNumber *= parseFloat(display.value);
        } else if (memoryWaitingOperation === "/") {
            memoryCurrentNumber /= parseFloat(display.value);
        } else if (memoryWaitingOperation === "%") {
            memoryCurrentNumber = (parseFloat(memoryCurrentNumber) / 100) * parseFloat(display.value);
        } else {
            memoryCurrentNumber = display.value
        }

        display.value = memoryCurrentNumber;
        memoryWaitingOperation = symbol;
    }
}


function clear(id) {

    if (id === "ce") {
        display.value = "0";
        memoryNewNumber = true;
    } else if (id === "c") {
        display.value = 0;
        memoryNewNumber = true;
        memoryCurrentNumber = 0;
        memoryWaitingOperation = "";
    }
}


 function decimal() {
    let localDecimalMemory = display.value;

    if (memoryNewNumber) {
        localDecimalMemory = "0.";
        memoryNewNumber = false;
    } else {
        localDecimalMemory += ".";
    }
    display.value = localDecimalMemory
 }



function showDisplay (arg){
	if (arg === 'clear') {
		mainStr = '';
	} else {
		mainStr += arg ;
	}
	display.innerHTML = mainStr; 
}





