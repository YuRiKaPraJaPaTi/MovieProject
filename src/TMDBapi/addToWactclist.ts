import api from "./axiosInstance";

export const addToWatchlist = async(value: boolean, movieId: string) => {
  try{
  const response = await api.post(`/account/22105876/watchlist`, {
    media_type: 'movie',
    media_id: movieId,
    watchlist: value,
  });
  return response.data; 
  } catch (error) {
    console.error('Error in addToFavourite:', error);
    throw error;
  }
};