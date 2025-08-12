import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addToFavourite } from '../../TMDBapi/addFavourite';
import api from '../../TMDBapi/axiosInstance';
import { fetchFromAPI } from '../../TMDBapi/helperAPI';

interface FavoriteState {
  favoriteIds: string[];  
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favoriteIds: [],
  loading: false,
  error: null,
};

// Fetch favorites list from TMDB
export const fetchFavorites = createAsyncThunk(
  'favorite/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFromAPI('favorite')
      return response.results.map((movie: any) => movie.id.toString());
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch favorites');
    }
  }
);

// Toggle favorite using your existing function
export const toggleFavorite = createAsyncThunk<
  { movieId: string; isFavorite: boolean },
  { movieId: string; isFavorite: boolean },
  { rejectValue: string }
>(
  'favorite/toggleFavorite',
  async ({ movieId, isFavorite }, { rejectWithValue }) => {
    try {
      await addToFavourite(isFavorite, movieId);
      return { movieId, isFavorite };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update favorite');
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.favoriteIds = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { movieId, isFavorite } = action.payload;
        if (isFavorite) {
          if (!state.favoriteIds.includes(movieId)) {
            state.favoriteIds.push(movieId);
          }
        } else {
          state.favoriteIds = state.favoriteIds.filter(id => id !== movieId);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = favoriteSlice.actions;
export default favoriteSlice.reducer;









