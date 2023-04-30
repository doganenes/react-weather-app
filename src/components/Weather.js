import React from "react";
import "../css/weather.css";

function Weather({ date, minTemp, maxTemp, condition, icon }) {
  return (
    <div className="result">
      <ul>
        <li>
          <h2>{date}</h2>
        </li>
        <li className="icon">
          <img src={icon} alt="" />
        </li>
        <li className="condition">{condition}</li>
        <li className="tempCondition">
          {minTemp}°C / {maxTemp}°C
        </li>
      </ul>
    </div>
  );
}

export default Weather;
