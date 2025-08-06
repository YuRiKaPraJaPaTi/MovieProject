import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie';

export const fetchMovies = async (category:string, page: number=1) => {

      const options = {
            method: 'GET',
            url: `${BASE_URL}/${category}`,
            params: {
                  language: 'en-US',
                  page: page.toString(),
            },
            headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
      };
      try {
            const response = await axios.request(options);

            const movies = response.data.results;
            
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
