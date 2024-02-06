const counterDisplay = document.getElementById('counter');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let count = 0

function startGame() {
    count = Math.floor(Math.random() * 1000) + 10; // Generate random number starting at 10
    counterDisplay.textContent = count; // Display the initial random number
    updateFontSize()
}

function handleClickOrTap(event) {
    if (event.type === 'click') { // Handle regular clicks
        const windowWidth = window.innerWidth;
        const clickX = event.clientX;

        if (clickX > windowWidth / 2) {
            count++;
        } else {
            count = Math.max(10, count - 1);
        }

        counterDisplay.textContent = count;

    } else if (event.type === 'touchend') { // Handle touch events
        if (event.touches && event.touches[0]) { // Add this check

            const windowWidth = window.innerWidth;
            const touchX = event.touches[0].clientX;

            if (touchX > windowWidth / 2) {
                count++;
            } else {
                count = Math.max(10, count - 1);
            }

            counterDisplay.textContent = count;
        }
    }
    updateFontSize()
}

let resizeTimeout;
function handleOrientationChange() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateFontSize, 10); // Adjust timeout as needed
}


function updateFontSize() {
    const counter = document.getElementById('counter');
    const numDigits = count.toString().length;
    const desiredWidthPercentage = 95; // Percentage of screen width the number should occupy

    // Calculate font size in pixels
    const fontSizePercentage = desiredWidthPercentage / numDigits; // Adjust font size percentage  
    const calculatedFontSize = Math.ceil((fontSizePercentage / 100) * window.innerWidth);

    counter.style.fontSize = calculatedFontSize + 'px';
}


document.addEventListener('click', handleClickOrTap);
document.addEventListener('touchend', handleClickOrTap);
window.addEventListener('orientationchange', handleOrientationChange);

startGame()

const readEnglishBtn = document.getElementById('read-english');
const readSpanishBtn = document.getElementById('read-spanish');


// Read aloud on number click
counterDisplay.addEventListener('click', () => {
    event.stopPropagation(); // Prevent clicks on flags from triggering the document listener

    const selectedLanguage = languageSelect.value;
    const utterance = new SpeechSynthesisUtterance(count.toString());
    utterance.lang = selectedLanguage;
    speechSynthesis.speak(utterance);
});

const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', () => {
    event.stopPropagation(); // Prevent clicks on flags from triggering the document listener
    const selectedLanguage = languageSelect.value;
    const utterance = new SpeechSynthesisUtterance(count.toString());
    utterance.lang = selectedLanguage;
    speechSynthesis.speak(utterance);
});