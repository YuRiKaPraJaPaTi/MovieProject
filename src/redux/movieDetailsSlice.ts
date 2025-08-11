import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Credits, MovieDetails, Review } from '../types/types';

interface MovieDetailsState {
  movie: MovieDetails | null;
  credits: Credits | null;
  tmdbReviews: Review[];
  firebaseReviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  movie: null,
  loading: false,
  credits: null,
  tmdbReviews: [],
  firebaseReviews: [],
  error: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDetails(state, action: PayloadAction<MovieDetails | null> ) {
      state.movie = action.payload;
    },
    setCredits(state, action: PayloadAction<Credits | null>) {
      state.credits = action.payload;
    },
    setTmdbReviews(state, action: PayloadAction<Review[]>) {
      state.tmdbReviews = action.payload;
    },
    setFirebaseReviews(state, action: PayloadAction<Review[]>) {
      state.firebaseReviews = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.movie = null;
    },
   
  },
});

export const { setLoading, setDetails,setCredits, setTmdbReviews, setFirebaseReviews, setError} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
