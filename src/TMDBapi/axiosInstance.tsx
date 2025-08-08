import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
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

// Helper function to handle API requests
 export const fetchFromAPI = async (endpoint: string, params = {}) => {
  let url = `movie/${endpoint}`
    console.log(" url", url)

  if(endpoint == "trending") {
    url = `${endpoint}/movie/day`
      console.log("trending url", url)
  
    params = false; 
  } else if (endpoint === "search") {
    url = `search/movie`;
    // params = false
  }
  try {
    const { data } = await api.get(url, {
      params: { language: 'en-US', ...params },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
};



export default api;
