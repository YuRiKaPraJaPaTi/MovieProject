import api from "./axiosInstance";

export const addToFavourite = (value: boolean, movieId: number) => {
  api.post(`/account/22105876/favorite`, {
    media_type: 'movie',
    media_id: movieId,
    favorite: value,
  });
};