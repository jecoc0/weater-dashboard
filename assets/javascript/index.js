function loadPage() {
  // take the value entered from the City Name box to use later on to fetch Lat/Long api weather data
  const inputEl = document.getElementById("city-input");
  const searchEl = document.getElementById("search-cities");
  const clearEl = document.getElementById("clear-history");
  const nameEl = document.getElementById("city-name");
  const currentIconEl = document.getElementById("current-icon");
  const currentTempEl = document.getElementById("temperature");
  const currentHumidityEl = document.getElementById("humidity");
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  console.log(searchHistory);
};

const apiKey = 'cb71c23a4cd068740952beb37aae8e8f'

const cityName = 'Cody'
const urlReadyCity = encodeURIComponent(cityName)



var getCityWeather = function () {
  let lat
  let lon

  console.log('function was called')
  // fetch the lat and long coordinates using the Geo coding API
  var getLatLong = function () {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + urlReadyCity + "&limit=1&appid=" + apiKey)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // Store the lat long as variables
        lat = data[0].lat
        lon = data[0].lon
        // console log data response
        console.log("lat:", lat, "lon:", lon)
        getWeather(lat, lon);
      })
  }
  // use the lat long variables as part of api call to fetch weather data

  // console log data response
  getLatLong()
}

var getWeather = function (lat, lon) {
  let temperature
  let weatherConditions
  let humidity
  let windSpeed
  let uvIndex
  let icon
  let iconUrl

  // fetch weather information from latitude/longitude
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

      console.log("temperature:", temperature)
      console.log("weatherConditions:", weatherConditions)
      console.log("humidity:", humidity)
      console.log("windSpeed:", windSpeed)
      console.log("uvIndex:", uvIndex)
      console.log("icon", icon)
      // console.log("temperature imperial:", data.main.temp.Imperial)
      console.log("weather data:", data)
      assignUVColor(uvIndex)
    })
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
}

getCityWeather();