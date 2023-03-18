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
    </div>
  );
}

export default WeatherApp;
