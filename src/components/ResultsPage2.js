import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../App.css';
import logo from '../assets/logo.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsPage2 = () => {
  const location = useLocation();
  const data = location.state?.data;

  const formatUTC = (utc) => {
    const date = new Date(utc * 1000); // Convert seconds to milliseconds
    return date.toLocaleString('en-US', { timeZone: 'UTC' });
  };

  const renderCloudCoverChart = (cloudCover) => {
    const chartData = {
      labels: ['Cloud Cover'],
      datasets: [
        {
          label: 'Cloud Cover (%)',
          data: [cloudCover],
          backgroundColor: 'rgba(0, 119, 204, 0.5)',
          borderColor: '#0077cc',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Cloud Cover Forecast',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    };

    return <Bar data={chartData} options={options} />;
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
          flexDirection: 'row',
        }}
      >
        <section
          style={{
            maxWidth: '60%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Visible Satellites Results</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            Below are the results for the visible satellites based on your input.
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
            <h2 style={{ color: '#0077cc', fontSize: '1.5rem', marginBottom: '10px' }}>Satellites</h2>
            {data.satellites.length > 0 ? (
              <ul>
                {data.satellites.map((sat, index) => (
                  <li key={index}>
                    <strong>ID:</strong> {sat.id}, <strong>Name:</strong> {sat.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No satellites available.</p>
            )}
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
                    <td style={{ padding: '10px', textAlign: 'center' }}>{formatUTC(pass.startUTC)}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{formatUTC(pass.endUTC)}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{pass.startAz}°</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{pass.endAz}°</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cloud Cover Chart */}
        <section
          style={{
            width: '40%',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            marginLeft: '20px',
            marginTop: '125px',
          }}
        >
          <h2 style={{ color: '#0077cc', fontSize: '1.5rem', marginBottom: '10px' }}>Cloud Cover Chart</h2>
          {renderCloudCoverChart(data.cloud_cover)}
        </section>
      </main>
    </div>
  );
};

export default ResultsPage2;
