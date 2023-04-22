import axios from "axios";
import React, { useState, useEffect } from "react";

function Forecast({ forecastData }) {
  return (
    <div className="forecast">
      {forecastData.map((forecast) => (
        <div className="forecast-item" key={forecast.dt}>
          <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
          <img
            src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
            alt={forecast.weather[0].description}
          />
          <p>{forecast.weather[0].description}</p>
          <p>{forecast.temp.day} °C</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
