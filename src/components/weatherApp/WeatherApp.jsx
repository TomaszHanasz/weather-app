import React, { useState } from "react";
import WeatherCard from "../weatherCard/WeatherCard";
import axios from "axios";
import "./weatherApp.style.css";

const WeatherApp = () => {
  const lastCity = localStorage.getItem("Storage");
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [description, setDescription] = useState("");
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [searchedCity, setSearchedCity] = useState(lastCity);
  const [icon, setIcon] = useState("");

  const onChangeHandler = (e) => {
    setSearchedCity(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  const onClickHandler = async () => {
    try {
      localStorage.setItem("Storage", searchedCity);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=355cf3bff397cfe55bf144d10da9b2d8`
      );
      const { data } = response;
      setTemperature(data.main.temp);
      setDescription(data.weather[0].description);
      setFeelsLikeTemp(data.main.feels_like);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCity(data.name);
      setIcon(data.weather[0].icon);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="weather-container">
      {city && (
        <WeatherCard
          city={city}
          humidity={humidity}
          description={description}
          feelsLikeTemp={feelsLikeTemp}
          wind={wind}
          temperature={temperature}
          icon={icon}
        />
      )}
      <input
        placeholder="enter city name"
        onChange={onChangeHandler}
        value={searchedCity}
        onKeyDown={onKeyDownHandler}
      />
      <button onClick={onClickHandler}>Get the weather</button>
    </div>
  );
};

export default WeatherApp;
