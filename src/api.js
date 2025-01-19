import axios from 'axios';

const API_BASE_URL = 'http://13.74.48.118:8000';

export const getVisibilityOfSatellite = async (satellite, location, time) => {
  const response = await axios.post(`${API_BASE_URL}/visibility_of_satellite`, {
    satellite,
    location,
    time,
  });
  return response.data;
};

export const getVisibleSatellites = async (location, startTime, endTime) => {
  const response = await axios.post(`${API_BASE_URL}/visibile_satellites`, {
    location,
    start_time: startTime,
    end_time: endTime,
  });
  return response.data;
};
