
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
  }
};

// fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

const NOW_PLAYING_API_URL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;

export const fetchNowPlayingMovies = async () => {
      
  try {
    const response = await fetch(NOW_PLAYING_API_URL, options);
    const data = await response.json();

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
