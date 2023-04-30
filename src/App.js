import "./App.css";
import React, { useState } from "react";
import Weather from "./components/Weather";

function App() {
  const APP_KEY = process.env.REACT_APP_WEATHER_DATA;
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cityInput) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${cityInput}&days=3&aqi=no&alerts=no`
      );
      const result = await response.json();
      if (result.error) {
        setError(result.error.message);
      } else {
        setWeatherData(result.forecast.forecastday);
        setError("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title text-dark">Weather App</h1>
      <div className="app-items">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search a city.."
            value={cityInput}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
      {weatherData.map((item) => (
        <Weather
          key={item.date}
          date={item.date}
          minTemp={item.day.mintemp_c}
          maxTemp={item.day.maxtemp_c}
          condition={item.day.condition.text}
          icon={item.day.condition.icon}
        />
      ))}
    </div>
  );
}

export default App;
