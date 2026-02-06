var apiKey = "b131446c40e1218d04742ec1a3ee29f7";

document.addEventListener("DOMContentLoaded", function () {

    var btn = document.getElementById("btn");
    var output = document.getElementById("output");
    var dateTimeDiv = document.getElementById("datetime");
    var cityInput = document.getElementById("city");

    btn.addEventListener("click", searchWeather);

    cityInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            searchWeather();
        }
    });

    function searchWeather() {
        var city = cityInput.value.trim();

        if (city === "") {
            output.innerHTML =
                "<div style='padding:10px;background:#fff3cd'>Please enter a city name.</div>";
            return;
        }

        showDateTime();
        output.innerHTML =
            "<div style='padding:10px'>Loading weather data...</div>";

        fetchWeather(city);
        cityInput.value = "";
    }

    function showDateTime() {
        var now = new Date();
        dateTimeDiv.innerText =
            now.toDateString() + " | " + now.toLocaleTimeString();
    }

    function fetchWeather(city) {
        var url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            apiKey +
            "&units=metric";

        fetch(url)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {

                if (data.cod !== 200) {
                    output.innerHTML =
                        "<div style='padding:10px;background:#fee2e2'>" +
                        "City not found. Please check spelling." +
                        "</div>";
                    return;
                }

                showWeather(data);
            })
            .catch(function () {
                output.innerHTML =
                    "<div style='padding:10px;background:#e0e7ff'>" +
                    "Unable to fetch weather. Try again later." +
                    "</div>";
            });
    }

    function showWeather(data) {
        var temp = data.main.temp;
        var condition = data.weather[0].main;
        var country = data.sys.country;
        var wind = data.wind.speed;

        var tempColor = "#111827";
        var statusText = "Normal Weather";
        var boxBg = "#e5e7eb";

        if (temp >= 30) {
            tempColor = "#b91c1c";        
            statusText = "Hot Weather";
            boxBg = "#fde68a";            
        } else if (temp <= 15) {
            tempColor = "#1d4ed8";        
            statusText = "Cold Weather";
            boxBg = "#bfdbfe";            
        }

        if (condition === "Rain") {
            boxBg = "#c7d2fe";            
        }

        document.body.style.background = boxBg;

        output.innerHTML =
            "<div style='background:white; padding:12px; border-radius:8px'>" +
            "City: " + data.name + ", " + country + "<br>" +
            "<span style='color:" + tempColor + "; font-weight:bold'>" +
            "Temperature: " + temp + " °C</span><br>" +
            "Humidity: " + data.main.humidity + "%<br>" +
            "Wind Speed: " + wind + " m/s<br>" +
            "<strong>" + statusText + "</strong>" +
            "</div>";
    }

});
