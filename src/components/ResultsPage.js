import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png';

const ResultsPage = () => {
  const location = useLocation();
  const data = location.state?.data;

  const renderCloudCover = (cloudCover) => {
    if (!cloudCover || typeof cloudCover !== 'object') {
      return <p>Cloud cover data not available.</p>;
    }

    const forecastHours = Object.keys(cloudCover)
      .filter((key) => key.startsWith('forecast_hour_')) // Filtruj tylko klucze z godzinami prognozy
      .sort((a, b) => parseInt(a.split('_')[2]) - parseInt(b.split('_')[2])); // Sortuj po numerze godziny

    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#0077cc', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Hour</th>
            <th style={{ padding: '10px' }}>Cloud Cover (%)</th>
          </tr>
        </thead>
        <tbody>
          {forecastHours.map((hourKey, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{hourKey.split('_')[2]}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{cloudCover[hourKey]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Satellite Tracking Logo" className="logo" />
          <h1 className="app-name">Satellite Tracking</h1>
        </div>
      </header>
      <main
        className="main"
        style={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column', // Wyśrodkowanie pionowe
        }}
      >
        {/* Sekcja wyników */}
        <section
          style={{
            maxWidth: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Satellite Visibility Results</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            Below are the results for the satellite visibility based on your input.
          </p>

          {/* Satellite Details */}
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              width: '100%',
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ color: '#0077cc', fontSize: '1.5rem', marginBottom: '10px' }}>Satellite Details</h2>
            <p>
              <strong>ID:</strong> {data.satellite.id}
            </p>
            <p>
              <strong>Name:</strong> {data.satellite.name}
            </p>
          </div>

          {/* Passes Details */}
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              width: '100%',
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ color: '#0077cc', fontSize: '1.5rem', marginBottom: '10px' }}>Satellite Passes</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0077cc', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Start UTC</th>
                  <th style={{ padding: '10px' }}>End UTC</th>
                  <th style={{ padding: '10px' }}>Start Azimuth</th>
                  <th style={{ padding: '10px' }}>End Azimuth</th>
                </tr>
              </thead>
              <tbody>
                {data.passes.map((pass, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{pass.startUTC}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{pass.endUTC}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{pass.startAz}°</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{pass.endAz}°</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cloud Cover */}
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              width: '100%',
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ color: '#0077cc', fontSize: '1.5rem', marginBottom: '10px' }}>Cloud Cover</h2>
            {renderCloudCover(data.cloud_cover)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResultsPage;
