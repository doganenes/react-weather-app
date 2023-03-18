import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER_DATA;
  const pexelsApiUrl = process.env.PEXELS_PHOTO_DATA;

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=apiKey`
        )
        .then((res) => {
          setWeatherData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(pexelsApiUrl, {
          headers: {
            Authorization: apiKey,
          },
        })
        .then((res) => {
          setBackgroundImage(res.data.photos[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="Enter city name..." />
        <button type="submit">Search</button>
      </form>
      {weatherData.main && (
        <div className="weather-data">
          <h1>{weatherData.name}</h1>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="City image"
          />
          <h2>{weatherData.weather[0].description}</h2>
          <h2>{weatherData.main.temp}</h2>
        </div>
      )}
      {backgroundImage && (
        <div
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )}
    </div>
  );
}

export default WeatherApp;
