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



// Fetch movie details
export const fetchMovieDetails = async (movieId: string) => {
      try {
      const { data } = await api.get(`/${movieId}`, {
            params: { language: 'en-US' },
      });

      return {
            title: data.title,
            releaseDate: data.release_date,
            overview: data.overview,
            rating: data.vote_average,
            image: `https://image.tmdb.org/t/p/w780${data.poster_path}`,
            backdropImage: `https://image.tmdb.org/t/p/w780${data.backdrop_path}`,
            tagline: data.tagline,
            duration: data.runtime,
            genres: data.genres.map((g: any) => g.name).join(', '),
      };
      } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
      }
};

// Fetch credits (cast & crew)
export const fetchMovieCredits = async (movieId: string) => {
      try {
      const { data } = await api.get(`/${movieId}/credits`, {
            params: { language: 'en-US' },
      });

      const director = data.crew.find((person: any) => person.job === 'Director')?.name;
      const cast = data.cast.slice(0, 5).map((actor: any) => actor.name);
      // console.log(director)
      // console.log(cast)

      return { director, cast };
      } catch (error) {
      console.error('Error fetching movie credits:', error);
      return { director: null, cast: [] };
      }
};

// Fetch reviews
export const fetchMovieReviews = async (movieId: string, page: number=1) => {
      try {
      const { data } = await api.get(`/${movieId}/reviews`, {
            params: { language: 'en-US', 
                  page: page.toString(),
            },
            
      });

      const reviews= data.results
      // console.log(reviews)

      return reviews.map((review: any) => ({
            id: review.id,
            author: review.author,
            content: review.content,
            rating: review.author_details.rating || 'N/A',
      }));
      } catch (error) {
      console.error('Error fetching movie reviews:', error);
      return [];
      }
};


