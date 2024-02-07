const counterDisplay = document.getElementById('counter');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let count = 0

function startGame() {
    count = Math.floor(Math.random() * 1000) + 10; // Generate random number starting at 10
    counterDisplay.textContent = count; // Display the initial random number
    updateFontSize()
}

function handleClickOrTap(increment) {

    count += increment;
    counterDisplay.textContent = count.toLocaleString('de-DE', {maximumFractionDigits: 0});
    updateFontSize();
    changeCounterColor();

}

let resizeTimeout;
function handleOrientationChange() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateFontSize, 10); // Adjust timeout as needed
}


function updateFontSize() {
    const counter = document.getElementById('counter');
    const numDigits = count.toString().length;
    const desiredWidthPercentage = 100; // Percentage of screen width the number should occupy

    // Calculate font size in pixels
    const fontSizePercentage = desiredWidthPercentage; // Adjust font size percentage  
    const calculatedFontSize = Math.ceil((fontSizePercentage / 100) * window.innerWidth / numDigits);

    counter.style.fontSize = calculatedFontSize + 'px';
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (str.charCodeAt(i) * 31) ^ hash;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash); // Keep result positive 
}

function colorFromHash(hash) {
    const angle = hash % 360;
    return `hsl(${angle}, 80%, 60%)`; // Use HSL color for vibrant variation
}


function changeCounterColor() {
    const color = colorFromHash(hashCode(count.toString()));
    counterDisplay.style.color = color;
}

window.addEventListener('orientationchange', handleOrientationChange);

startGame()

// Read aloud on number click
counterDisplay.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent clicks on flags from triggering the document listener
    const selectedLanguage = languageSelect.value;
    const utterance = new SpeechSynthesisUtterance(count.toString());
    utterance.lang = selectedLanguage;
    speechSynthesis.speak(utterance);
});

const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', (event) => {
    event.stopPropagation(); // Prevent clicks on flags from triggering the document listener
    const selectedLanguage = languageSelect.value;
    const utterance = new SpeechSynthesisUtterance(count.toString());
    utterance.lang = selectedLanguage;
    speechSynthesis.speak(utterance);
});

const controlButtons = document.querySelectorAll('.control-button');

controlButtons.forEach(button => {
    button.addEventListener('click', (event) => { 
        event.preventDefault(); // Prevent potential subsequent click
        handleClickOrTap(parseInt(button.dataset.value)) 
    });
    button.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent potential subsequent click
        handleClickOrTap(parseInt(button.dataset.value))
    });
});