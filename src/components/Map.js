import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import polandGeoJSON from './poland.geo.json'; // Import danych GeoJSON dla Polski

// Dodanie niestandardowej ikony dla Markera
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/561/561237.png', // Link do ikony
  iconSize: [40, 40], // Rozmiar ikony
  iconAnchor: [16, 32], // Punkt zakotwiczenia
  popupAnchor: [0, -32], // Punkt wyskakującego okienka
});

const Map = ({ onLocationSelect }) => {
  const initialCenter = [52.13, 19.39]; // Środek Polski
  const bounds = [
    [47.0, 10.0], // Południowo-zachodni narożnik
    [57.0, 30.0], // Północno-wschodni narożnik
  ];

  const [position, setPosition] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationSelect({ latitude: lat, longitude: lng });
        setPopupOpen(true); // Ustaw otwarcie Popup
      },
    });
    return null;
  };

  const geoJSONStyle = {
    color: 'red',
    weight: 2,
    fillOpacity: 0,
  };

  return (
    <div style={{ width: '800px', height: '800px', margin: '0 auto' }}>
      <MapContainer
        center={initialCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        maxBounds={bounds}
        maxZoom={16}
        minZoom={6}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={polandGeoJSON} style={geoJSONStyle} />
        {position && (
          <Marker position={position} icon={customIcon}>
            <Popup
              position={position}
              open={popupOpen}
              onClose={() => setPopupOpen(false)} // Zamknij Popup po kliknięciu
            >
              <strong>Selected Location:</strong> <br />
              Latitude: {position[0].toFixed(2)}, <br />
              Longitude: {position[1].toFixed(2)}
            </Popup>
          </Marker>
        )}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;
