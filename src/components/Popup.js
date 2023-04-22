import "../App.css";
import React, { useState } from "react";
import axios from "axios";

function Popup(props) {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
      );
      handleWeatherData(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };
  return (
    <div className="popup">
      <button className="close-btn" onClick={props.handleClose}>
        X
      </button>
      <div className="popup-inner">
        <div className="popup-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Popup;
