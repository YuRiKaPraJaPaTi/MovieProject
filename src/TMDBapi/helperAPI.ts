import api from "./axiosInstance";

const account_id = process.env.TMDB_ACCOUNT_ID

// Helper function to handle API requests
 export const fetchFromAPI = async (endpoint: string, params = {}) => {
  let url = `movie/${endpoint}`
    console.log(" url", url)

  if(endpoint == "trending") {
    url = `${endpoint}/movie/day`
      console.log("trending url", url)
  
    params = {}; 
  } else if (endpoint === "search") {
    url = `search/movie`;
    // params = false
  } else if (endpoint == "favorite") {
    url = `account/${account_id}/favorite/movies`
    // https://api.themoviedb.org/3/account/{account_id}/favorite/movies

 } else if (endpoint == "watchlist") {
    url = `account/${account_id}/watchlist/movies`
    // https://api.themoviedb.org/3/account/{account_id}/watchlist/movies

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
