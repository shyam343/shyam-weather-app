import React, { useState, useEffect, useCallback } from "react";
import apiKeys from "../apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import Clock from "react-live-clock";
import Forecast from "./Forecast";

const dateBuilder = (d) => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();

  return `${day}, ${date} ${months[month]} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  const sanitizeCityName = (name) => {
    if (name === "Pā̃gā Biṣṇudevi̇̄") return "Shyam Sah";
    return name;
  };

  const getWeather = useCallback(async (lat, lon) => {
    const response = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await response.json();
    setWeatherData({
      city: sanitizeCityName(data.name),
      country: data.sys.country,
      temperatureC: Math.round(data.main.temp),
      main: data.weather[0].main,
      icon: data.weather[0].main,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          getWeather(28.67, 77.22); // Default to New Delhi
          alert("Location access denied. Defaulting to New Delhi.");
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  }, [getWeather]);

  const weatherIcon = () => {
    switch (weatherData.main) {
      case "Clouds":
        return "CLOUDY";
      case "Rain":
        return "RAIN";
      case "Snow":
        return "SNOW";
      default:
        return "CLEAR_DAY";
    }
  };

  return loading ? (
    <div>
      <img src="background-image.jpg" alt="loading" /> {/* Reference to the image in public folder */}
      <p>Loading weather...</p>
    </div>
  ) : (
    <div className="city">
      <div className="title">
        <h2>{weatherData.city}</h2>  {/* Display the replaced name */}
        <h3>{weatherData.country}</h3>
      </div>
      <div className="mb-icon">
        <ReactAnimatedWeather
          icon={weatherIcon()}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
        <p>{weatherData.main}</p>
      </div>
      <div className="date-time">
        <div className="current-time">
          <Clock format={"HH:mm:ss"} ticking={true} />
        </div>
        <div className="current-date">{dateBuilder(new Date())}</div>
        <div className="temperature">
          {weatherData.temperatureC}°C
        </div>
      </div>
      <Forecast />
    </div>
  );
}

export default Weather;
