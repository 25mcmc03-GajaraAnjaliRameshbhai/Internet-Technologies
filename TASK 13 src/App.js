import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "b131446c40e1218d04742ec1a3ee29f7";

  const fetchWeather = async (cityName) => {

    try {

      setError("");

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const forecastData = await forecastResponse.json();

      const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0);
      setForecast(dailyForecast);

    } catch (err) {

      setError(err.message);
      setWeather(null);
      setForecast([]);

    }
  };

  useEffect(() => {
    fetchWeather("Hyderabad");
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
      setCity("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const getEmoji = (condition) => {

    switch (condition) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧";
      case "Thunderstorm":
        return "⛈";
      case "Mist":
        return "🌫";
      default:
        return "🌤";
    }

  };

  const getTempColor = (temp) => {
    return temp > 25 ? "red" : "blue";
  };

  const currentDate = new Date().toLocaleString();

  return (

    <div className="app">

      <h1>Weather</h1>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button onClick={handleSearch}>Search</button>

      </div>

      {error && <p className="error">{error}</p>}

      {weather && (

        <div className="weather-box">

          <h2>{weather.name}</h2>

          <p>{currentDate}</p>

          <p
            className="temp"
            style={{ color: getTempColor(weather.main.temp) }}
          >
            {weather.main.temp} °C
          </p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>
            {getEmoji(weather.weather[0].main)} {weather.weather[0].main}
          </p>

        </div>

      )}

      {forecast.length > 0 && (

        <div className="forecast">

          <h3>5 Day Forecast</h3>

          <div className="forecast-container">

            {forecast.map((day, index) => (

              <div key={index} className="forecast-card">

                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>

                <p>{day.main.temp} °C</p>

                <p>{getEmoji(day.weather[0].main)}</p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}

export default App;