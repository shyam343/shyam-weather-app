// src/App.js
import React from "react";
import CurrentLocation from "./components/CurrentLocation";
import "./App.css";

function App() {
  return (
    <div className="container">
      <CurrentLocation />
      <div className="footer-info">
        Developed by{" "}
        <a target="_blank" href="https://shyamsah.netlify.app/" rel="noreferrer">
          Shyam Kumar Sah
        </a>
      </div>
    </div>
  );
}

export default App;