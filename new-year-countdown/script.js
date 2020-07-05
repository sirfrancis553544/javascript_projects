const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const loading = document.getElementById('loading');
const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// set background year 
year.innerText = currentYear + 1;

function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;
    // Math.floor is to round thw answer down 
    const d = Math.floor(diff / 1000 / 60 / 60 / 24); // # days till next year  
    const h = Math.floor(diff / 1000 / 60 / 60) % 24; // find the remainder with % 
    const m = Math.floor(diff / 1000 / 60) % 60; // remainder of minutes 
    const s = Math.floor(diff / 1000) % 60;

    // set it on the DOM 
    days.innerHTML = d;
    // if= ?  else= : 
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}
// show spinner before countdown
setTimeout(() => {
    loading.remove();
    // insert this into tthe css to display the countdown 
    countdown.style.display = 'flex';
}, 1000); // load for a second 

setInterval(updateCountdown, 1000);

// updateCountdown();