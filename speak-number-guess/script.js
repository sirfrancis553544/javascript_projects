// control the go gigher or lower message 
const msgEl = document.getElementById('msg');

// function for random number 
const randomNum = getRandomNumber();

// prints out random num to consol 
// console.log('Number is:', randomNum);

// get speech recognition 
window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
// start recognition and game 
recognition.start();

// capture user speach 
function onSpeak(e) {
    // finding the transcript in results 
    const msg = e.results[0][0].transcript;
    // this writes the message thats spoken 
    writeMessage(msg);
    // this checks if whats spoken is a valid number
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
      <div>You said: </div>
      <span class="box">${msg}</span>
    `;
}

// Check msg against number
function checkNumber(msg) {
    const num = +msg;

    // Check if valid number
    if (Number.isNaN(num)) {
        // remove the + (append) and it would just display the message 
        // instead of message and what I say 
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // Check number
    if (num === randomNum) {
        document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEl.innerHTML += '<div>GO HIGHER</div>';
    }
}


// Generate random number
function getRandomNumber() {
    // have to add plus 1 because method gets 1-99 currently 
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});