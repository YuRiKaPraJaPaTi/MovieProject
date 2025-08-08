import api from "./axiosInstance";

export const addToFavourite = async(value: boolean, movieId: string) => {
  try{
  const response = await api.post(`/account/22105876/favorite`, {
    media_type: 'movie',
    media_id: movieId,
    favorite: value,
  });
  return response.data; 
  } catch (error) {
    console.error('Error in addToFavourite:', error);
    throw error;
  }
};