const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'cooperative', ' goal', 'equinox', 'relative', 'peanut', 'iron', 'ribbon', 'drawer', 'escape', 'fashion', 'by', 'census', 'judicial', 'match', 'parking', 'sulphur', 'stretch', 'uniform', 'navy', 'skate', 'belly', 'missile', 'ticket', 'craftsman', 'call', 'tumour', 'origin', 'linen', 'excavate', 'absent', 'conservative', 'opinion', 'polish', 'mobile', 'weave', 'fiction', 'fuss', 'rebel', 'harbor', 'keep', 'film', 'civilian', 'recycle', 'bucket', 'extend', 'consultation', 'acid', 'suntan', 'appendix', 'therapist'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hodden word
function displayWord() {
    wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          letter => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
            </span>
          `
        )
        .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
    }
}
//update the wrong letters
function updateWrongLettersEl() {
    // display wrong letter 
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    // display parts 
    figureParts.forEach((part, index) => {
        const error = wrongLetters.length;
        if (index < error) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    // check if lost 
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
    }
}

// show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// keyword letter press
window.addEventListener('keydown', e => {
    // consol.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        // console.log(123);
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }

        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// restart game and play again 
playAgainBtn.addEventListener('click', () => {
    // empty array 
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';

})

displayWord();