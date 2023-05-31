import React from "react";
import "./weatherCard.style.css";

const WeatherCard = (props) => {
  const {
    city,
    temperature,
    description,
    feelsLikeTemp,
    humidity,
    wind,
    icon,
  } = props;

  return (
    <div className="weather-card">
      <h3>{city}</h3>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather" />
      <div className="temp-box">
        <p className="temp">{temperature}º</p>
        <div className="description">
          <p>{description}</p>
          <p>Feels like: {feelsLikeTemp}º</p>
          <p>Humidity: {humidity} %</p>
          <p>Wind: {wind} mph</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
