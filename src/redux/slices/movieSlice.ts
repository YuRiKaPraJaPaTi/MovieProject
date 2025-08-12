import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/types';

interface MovieCategoryState {
  movies: Movie[];
  page: number;
}

interface MovieState {
      categories: {
            [endpoint: string]: MovieCategoryState;
      };
}

const initialState: MovieState = {
      categories: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
      setMovies( state, action: PayloadAction<{endpoint: string, movies: Movie[]}>){
            const { endpoint, movies } = action.payload;
            if (!state.categories[endpoint]) {
            state.categories[endpoint] = { movies: [], page: 1 };
            }
            state.categories[endpoint].movies = movies;
      },

      setPage(state, action: PayloadAction<{ endpoint: string; page: number }>) {
            const { endpoint, page } = action.payload;
            if (!state.categories[endpoint]) {
            state.categories[endpoint] = { movies: [], page: 1 };
            }
            state.categories[endpoint].page = page;
      },
      },

});

export const { setMovies, setPage } = movieSlice.actions;

export default movieSlice.reducer;
