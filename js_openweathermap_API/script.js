$("#form-submit").submit((e) => {
  performSearch(e);
});

const key = ""; //Thankfully didn't forget to remove my key from here

function performSearch(e) {
  e.preventDefault();
  let request = $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather",
    type: "GET",
    data: {
      q: $("#city").val(),
      appid: key,
      units: "metric",
    },
  });
  request.done((res) => {
    formatSearch(res);
  });
}

function formatSearch(jsonObject) {
  $("#city-hum").text("Humidity: " + jsonObject.main.humidity + "%");
  $("#city-temp").text("Temperature: " + jsonObject.main.temp + "C°");
  $("#city-weather").text(jsonObject.weather.main);
}