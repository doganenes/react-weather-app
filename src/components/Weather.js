import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER_DATA;
  const pexelsApiUrl = process.env.PEXELS_PHOTO_DATA;

  return <div className="weather-app"></div>;
}

export default WeatherApp;
