const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// the plus sign to used to turn the value into a type number
let ticketPrice = +movieSelect.value;

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update total and count 
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // save to local storage on BhxBrowser
    // jason.stringify is turning the array into a string 
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
// get data from local storage and populate UI
function populateUI() {
    // JSON.parse used to turn back into an Array
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}




// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    // this allows to trget the  index of the drop down and the value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// seat click event 
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        // allows for the class to be added to selected and turns blue
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});
// Initial count and total set
updateSelectedCount();