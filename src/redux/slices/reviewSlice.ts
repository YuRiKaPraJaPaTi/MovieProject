import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addReview as addReviewFirestore, fetchFirestoreReviews, listenToFirestoreReviews } from '../../firebase/ReviewService';
import { Review } from '../../types/types';

interface ReviewState {
  reviewsByMovie: Record<string, Review[]>;
}

const initialState: ReviewState = {
  reviewsByMovie: {},
};

// Fetch reviews for a movie
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (movieId: string) => {
    const reviews = await fetchFirestoreReviews(movieId);
    return { movieId, reviews };
  }
);

// Add a new review
export const addReview = createAsyncThunk(
  'reviews/addReview',
  async ({ movieId, comment, rating }: { movieId: string; comment: string; rating: number }) => {
    await addReviewFirestore(movieId, comment, rating);
    return { movieId, comment, rating };
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setMovieReviews: (state, action: PayloadAction<{ movieId: string; reviews: Review[] }>) => {
      state.reviewsByMovie[action.payload.movieId] = action.payload.reviews;
    },
    addReviewLocal: (state, action: PayloadAction<{ movieId: string; review: Review }>) => {
      if (!state.reviewsByMovie[action.payload.movieId]) {
        state.reviewsByMovie[action.payload.movieId] = [];
      }
      state.reviewsByMovie[action.payload.movieId].unshift(action.payload.review);
    },
  },
//   extraReducers: (builder) => {
//     builder.addCase(fetchReviews.fulfilled, (state, action) => {
//       state.reviewsByMovie[action.payload.movieId] = action.payload.reviews;
//     });
//     builder.addCase(addReview.fulfilled, (state, action) => {
//       // Optionally handled by Firestore listener; no need to duplicate
//     });
//   },
});

export const { setMovieReviews, addReviewLocal } = reviewSlice.actions;
export default reviewSlice.reducer;
