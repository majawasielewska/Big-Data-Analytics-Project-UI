import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ResultsPage from './components/ResultsPage'; // Import pliku ResultsPage.js
import ResultsPage2 from './components/ResultsPage2'; // Import pliku ResultsPage.js
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results2" element={<ResultsPage2 />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
