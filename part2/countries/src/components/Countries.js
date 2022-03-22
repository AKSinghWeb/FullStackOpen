import axios from "axios";
import { useEffect, useState } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState([]);
  const [lat, long] = props.country.latlng;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeatherData([response.data]);
      });
  }, []);

  if (weatherData.length > 0) {
    return (
      <div>
        <h4>Weather in {props.country.capital}</h4>
        <p>Temperature {weatherData[0].main.temp} Celcius</p>
        <p>Wind {weatherData[0].wind.speed} m/s</p>
      </div>
    );
  } else {
    return <></>;
  }
};


const Countries = (props) => {
  const countries = props.filterdCountries;
  if (countries.length === 0) {
    return <></>;
  }
  if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <p>Capital {countries[0].capital}</p>
        <p>Area {countries[0].area}</p>
        <h4>Languages</h4>
        <ul>
          {Object.values(countries[0].languages).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
        <div>
          <img src={countries[0].flags.png} alt="flag"></img>
        </div>
        <Weather country={countries[0]} />
      </div>
    );
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return (
      <div>
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button
                value={country.name.common}
                onClick={props.handleShowCountry}
              >
                show
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Countries;
