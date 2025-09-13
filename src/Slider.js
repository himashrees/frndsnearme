import React, { useState } from 'react';
import axios from 'axios';

function Search({ userData, handleLogout }) {
  const [latitude, setLatitude] = useState(userData.latitude);
  const [longitude, setLongitude] = useState(userData.longitude);
  const [distance, setDistance] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [resultData, setResultData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // handle slider change
  const handleSliderChange = (e) => {
    setDistance(e.target.value);
    setSliderValue(e.target.value);
  }

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/locations/users/nearby/${latitude}/${longitude}/${distance}`)
      .then(response => {
        console.log(response.data); 
        setResultData(response.data);
        setErrorMsg('');
      })
      .catch(error => {
        console.log(error);
        setResultData([]);
        setErrorMsg('No results found');
      });
  }

  return (
    <div className="search-container">
      <div className="user-info">
        <p>Logged in as: {userData.username}</p>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Search</h2>
        <div className="form-control">
          <label htmlFor="latitude">Latitude:</label>
          <input type="number" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>
        <div className="form-control">
          <label htmlFor="longitude">Longitude:</label>
          <input type="number" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>
        <div className="form-control">
          <label htmlFor="distance">Distance (km):</label>
          <input type="range" id="distance" min="0" max="20000" step="10" value={distance} onChange={handleSliderChange} />
          <p>Distance moved: {sliderValue} km</p>
        </div>
        <button type="submit">Find</button>
        <button type="button" onClick={handleLogout}>Logout</button>
      </form>
      {errorMsg && <p className="error">{errorMsg}</p>}
      {resultData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Mobile number</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map(([username, name, latitude, longitude, mobile, distance]) => (
              <tr key={username}>
                <td>{name}</td>
                <td>{latitude}</td>
                <td>{longitude}</td>
                <td>{mobile}</td>
                <td>{distance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
}

export default Search;