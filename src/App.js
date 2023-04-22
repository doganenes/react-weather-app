import React, { useState } from "react";
import Weather from "./components/Weather";
import Popup from "./components/Popup";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = (city) => {
    setCity(city);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div className="app">
      <div>
        <h1 className="app-title text-dark">Weather App</h1>
        <Weather onSearch={handleSearch} onData={handleWeatherData} />
        {showPopup && <Popup onClose={handleClosePopup} data={weatherData} />}
      </div>
      <footer>Designed by Enes Doğan | &copy; 2023</footer>
    </div>
  );
}

export default App;
