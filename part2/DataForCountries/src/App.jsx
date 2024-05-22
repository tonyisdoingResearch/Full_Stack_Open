import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);




  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  let content;


  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital[0]}&appid=f30e1070f8df7815730316e259f0b9c8&units=metric`)
        .then(response => {
          setWeather(response.data);
        });
    }
  }, [filteredCountries]);





  if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    content = (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} square kilometers</p>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
        </ul>
        {weather && (
          <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p><strong>temperature:</strong> {weather.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
            <p><strong>wind:</strong> {weather.wind.speed} m/s direction {weather.wind.deg} degrees</p>
          </div>
        )}
      </div>
    );
  }

  else {
    content = filteredCountries.map((country, index) =>
      <p key={index}>{country.name.common}</p>
    );
  }



  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      {content}
    </div>
  );
};

export default App;