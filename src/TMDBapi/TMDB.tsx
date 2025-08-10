import  { fetchFromAPI } from './axiosInstance';


// fetch movie from category
export const fetchMovies = async (endpoint:string, page: number=1) => {

      const data = await fetchFromAPI(`${endpoint}`, {page})
      if (data) {
            const movies = data.results;
            return movies.map((movie: any) => ({
                  id: movie.id.toString(),
                  title: movie.title,
                  image: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
                  releaseDate: movie.release_date,
                  rating: movie.vote_average,
            }));

      }
      return [] ;
      
}


// Fetch movie details
export const fetchMovieDetails = async (movieId: string) => {
      const data = await fetchFromAPI(`/${movieId}`)
      if (data) {
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
      } 
      return null;
      }


// Fetch credits (cast & crew)
export const fetchMovieCredits = async (movieId: string) => {
      const data  = await fetchFromAPI(`${movieId}/credits`)
      if (data) {
            const director = data.crew.find((person: any) => person.job === 'Director')?.name;
            const cast = data.cast.slice(0, 10).map((actor: any) => ({
                  id: actor.id,
                  profile_path: actor.profile_path
            }))
            return { director, cast };
      } 
};

// Fetch movie reviews
export const fetchMovieReviews = async (movieId: string, page: number = 1) => {
      const data = await fetchFromAPI(`${movieId}/reviews`, { page });
      if (data) {
            return data.results || [];
      } 
}



