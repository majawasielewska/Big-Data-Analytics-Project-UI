import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.png';
import Map from './components/Map';

function App() {
  const [response, setResponse] = useState(null);

  // Fields for Get Visibility Of Satellite
  const [satelliteId, setSatelliteId] = useState(10393);
  const [satelliteName, setSatelliteName] = useState("DELTA 1 DEB");
  const [latitude, setLatitude] = useState(51.7);
  const [longitude, setLongitude] = useState(19.5);

  // Field for Get Visible Satellites
  const [hoursFromNow, setHoursFromNow] = useState(1);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle map click
  const handleMapClick = (coords) => {
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const navigate = useNavigate();

  const fetchVisibilityOfSatellite = async () => {
    try {
      if (!satelliteId || !satelliteName) {
        alert("Please enter both Satellite ID and Name.");
        return;
      }
      if (!latitude || !longitude) {
        alert("Please enter coordinates (latitude and longitude).");
        return;
      }

      setLoading(true);

      const url = `http://13.74.48.118:8000/visibility_of_satellite`;

      const body = {
        satellite: {
          id: Number(satelliteId),
          name: satelliteName.trim(),
        },
        location: {
          id: 678,
          name: "string",
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
      };

      console.log("Request body:", body);

      const res = await axios.post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("Response data:", res.data);

      navigate('/results', { state: { data: res.data } });
    } catch (error) {
      console.error("Error fetching visibility of satellite:", error.response?.data || error.message);
      alert("An error occurred. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVisibleSatellites = async () => {
    try {
      if (!latitude || !longitude || !hoursFromNow) {
        alert("Please provide coordinates and a valid start time.");
        return;
      }

      setLoading(true);

      const startTimeUnix = Math.floor(Date.now() / 1000) + hoursFromNow * 3600;

      const url = `http://13.74.48.118:8000/visibile_satellites?lat=${latitude}&long=${longitude}&start_time=${startTimeUnix}`;

      console.log("Request URL:", url);

      const res = await axios.post(url, null, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("Response data:", res.data);

      navigate('/results2', { state: { data: res.data } });
    } catch (error) {
      console.error("Error fetching visible satellites:", error.response?.data || error.message);
      alert("An error occurred. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Satellite Tracking Logo" className="logo" />
          <h1 className="app-name">Satellite Tracking</h1>
        </div>
      </header>
      <main className="main">
        <section className="intro">
          <h2>Hi satellite geek!</h2>
          <p>
            With our app, you can see what satellites you will be able to see for the next 24 hours in your sky!
          </p>
        </section>
        <div className="form-container">
          {/* Section for Get Visibility of Satellite */}
          <div className="form-section">
            <h3>Check whether a particular satellite will be visible in your sky.</h3>
            <label>
              Satellite ID
              <input
                type="number"
                placeholder="Satellite ID"
                value={satelliteId || ""}
                onChange={(e) => setSatelliteId(Number(e.target.value))}
              />
            </label>
            <label>
              Satellite Name
              <input
                type="text"
                placeholder="Satellite Name"
                value={satelliteName || ""}
                onChange={(e) => setSatelliteName(e.target.value)}
              />
            </label>
            <label>
              Latitude
              <input
                type="number"
                placeholder="Latitude"
                value={latitude || ""}
                onChange={(e) => setLatitude(Number(e.target.value))}
              />
            </label>
            <label>
              Longitude
              <input
                type="number"
                placeholder="Longitude"
                value={longitude || ""}
                onChange={(e) => setLongitude(Number(e.target.value))}
              />
            </label>
            <button onClick={fetchVisibilityOfSatellite}>
              Get Visibility Of Satellite
            </button>
          </div>

          <Map onLocationSelect={handleMapClick} />

          {/* Section for Get Visible Satellites */}
          <div className="form-section">
            <h3>Check which satellites will be visible in your sky.</h3>
            <label>
              Latitude
              <input
                type="number"
                placeholder="Latitude"
                value={latitude || ""}
                onChange={(e) => setLatitude(Number(e.target.value))}
              />
            </label>
            <label>
              Longitude
              <input
                type="number"
                placeholder="Longitude"
                value={longitude || ""}
                onChange={(e) => setLongitude(Number(e.target.value))}
              />
            </label>
            <label>
              Hours from now (max 24)
              <input
                type="number"
                placeholder="Hours from now (max 24)"
                value={hoursFromNow}
                onChange={(e) => setHoursFromNow(Math.min(Math.max(Number(e.target.value), 1), 24))}
              />
            </label>
            <button onClick={fetchVisibleSatellites}>
              Get Visible Satellites
            </button>
          </div>
        </div>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;