function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = date.getDay();

  return days[day];
}

function displayForecast(responce) {
  let forecast = responce.data.daily;
  console.log(forecast);
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-date">
                  ${formatDay(forecastDay.dt)}
                  </div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="weather-icon" width="36"
                />
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max">
                    ${Math.round(forecastDay.temp.max)}
                    </span>
                     <span class="forecast-temperature-min">
                    ${Math.round(forecastDay.temp.min)}
                    </span>
                  </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#weather-forecast").innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "132eb1b1696e8f8385411084219bed3c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "132eb1b1696e8f8385411084219bed3c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  search(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(
    FahrenheitTemperature
  );
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New YorK");
