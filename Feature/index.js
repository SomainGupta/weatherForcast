let appId = "71f6779186cc32448b4c412eea65b982";
let units = "metric";
let searchMethod; // q means searching as a string.

function getSearchMethod(searchTerm) {
  var ress = Number.parseInt(searchTerm);
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}
// API url
function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      console.log(res);
      init(res);
    });
}

// Changing Background Images According to the weather.

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
    case "Clear sky":
      document.body.style.backgroundImage = "url('./Media/clear.jpg')";
      break;

    case "Scattered clouds":
    case "Overcast clouds":
    case "Clouds":
      document.body.style.backgroundImage = "url('./Media/cloudy.jpg')";
      break;

    case "Rain":
    case "Drizzle":
    case "Light rain":
      document.body.style.backgroundImage = "url('./Media/rain.jpg')";
      break;

    case "Fog":
    case "Dust":
    case "Mist":
    case "Haze":
    case "Smoke":
      document.body.style.backgroundImage = "url('./Media/Haze.jpg')";
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = "url('./Media/Thunderstorm.jpg')";
      break;

    case "Snow":
      document.body.style.backgroundImage = "url('./Media/snow.jpg')";
      break;

    default:
      break;
  }

  //getting weather description on searching for city.

  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");

  let weatherIcon = document.getElementById("documentIconImg");
  weatherIcon.src =
    "http://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176;";
  windSpeedElement.innerHTML =
    "Wind Speed: " + Math.floor(resultFromServer.wind.speed) + " meter/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity levels: " + resultFromServer.main.humidity + "%";

  //setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});

// Press enter for search

var input = document.getElementById("searchInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

// geolocation and current location google map

function getlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLoc, errHand);
  }
}
function showLoc(pos) {
  latt = pos.coords.latitude;
  long = pos.coords.longitude;
  var lattlong = new google.maps.LatLng(latt, long);
  var OPTions = {
    center: lattlong,
    zoom: 10,
    mapTypeControl: true,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL,
    },
  };
  var mapg = new google.maps.Map(document.getElementById("demo2"), OPTions);
  var markerg = new google.maps.Marker({
    position: lattlong,
    map: mapg,
    title: "You are here!",
  });
}

// error handling
function errHand(err) {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      result.innerHTML =
        "The application doesn't have the permission" +
        "to make use of location services";
      break;
    case err.POSITION_UNAVAILABLE:
      result.innerHTML = "The location of the device is uncertain";
      break;
    case err.TIMEOUT:
      result.innerHTML = "The request to get user location timed out";
      break;
    case err.UNKNOWN_ERROR:
      result.innerHTML =
        "Time to fetch location information exceeded" +
        "the maximum timeout interval";
      break;
  }
}

getlocation();
