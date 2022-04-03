var searchCitiesBtn = document.getElementById('search-cities')
function k2f(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
};



const apiKey = 'cb71c23a4cd068740952beb37aae8e8f'

const cityName = 'North Salt Lake'
const urlReadyCity = encodeURIComponent(cityName)

// take the value entered from the City Name box to use later on to fetch Lat/Long api weather data
var getInputValue = function () {
  var inputVal = document.getElementById('')
}

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
  let weather
  let icon



  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {



      temperature = k2f(data.current.temp)
      weatherConditions = data.current.weather[0].description
      humidity = data.current.humidity
      windSpeed = data.current.wind_speed
      uvIndex = data.current.uvi
      icon = data.current.weather[0].icon

      console.log("temperature:", temperature)
      console.log("weatherConditions:", weatherConditions)
      console.log("humidity:", humidity)
      console.log("windSpeed:", windSpeed)
      console.log("uvIndex:", uvIndex)
      console.log("icon", icon)
      // console.log("temperature imperial:", data.main.temp.Imperial)
      console.log("weather data:", data)
    })
}

getCityWeather();