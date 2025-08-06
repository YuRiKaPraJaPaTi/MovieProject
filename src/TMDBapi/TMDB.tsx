
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
  }
};

const BASE_URL = 'https://api.themoviedb.org/3/movie';
const LANGUAGE_PAGE_PARAMS = '?language=en-US&page=1';



export const fetchMovies = async (category:string) => {
      const URL = `${BASE_URL}/${category}${LANGUAGE_PAGE_PARAMS}`
      // console.log("url:", URL)
      try {
            const response = await fetch(URL, options);
            
            const data = await response.json();
            console.log("data",data)
            if (!data.results) {
            console.warn('No results found in response');
            return [];
      }

      return data.results.map((movie: any) => ({
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
