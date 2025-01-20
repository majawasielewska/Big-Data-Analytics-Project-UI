import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const [response, setResponse] = useState(null);

  // Fields for Get Visibility Of Satellite
  const [satelliteId, setSatelliteId] = useState(10393);
  const [satelliteName, setSatelliteName] = useState("DELTA 1 DEB");
  const [latitude, setLatitude] = useState(51.7);
  const [longitude, setLongitude] = useState(19.5);

  // Field for Get Visible Satellites
  const [startVisibleTime, setStartVisibleTime] = useState(1737389628);

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
    }
  };

  const fetchVisibleSatellites = async () => {
    try {
      if (!latitude || !longitude || !startVisibleTime) {
        alert("Please provide coordinates and a valid start time.");
        return;
      }

      // Construct query parameters
      const url = `http://13.74.48.118:8000/visibile_satellites?start_time=${startVisibleTime}`;
      const body = {
        location: {
          id: 678, // Optional, backend default
          name: "string", // Optional, backend default
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
      };

      console.log("Request body:", body);

      const res = await axios.post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("Response data:", res.data);

      navigate('/results2', { state: { data: res.data } });
    } catch (error) {
      console.error("Error fetching visible satellites:", error.response?.data || error.message);
      alert("An error occurred. Please check the console for details.");
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
      <main className="main" style={{ padding: '47px' }}>
        <section style={{ textAlign: 'center', marginTop: '-50px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            Hi satellite geek!
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '500px', margin: '0 auto' }}>
            With our app, you can see what satellites you will be able to see for the next 24 hours in your sky!
          </p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', height: '800px' }}>
          {/* Section for Get Visibility of Satellite */}
          <div style={{ width: '600px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
              Check whether a particular satellite will be visible in your sky.
            </h3>
            <input
              type="number"
              placeholder="Satellite ID"
              value={satelliteId || ""}
              onChange={(e) => setSatelliteId(Number(e.target.value))}
              style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="text"
              placeholder="Satellite Name"
              value={satelliteName || ""}
              onChange={(e) => setSatelliteName(e.target.value)}
              style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="Latitude"
              value={latitude || ""}
              onChange={(e) => setLatitude(Number(e.target.value))}
              style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={longitude || ""}
              onChange={(e) => setLongitude(Number(e.target.value))}
              style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
            />
            <button
              onClick={fetchVisibilityOfSatellite}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1.2rem',
                backgroundColor: '#71bdd8',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Get Visibility Of Satellite
            </button>
          </div>

          <Map onLocationSelect={handleMapClick} />

          {/* Section for Get Visible Satellites */}
          <div style={{ width: '600px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
              Check which satellites will be visible in your sky.
            </h3>
            <input
              type="number"
              placeholder="Latitude"
              value={latitude || ""}
              onChange={(e) => setLatitude(Number(e.target.value))}
              style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={longitude || ""}
              onChange={(e) => setLongitude(Number(e.target.value))}
              style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="Start Time (Unix Timestamp)"
              value={startVisibleTime || ""}
              onChange={(e) => setStartVisibleTime(Number(e.target.value))}
              style={{ width: '96%', padding: '10px', marginBottom: '10px' }}
            />
            <button
              onClick={fetchVisibleSatellites}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1.2rem',
                backgroundColor: '#71bdd8',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Get Visible Satellites
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
