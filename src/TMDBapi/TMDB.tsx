import axios from 'axios';
import api from './axiosInstance';



export const fetchMovies = async (category:string, page: number=1) => {

      try {
            const { data } = await api.get(`/${category}`, {
            params: {
                  language: 'en-US',
                  page: page.toString(),
            },      
      
       });
            const movies = data.results;
            return movies.map((movie: any) => ({
                  id: movie.id.toString(),
                  title: movie.title,
                  image: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
                  releaseDate: movie.release_date,
                  rating: movie.vote_average,
            }));

      } catch (error) {
            console.error('Error fetching now playing movies:', error);
            return [] ;
      
      }
};
