window.onload = function (){
  //API request to get the coordinates
  var geo = new XMLHttpRequest();
  geo.open("GET", "https://ipapi.co/json/", true);
  geo.send();
  geo.onload = function (){
    if (geo.status >= 200 && geo.status < 400){
      //Success getting Longitude and Latitude
      var loc = JSON.parse(geo.responseText);
      var latitude = loc.latitude;
      var longitude = loc.longitude;
      console.warn(latitude, longitude);

      //API to get the weather
      var http = new XMLHttpRequest();
      http.open("GET", "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1f41f1376bbdca6c9074fe7bd855499a/"
      + encodeURI(latitude + "," + longitude) , true);
      http.send();
      http.onload = function () {
        if (http.status >= 200 && http.status < 400){
          var data = JSON.parse(http.response);
          console.warn(data);
        }

        //Set HTML elements
        var body = document.getElementById("body");
        var icon = document.getElementById("icon");
        var city = document.getElementById("city");
        var temp = document.getElementById("temp");
        var scale = document.getElementById("scale");
        var weather = document.getElementById("weather");


        city.innerHTML = loc.city;


        //If timezone is America set scale to Fahrenheit else set it to Celsius
        if(data.timezone.indexOf("America") >= 0){
          var flag = "F";
          temp.innerHTML = Math.round(data.currently.apparentTemperature);
          scale.innerHTML = "&#x2109";
        }else{
          flag = "C";
          temp.innerHTML = Math.round(((data.currently.apparentTemperature) - 32) * 5/9); //Display temperature in celsius
          scale.innerHTML = "&#x2103";
        }

        //Change between Fahrenheit and Celsius on click
        scale.onclick = function() {
          if (flag == "C") {
            flag = "F";
            temp.innerHTML = Math.round(data.currently.apparentTemperature);
            scale.innerHTML = "&#x2109";

          }else{
            flag = "C";
            temp.innerHTML = Math.round(((data.currently.apparentTemperature) - 32) * 5/9);
            scale.innerHTML = "&#x2103";
          }
        };

        // Switch case for weather icon and text
        switch (data.currently.icon) {
        case "clear-day":
          weather.innerHTML = "<p>Clear</p>";
          icon.style.backgroundImage = "url('./assets/sun.svg')";
          body.style.backgroundColor = "#2980b9";
          break;
        case "clear-night":
          weather.innerHTML = "<p>Clear</p>";
          icon.style.backgroundImage = "url('./assets/moon.svg')";
          body.style.backgroundColor = "#2C3E50";
          break;
        case "rain":
          weather.innerHTML = "<p>Rain</p>";
          icon.style.backgroundImage = "url('./assets/raincloud.svg')";
          body.style.backgroundColor = "#363636";
          break;
        case "snow":
          weather.innerHTML = "<p>Snow</p>";
          icon.style.backgroundImage = "url('./assets/snowcloud.svg')";
          body.style.backgroundColor = "#363636";
          break;
        case "sleet":
          weather.innerHTML = "<p>Sleet</p>";
          icon.style.backgroundImage = "url('./assets/sleet.svg')";
          body.style.backgroundColor = "#363636";
          break;
        case "wind":
          weather.innerHTML = "<p>Wind</p>";
          icon.style.backgroundImage = "url('./assets/wind.svg')";
          body.style.backgroundColor = "#363636";
          break;
        case "fog":
          weather.innerHTML = "<p>Fog</p>";
          icon.style.backgroundImage = "url('./assets/fog.svg')";
          body.style.backgroundColor = "#363636";
          break;
        case "cloudy":
          weather.innerHTML = "<p>Cloudy</p>";
          icon.style.backgroundImage = "url('./assets/cloudy.svg')";
          body.style.backgroundColor = "#133D59";
          break;
        case "partly-cloudy-day":
          weather.innerHTML = "<p>Cloudy Day</p>";
          icon.style.backgroundImage = "url('./assets/cloudysun.svg')";
          body.style.backgroundColor = "#216999";
          break;
        case "partly-cloudy-night":
          weather.innerHTML = "<p>Cloudy Night</p>";
          icon.style.backgroundImage = "url('./assets/cloudynight.svg')";
          body.style.backgroundColor = "#202D3A";
          break;
        }

      };
    }else{
      console.warn("Error");
    }
  };

};
