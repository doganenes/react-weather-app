import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_DATA;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    if (!cityName) {
      return;
    } else {
      setCity(e.target.elements.city.value);
      setPopupOpen(true);
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setWeatherData(null);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div className="weather-app">
      {popupOpen ? (
        <Popup handleClose={handlePopupClose}>
          {weatherData ? (
            <React.Fragment>
              <h1>{weatherData.name}</h1>
              <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="City image"
              />
              <h2>{weatherData.weather[0].description}</h2>
              <h2>{weatherData.main.temp} °C</h2>
            </React.Fragment>
          ) : (
            <p>Loading...</p>
          )}
        </Popup>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="city" placeholder="Enter city name..." />
          <button type="submit">Search</button>
        </form>
      )}
    </div>
  );
}

export default Weather;
