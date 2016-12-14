'use strict';

searchButton.addEventListener('click', searchWeather);

//function executes when the user clicks the get weather button
function searchWeather(){
  var cityName = userCity.value;

  if (cityName.length == 0) {
    return alert('Please enter a City name');
  }
  
  //http request
  var http = new XMLHttpRequest();
  var apiKey = '848716227d070904a2aba846e50d758d';
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid='+ apiKey;
  var method = 'GET';

  http.open(method, url);
  http.onreadystatechange = function (){

    if (http.readyState == XMLHttpRequest.DONE && http.status === 200){

      var data = JSON.parse(http.responseText);
      var weatherData = new Weather();
      weatherData.cityName = cityName;
      weatherData.description = data.weather[0].description;
      weatherData.temperature = data.main.temp;

    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert('Something went wrong, try again');
    }
    outputWeather(weatherData);
  };
  http.send();

  function outputWeather(data){

    weatherCity.textContent = cityName.toUpperCase();
    weatherDescription.textContent = 'Conditions: ' + data.description;
    weatherTemperature.textContent = 'The current temperature is: ' + data.temperature + ' C';

  };

}
