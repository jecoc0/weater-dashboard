const inputEl = document.getElementById("city-input");
const searchEl = document.getElementById("search-cities");
const nameEl = document.getElementById("city-name");
const currentIconEl = document.getElementById("current-icon");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const currentUVEl = document.getElementById("UV-index");
const historyEl = document.getElementById("history");
const cityEl = document.getElementById("named-city")
const currentWeatherEl = document.getElementById("current-info-column")
const iconColumn = document.getElementById("icon-column")
const infoColumn = document.getElementById("current-info-column")
const iconEl = document.getElementById("icon")
const forecastEl = document.getElementById("five-day-container")


var searchedCities = [];

let cityName
let todaysDate
let temperature
let weatherConditions
let humidity
let windSpeed
let uvIndex
let icon
let iconUrl

const apiKey = 'cb71c23a4cd068740952beb37aae8e8f'

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

var findWeatherSubmit = function (event) {
  event.preventDefault();
  cityName = inputEl.value.trim();

  if (cityName) {
    getCityWeather(cityName);
    getForecast(cityName);
    searchedCities.unshift(cityName);
    infoColumn.value = "";
    iconEl.removeAttribute("src")
  } else {
    alert("Please enter a city to view weather information!")
  }
  saveSearch();
  searchHistory(cityName);
}

var saveSearch = function () {
  localStorage.setItem("searched cities", JSON.stringify(searchedCities));
};


var getCityWeather = function (cityName) {
  const urlReadyCity = encodeURIComponent(cityName)
  let lat
  let lon

  console.log('function was called')
  // fetch the lat and long coordinates using the Geo coding API
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + urlReadyCity + "&limit=1&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Store the lat long as variables
      lat = data[0].lat
      lon = data[0].lon

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
          temperature = data.current.temp
          weatherConditions = data.current.weather[0].description
          humidity = data.current.humidity
          windSpeed = data.current.wind_speed
          uvIndex = data.current.uvi
          icon = data.current.weather[0].icon
          iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

          // console.log("temperature:", temperature)
          // console.log("weatherConditions:", weatherConditions)
          // console.log("humidity:", humidity)
          // console.log("windSpeed:", windSpeed)
          // console.log("uvIndex:", uvIndex)
          // console.log("icon", icon)
          // console.log("iconUrl", iconUrl)
          // console.log("weather data:", data)

          displayWeather(cityName, icon, temperature, uvIndex);
        })
    })
}


var displayWeather = function (cityName, icon, temperature, uvIndex) {

  var uviColor = assignUVColor(uvIndex)
  // clear previous results
  currentWeatherEl.textContent = "";
  cityEl.textContent = cityName;

  // add date span next to City in Parentheses
  var currentDate = document.createElement("span")
  currentDate.textContent = " (" + moment().format("MMM D, YYYY") + ")";
  cityEl.appendChild(currentDate);

  // create temperature information
  iconEl.removeAttribute("src")
  iconEl.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

  // tempEl.innerText = `${temperature}`
  infoColumn.innerHTML = `Temperature: ${temperature}&deg; F
                          <br />
                          Weather Conditions: ${weatherConditions}
                          <br />
                          Humidity: ${humidity}%
                          <br />
                          Wind Speed: ${windSpeed} MPH
                          <br />
                          <p class="${uviColor}"> UV Index: ${uvIndex} - ${uviColor}</p>`
}


var assignUVColor = function (uvi) {
  let uviColor
  // UV Index favorability, coded to color
  // 0-2: Low, Green
  if (uvi <= 2) {
    uviColor = "low" // #299500
    // 3-5: Moderate, Yellow
  } else if (uvi >= 3 && uvi < 6) {
    uviColor = "moderate" // #F7E400
    // 6-7: High, Orange
  } else if (uvi >= 6 && uvi < 8) {
    uviColor = "high" // #F85901
    // 8-10: Very High, Red
  } else if (uvi >= 8 && uvi < 11) {
    uviColor = "veryHigh" //#D80010
    // 11+: Extreme, Purple
  } else if (uvi >= 11) {
    uviColor = "extreme" // #6B49C8
  }
  console.log(uvi, uviColor)
  return uviColor
}

var getForecast = function (cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`)
    .then(function (response) {
      response.json().then(function (data) {
        display5DayForecast(data)
      });
    });
};

var display5DayForecast = function (data) {
  forecastEl.innerHTML = ''
  var forecast = data.list;
  console.log(data)
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var forecastTileEl = document.createElement("div")
    forecastTileEl.classList = "bg-info p-2"

    //date header
    var forecastDateEl = document.createElement("h6")
    forecastDateEl.innerHTML = `${moment.unix(dailyForecast.dt).format("MMM D")}`
    // moment.unix(dailyForecast.dt).format("MMM D");
    forecastDateEl.classList = "text-center"
    forecastTileEl.appendChild(forecastDateEl);


    //forecast icon
    var forecastIcon = document.createElement("img")
    forecastIcon.classList = "text-center";
    //update ${icon} to ${dailyForecast.data[i].icon}
    forecastIcon.setAttribute("src", `http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`)

    forecastTileEl.appendChild(forecastIcon);

    //temp 
    var dailyTempEl = document.createElement("p")
    dailyTempEl.classList = "text-center";
    dailyTempEl.textContent = dailyForecast.main.temp + " ° F";
    forecastTileEl.appendChild(dailyTempEl)

    //humidity
    var dailyHumidityEl = document.createElement("p")
    dailyHumidityEl.classList = "text-center";
    dailyHumidityEl.textContent = dailyForecast.main.humidity + " %";
    forecastTileEl.appendChild(dailyHumidityEl);

    // Append days to container
    forecastEl.appendChild(forecastTileEl)
  }
}


// on click handler for find weather search function
searchEl.addEventListener("click", findWeatherSubmit)