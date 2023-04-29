import React from "react";
import "../css/weather.css";

function Weather({ date, minTemp, maxTemp, condition, icon }) {
  return (
    <div className="result">
      <h2>{date}</h2>
      <ul>
        <li>
          <img src={icon} alt="" />
        </li>
        <li>{condition}</li>
        <li>
          {minTemp} °C / {maxTemp} C
        </li>
      </ul>
    </div>
  );
}

export default Weather;
