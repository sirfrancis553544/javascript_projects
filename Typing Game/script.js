const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
    "depend", "worth", "perfectly", "search", "nearer", "surprise", "coffee", "duck", "negative", "possible", "somewhere", "earlier", "where", "thread", "education", "each", "like", "strong", "pond", "wire", "jungle", "per", "as", "ahead", "higher", "fill", "morning", "gravity", "again", "break", "paper", "hit", "somehow", "addition", "none", "large", "neighborhood", "waste", "two", "entire", "direct", "quietly"
];

// initalize word
let randomWord;

// initalize score 
let score = 0;

// initalize time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty =
    localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') :
    'medium';
// Set difficulty select value
difficultySelect.value =
    localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') :
    'medium';


// Focus on text in the input box on start 
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// generate random word from array 
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
// update score 
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update time 
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}
// add word to DOM 
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
// game over, show end score 
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// event listener (typing)
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        // clear 
        e.target.value = '';
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }


        updateTime();
    }
});

// settings btn click 
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'));