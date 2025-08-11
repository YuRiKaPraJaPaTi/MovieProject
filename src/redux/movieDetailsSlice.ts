import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Credits, MovieDetails, Review } from '../types/types';

interface MovieState {
  details: MovieDetails | null;
  credits: Credits | null;
  tmdbReviews: Review[];
  firebaseReviews: Review[];
  loading: boolean;
  error: string | null;
}

interface MovieDetailsState {
  movies: {
      [movieId: string]: MovieState
  }
}

const initialState: MovieDetailsState = {
  movies:{}
};

const defaultMovieState: MovieState = {
  details: null,
  credits: null,
  tmdbReviews: [],
  firebaseReviews: [],
  loading: false,
  error: null,
};

function initMovieState(state: MovieDetailsState, movieId: string) {
  if (!state.movies[movieId]) {
    state.movies[movieId] = { ...defaultMovieState };
  }
}

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    
    setLoading(state, action: PayloadAction<{movieId: string, loading: boolean, }>) {
      const {movieId, loading} = action.payload
      initMovieState(state, movieId);
      state.movies[movieId].loading = loading;
    },

    setDetails(state, action: PayloadAction<{ movieId: string; details: MovieDetails | null }> ) {
      const { movieId, details } = action.payload;
      initMovieState(state, movieId);
      state.movies[movieId].details = details;
    },

    setCredits(state, action: PayloadAction<{ movieId: string; credits: Credits | null }>) {
      const { movieId, credits } = action.payload;
      initMovieState(state, movieId);
      state.movies[movieId].credits = credits;
    },

    setTmdbReviews(state, action: PayloadAction<{ movieId: string; reviews: Review[] }>) {
      const { movieId, reviews } = action.payload;
      initMovieState(state, movieId);
      state.movies[movieId].tmdbReviews = reviews;
    },

    setFirebaseReviews(state, action: PayloadAction<{ movieId: string; reviews: Review[] }>) {
      const { movieId, reviews } = action.payload;
      initMovieState(state, movieId);
      state.movies[movieId].firebaseReviews = reviews;
    },
    
    setError(state, action: PayloadAction<{ movieId: string; error: string }>) {
      const { movieId, error } = action.payload;
      initMovieState(state, movieId);
      state.movies[movieId].error = error;
      state.movies[movieId].loading = false;
      state.movies[movieId].details = null;
    },
  },
});

export const { setLoading, setDetails,setCredits, setTmdbReviews, setFirebaseReviews, setError} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
