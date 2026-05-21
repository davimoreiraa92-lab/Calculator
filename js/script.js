
const buttons = document.getElementById("buttons")
const display = document.getElementById("display")

let current = ''
let previous = ''
let operator = ''

buttons.addEventListener('click', (e) => {

    const value = e.target.dataset.value
    const action = e.target.dataset.action

    if (!value && !action) {
        return
    }

    //Clear
    else if (action === 'clear') {
        current = ''
        previous = ''
        operator = ''
        updateDisplay()
        
    }

    // Operator
    else  if (['+', '-', 'x', '÷'].includes(value)) {

        if (value === '-' && current === '' && previous === '') {
            current = '-'
            updateDisplay()
            return
        }
        
        if (current === '') {
            return
        }
        
        if (operator !== '') {
            return
        }

        operator = value
        previous = current
        current = ''

        updateDisplay()
    }

    //Delete
    else if (action === 'delete') {
        current = current.slice(0, -1)
        updateDisplay()
    }

    //Equals
    else if (action == 'equals'){
        calculate()
        return
    }

    //Number
    else { 

        if (value === '.' && current.includes('.')) {
            return
        }
    
        if (value == '.' && current == ''){
            current = '0.'
            updateDisplay()
            return
        }

        current += value
        updateDisplay()
    }
})

function updateDisplay(result){

    if (operator !== '') {
        display.innerText = previous + ' ' + operator + ' ' + current
    }
    else {
        display.innerText = current || '0'
    }

}



function calculate(){

    const a = Number(previous)
    const b = Number(current)

    let result

    if (operator == '÷' && b === 0) {
        display.innerText = 'Error'
        current = ''
        previous = ''
        operator = ''
        return
    }

    switch (operator){
        case '+': result = a + b; break
        case '-': result = a - b; break
        case 'x': result = a * b; break
        case '÷': result = a / b; break
    }

    current = result.toString()
    previous = ''
    operator = ''
    updateDisplay(result)
}