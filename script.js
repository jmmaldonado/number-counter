const counterDisplay = document.getElementById('counter');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let count = Math.floor(Math.random() * 1000); // Generate random number 0-999
counterDisplay.textContent = count; // Display the initial random number


document.addEventListener('click', (event) => {
    const windowWidth = window.innerWidth;
    const clickX = event.clientX;

    if (clickX > windowWidth / 2) { // Click on the right side
        count++;
    } else { // Click on the left side
        count = Math.max(0, count - 1);
    }

    counterDisplay.textContent = count;
});

const readEnglishBtn = document.getElementById('read-english');
const readSpanishBtn = document.getElementById('read-spanish');

readEnglishBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent clicks on flags from triggering the document listener
    const utterance = new SpeechSynthesisUtterance(count.toString());
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
});

readSpanishBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent clicks on flags from triggering the document listener
    const utterance = new SpeechSynthesisUtterance(count.toString());
    utterance.lang = 'es-ES'; // Spanish (Spain)
    speechSynthesis.speak(utterance);
});
