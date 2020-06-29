const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// // store card data
// // get card data will reach into local
// // storage to get the information for the card
const cardsData = getCardsData();


// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card");

    if (index === 0) {
        card.classList.add("active");
    }

    card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;
    // event listener
    card.addEventListener("click", () => card.classList.toggle("show-answer"));

    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// show # of cards/ page count
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
    // local storage only stores SVGStringList, need to turn array into string
    // with JSON.parse
    const cards = JSON.parse(localStorage.getItem("cards"));
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));
    //   reload page method
    window.location.reload();
}

// call function
createCards();

// event listeners
// to move foward and back, hide the card to the left.
nextBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card left";
    // get the next card
    currentActiveCard = currentActiveCard + 1;
    //   prevents the next buttton on the card button from exceding its limits
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = "card active";

    updateCurrentText();
});

// Prev button
prevBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card right";

    currentActiveCard = currentActiveCard - 1;
    //   prevents the back button card button from exceding its limits
    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = "card active";

    updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        //   new card obj
        const newCard = {
            question,
            answer
        };

        createCard(newCard);
        // set the value to nothing
        questionEl.value = "";
        answerEl.value = "";

        addContainer.classList.remove("show");

        cardsData.push(newCard);
        // save to local storage
        setCardsData(cardsData);
    }
});

// Clear cards button
clearBtn.addEventListener("click", () => {
    localStorage.clear();
    cardsContainer.innerHTML = "";
    window.location.reload();
});