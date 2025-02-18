import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CitySelector.css";

const CitySelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getCountries = async () => {
          try {
            const res = await axios.get(
              "https://crio-location-selector.onrender.com/countries"
            ); 
            console.log(res.data);
            setCountries(res.data); // Store the full data for reset 
          } catch (error) {
            console.error("Error fetching data:", error); // Log error to console
          }
        };
        getCountries();
      }, []);

      useEffect(() => {
        const getStates = async () => {
          try {
            const res = await axios.get(
              `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
            );
            console.log(res.data);
            setStates(res.data) // Store the full data for reset 
          } catch (error) {
            console.error("Error fetching data:", error); // Log error to console
          }
        };
        getStates();
      }, [selectedCountry]);

      useEffect(() => {
        const getCities = async () => {
          try {
            const res = await axios.get(
              ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
            );
            console.log(res.data);
            setCities(res.data) // Store the full data for reset 
          } catch (error) {
            console.error("Error fetching data:", error); // Log error to console
          }
        };
        getCities();
      }, [selectedState, selectedCountry]);

      const handleCityChange = (e) => {
        const city = e.target.value; // Get the selected city
        setSelectedCity(city); // Update the city state
        if (city && selectedCountry && selectedState) {
          setMessage(`You selected ${city}, ${selectedState}, ${selectedCountry}`);
        }
      };


    return (
        <div> 
        <h1>Select Location</h1>
        <div className="states">
        <select
         value={selectedCountry}
         onChange={(e) => setSelectedCountry(e.target.value)}
        > 
            <option value= "" disabled>Select Country</option>
            {countries.map((Country) => {
              return(
                <option key={Country} value = {Country}>
                    {Country}
                </option>
              )
            })}
        </select>
        <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled = {!selectedCountry}
        > 
            <option value= "" >Select State</option>
            {states.map((State) => {
              return(
                <option key={State} value = {State}>
                    {State}
                </option>
              )
            })}
        </select>
        <select value={selectedCity}
       onChange={handleCityChange}
       disabled={!selectedState}
        > 
            <option value= "" >Select City</option>
            {
                cities.map((state)=>{
                return(<option value={state}>{state}</option>) 
              })
            }
        </select>
        <div className="selected-location">
         {message && <p>{message}</p>}
        </div>
        </div> 
        </div>
    );
}


export default CitySelector;
