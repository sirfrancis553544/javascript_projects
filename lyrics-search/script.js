const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// search by song or artist
async function searchSongs(term) {
  // fetch api using async await
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  //  once we get the data need to display in the DOM with the show data fucntion
  showData(data);
}
// show song and artist in DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join("")}
    </ul> 
  `;
  // get pagination
  if (data.prev || data.next) {
    // if prev button exist dsiplay else nothing
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ""
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
      `;
  } else {
    more.innerHTML = "";
  }
}

// get prev and next song
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}
// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  // using regular expressions to find where and how to make line breaks in the lyrics
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHTML = "";
}

// event listiners
form.addEventListener("submit", (e) => {
  // so it doesent submit to a file
  e.preventDefault();
  //  get what is typed into input
  const searchTerm = search.value.trim();
  // validation to ensure user types somtething into input
  if (!searchTerm) {
    // if not searched input do alert
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// get lyrics on button click
result.addEventListener("click", (e) => {
  // trying to target the button get lyrics
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    // test if targeted button was correct with console.log(123);
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
