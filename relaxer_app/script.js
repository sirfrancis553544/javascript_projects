const container = document.getElementById('container');
const text = document.getElementById('text');

// time in js need to add up to the same time in the css 
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
    text.innerHTML = 'Breathe In!';
    container.className = 'container grow';
    setTimeout(() => {
        text.innerText = 'Hold';
        setTimeout(() => {
            text.innerText = 'Breathe Out!';
            container.className = 'container shrink';
        }, holdTime);
    }, breatheTime);
}

// to make the names change in a loop 
setInterval(breathAnimation, totalTime);