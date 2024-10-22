// src/components/Forecast.js
import React, { useState } from "react";
import axios from "axios";
import apiKeys from "../apiKeys";

function Forecast() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const searchCity = () => {
    axios
      .get(`${apiKeys.base}weather?q=${query}&units=metric&APPID=${apiKeys.key}`)
      .then((response) => {
        setWeather(response.data);
        setError("");
      })
      .catch((error) => {
        setError("City not found!");
        setWeather(null);
      });
  };

  return (
    <div className="forecast">
      <input
        type="text"
        placeholder="Search for a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchCity}>Search</button>
      {weather ? (
        <div>
          <p>{weather.name}, {weather.sys.country}</p>
          <p>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].main}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Search for a city to get weather details</p>
      )}
    </div>
  );
}

export default Forecast;