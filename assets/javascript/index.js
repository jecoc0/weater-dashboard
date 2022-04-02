var searchCitiesBtn = document.getElementById('search-cities')



const apiKey = 'cb71c23a4cd068740952beb37aae8e8f'
const latitude = 40.8486
const longitude = 111.9069
const cityName = 'North Salt Lake, UT'

var getInputValue = function () {
  var inputVal = document.getElementById('')
}

var getCityWeather = function () {
  console.log('function was called')
  // fetch the lat and long coordinates using the Geo coding API
  var getLatLong = function () {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey)
  }
  // console log data response

  // Store the lat long as variables

  // use the lat long variables as part of api call to fetch weather data

  // console log data response
  getLatLong();
  console.log(getLatLong())
}



getCityWeather();