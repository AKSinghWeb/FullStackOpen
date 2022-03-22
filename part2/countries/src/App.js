import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterdCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filterCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filterText)
    );

    if (event.target.value === "") {
      setFilteredCountries([]);
    } else {
      setFilteredCountries(filterCountries);
    }
  };

  const handleShowCountry = (event) => {
    const country = filterdCountries.find(
      (country) => country.name.common === event.target.value
    );
    setFilteredCountries([country]);
  };

  return (
    <div>
      Find Countries
      <input onChange={handleSearch} />
      <Countries
        filterdCountries={filterdCountries}
        handleShowCountry={handleShowCountry}
      />
    </div>
  );
}

export default App;
