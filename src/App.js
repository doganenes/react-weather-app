import "./App.css";
import React, { useState } from "react";
import Weather from "./components/Weather";

function App() {
  const APP_KEY = process.env.REACT_APP_WEATHER_DATA;
  let cityInput = "";
  const [weatherData, setWeatherData] = useState([]);
  let cityText = () => {
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityInput = e.target.value;
    });
  };

  async function getData(value) {
    const data =
      await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=3&aqi=no&alerts=no
    `);
    const result = await data.json();
    setWeatherData(result.forecast.forecastday);
    console.log(result.forecast.forecastday);
  }

  return (
    <div className="app">
      <div className="app-items">
        <h1 className="app-title text-dark">Weather App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search a city.."
            onChange={cityText}
          />
          <button onClick={() => getData(cityInput)}>Search</button>
        </div>
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
