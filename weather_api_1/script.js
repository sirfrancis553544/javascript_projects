var place = "london";
var apikey = "3f9d528c825a99fbf8fadae94daef611";
var units = "&units=imperial&appid=";
var apii = "https://api.openweathermap.org/data/2.5/weather?q=";

$.getJSON(
  apii + place + units + apikey,
  function (data) {

    var temp = Math.floor(data.main.temp);
    var fl = data.main.feels_like;
    var country = data.sys.country;
    var city = data.name;
    var weather = data.weather[0].description;
    $(".fl").append(fl);
    $(".temp").append(temp);
    $(".city").append(city);
    $(".country").append(country);
    $(".weather").append(weather);
    console.log(fl);
  }
);


$(document).ready(function () {
  // Get value on button click and show alert
  $("#submit").click(function () {
    var str = $("#trigger").val();
    alert(str);
  });
});