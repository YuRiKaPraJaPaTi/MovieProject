import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  headers: {
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Add authorization header to every request
    const token = process.env.TMDB_API_KEY;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => {
  
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
