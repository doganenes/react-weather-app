import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import "../App.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState([]);
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
      setWeatherData(response.data.list.slice(0, 8));
    } catch (error) {
      alert(error);
    }
  };

  const fetchWeatherForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherForecast(response.data.list.slice(0, 8)); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const today = weatherForecast.length
    ? new Date(weatherForecast[0].dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      })
    : "";
  const tomorrow = weatherForecast.length
    ? new Date(weatherForecast[1].dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      })
    : "";
  const dayAfterTomorrow = weatherForecast.length
    ? new Date(weatherForecast[2].dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      })
    : "";
  const dayAfterDayAfterTomorrow = weatherForecast.length
    ? new Date(weatherForecast[3].dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      })
    : "";

  return (
    <div className="weather-app">
      {popupOpen ? (
        <Popup handleClose={handlePopupClose}>
          {weatherForecast.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Weather</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{today}</td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherForecast[0].weather[0].icon}.png`}
                      alt="Weather icon"
                    />
                  </td>
                  <td>{weatherForecast[0].main.temp}°C</td>
                </tr>
                <tr>
                  <td>{tomorrow}</td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherForecast[1].weather[0].icon}.png`}
                      alt="Weather icon"
                    />
                  </td>
                  <td>{weatherForecast[1].main.temp}°C</td>
                </tr>
                <tr>
                  <td>{dayAfterTomorrow}</td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherForecast[2].weather[0].icon}.png`}
                      alt="Weather icon"
                    />
                  </td>
                  <td>{weatherForecast[2].main.temp}°C</td>
                </tr>
                <tr>
                  <td>{dayAfterDayAfterTomorrow}</td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherForecast[3].weather[0].icon}.png`}
                      alt="Weather icon"
                    />
                  </td>
                  <td>{weatherForecast[3].main.temp}°C</td>
                </tr>
              </tbody>
            </table>
          )}
        </Popup>
      ) : (
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            className="d-inline form-control input-lg"
            type="text"
            name="city"
            placeholder="Enter city name..."
          />
          <button
            className="btn mx-1 bg-success text-light rounded"
            type="submit"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
}

export default Weather;
