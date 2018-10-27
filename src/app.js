let body = document.querySelector("#body");
let icon = document.querySelector("#icon");
let city = document.querySelector("#city");
let temp = document.querySelector("#temp");
let scale = document.querySelector("#scale");
let weather = document.querySelector("#weather");

fetch("https://ipapi.co/json/")
  .then(function(response) {
    return response.json();
  })
  .then(function(userData) {
    getWeather(userData.latitude, userData.longitude);
    city.innerHTML = userData.city;
  });

function getWeather(latitude, longitude) {
  fetch(
    `https://api.darksky.net/forecast/26dff73d9b715c2a6347c19a719bec83/${latitude},${longitude}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(weatherData) {
      setTemperature(
        weatherData.timezone,
        weatherData.currently.apparentTemperature
      );
      displayIcon(weatherData.currently.icon);
    });
}

const setTemperature = (timezone, currentTemperature) => {
  let flag = "F";
  if (timezone.indexOf("America") >= 0) {
    temp.innerHTML = Math.round(currentTemperature);
    scale.innerHTML = "&#x2109";
  } else {
    flag = "C";
    temp.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
    scale.innerHTML = "&#x2103";
  }
  scale.onclick = () => {
    if (flag == "C") {
      flag = "F";
      temp.innerHTML = Math.round(currentTemperature);
      scale.innerHTML = "&#x2109";
    } else {
      flag = "C";
      temp.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
      scale.innerHTML = "&#x2103";
    }
  };
};
const changeIcon = (weatherType, iconType, colorType) => {
  weather.innerHTML = weatherType;
  icon.style.backgroundImage = iconType;
  body.style.backgroundColor = colorType;
};

const displayIcon = icon => {
  switch (icon) {
    case "clear-day":
      changeIcon("<p>Clear</p>", "url('../assets/sun.svg')", "#2980b9");
      break;
    case "clear-night":
      changeIcon("<p>Clear</p>", "url('../assets/moon.svg')", "#2C3E50");
      break;
    case "rain":
      changeIcon("<p>Rain</p>", "url('../assets/raincloud.svg')", "#363636");
      break;
    case "snow":
      changeIcon("<p>Snow</p>", "url('../assets/snowcloud.svg')", "#363636");
      break;
    case "sleet":
      changeIcon("<p>Sleet</p>", "url('../assets/sleet.svg')", "#363636");
      break;
    case "wind":
      changeIcon("<p>Wind</p>", "url('../assets/wind.svg')", "#363636");
      break;
    case "fog":
      changeIcon("<p>Fog</p>", "url('../assets/fog.svg')", "#363636");
      break;
    case "cloudy":
      changeIcon("<p>Cloudy</p>", "url('../assets/cloudy.svg')", "#133D59");
      break;
    case "partly-cloudy-day":
      changeIcon(
        "<p>Cloudy Day</p>",
        "url('../assets/cloudysun.svg')",
        "#216999"
      );
      break;
    case "partly-cloudy-night":
      changeIcon(
        "<p>Cloudy Night</p>",
        "url('../assets/cloudynight.svg')",
        "#202D3A"
      );
      break;
  }
};
