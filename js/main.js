// moduled querySelector
function qs(selectEl){return document.querySelector(selectEl)}

// select RGB inputs
let red = qs('#red'), 
green = qs('#green'), 
blue = qs('#blue') 

// selet num inputs
let redNumVal = qs('#redNum'), 
greenNumVal = qs('#greenNum'), 
blueNumVal = qs('#blueNum')

// select Color Display
let colorDisplay = qs('#color-display')

// select labels
let redLbl = qs('label[for=red]'), 
greenLbl = qs('label[for=green]'), 
blueLbl = qs('label[for=blue]')

// display colors
function displayColors(){
    colorDisplay.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`    
}

// initial color val when DOM is loaded 
function colorNumbrVals(){
    redNumVal.value = red.value
    greenNumVal.value = green.value
    blueNumVal.value = blue.value
}

// initial colors when DOM is loaded
function initSliderColors(){
    // label bg colors
    redLbl.style.background = `rgb(${red.value},0,0)`
    greenLbl.style.background = `rgb(0,${green.value},0)`
    blueLbl.style.background = `rgb(0,0,${blue.value})`

    // slider bg colors
    sliderFill(red)
    sliderFill(green)
    sliderFill(blue)
}

// Slider Fill offset
function sliderFill(clr){
    let val = (clr.value - clr.min) / (clr.max - clr.min)
    let percent = val * 100

    // clr input
    if(clr === red){
        clr.style.background = `linear-gradient(to right, rgb(${clr.value},0,0) ${percent}%, #cccccc 0%)`    
    } else if (clr === green) {
        clr.style.background = `linear-gradient(to right, rgb(0,${clr.value},0) ${percent}%, #cccccc 0%)`    
    } else if (clr === blue) {
        clr.style.background = `linear-gradient(to right, rgb(0,0,${clr.value}) ${percent}%, #cccccc 0%)`    
    }
}

// change range values by number input
function changeRangeNumVal(){
    btnValues(redNumVal, red)
    btnValues(greenNumVal, green)
    btnValues(blueNumVal, blue)
}

function btnValues(btn, inputs){
    // Validate number range
    btn.addEventListener('change', () => {
        // make sure numbers are entered between 0 to 255
        if (btn.value > 255) {
            alert('cannot enter numbers greater than 255')
            btn.value = inputs.value
        } else if (btn.value < 0) {
            alert('cannot enter numbers less than 0')
            btn.value = inputs.value
        } else if(btn.value == '') {
            alert('cannot leave field empty')
            btn.value = inputs.value
            initSliderColors()
            displayColors()
        } else {
            inputs.value = btn.value           
            initSliderColors()
            displayColors()
        }
    })
}

// Color Sliders controls
function colorSliders(){
    btnInputEvents(red)
    btnInputEvents(green)
    btnInputEvents(blue)
}

function btnInputEvents(btn){
    btn.addEventListener('input', () => {
        displayColors()
        colorNumbrVals()
        initSliderColors()
        changeRangeNumVal()
    })
}

function init(){
    // init Colors controls
    colorSliders()
    // init display Colors
    displayColors()
    // init Color Vals
    colorNumbrVals()
    // init ColorSliderVals
    initSliderColors()
    // init Change Range Val
    changeRangeNumVal()
}

window.addEventListener('DOMContentLoaded', init)
