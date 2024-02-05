const counterDisplay = document.getElementById('counter');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let count = Math.floor(Math.random() * 1000); // Generate random number 0-999
counterDisplay.textContent = count; // Display the initial random number


increaseBtn.addEventListener('click', () => {
  count++;
  counterDisplay.textContent = count;
});

decreaseBtn.addEventListener('click', () => {
  count = Math.max(0, count - 1); // Prevent going below zero
  counterDisplay.textContent = count;
});


const readEnglishBtn = document.getElementById('read-english');
const readSpanishBtn = document.getElementById('read-spanish');

readEnglishBtn.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(count.toString());
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
});

readSpanishBtn.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(count.toString());
  utterance.lang = 'es-ES'; // Spanish (Spain)
  speechSynthesis.speak(utterance);
});
