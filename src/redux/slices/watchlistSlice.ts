import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addToWatchlist } from '../../TMDBapi/addToWactclist';
import { fetchFromAPI } from '../../TMDBapi/helperAPI';

interface WatchlistState {
  watchlistIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: WatchlistState = {
  watchlistIds: [],
  loading: false,
  error: null,
};

// Fetch watchlist from TMDB
export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFromAPI('watchlist'); // your API helper
      return response.results.map((movie: any) => movie.id.toString());
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch watchlist');
    }
  }
);

// Toggle watchlist
export const toggleWatchlist = createAsyncThunk<
  { movieId: string; isInWatchlist: boolean },
  { movieId: string; isInWatchlist: boolean },
  { rejectValue: string }
>(
  'watchlist/toggleWatchlist',
  async ({ movieId, isInWatchlist }, { rejectWithValue }) => {
    try {
      await addToWatchlist(isInWatchlist, movieId); // your API call
      return { movieId, isInWatchlist };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update watchlist');
    }
  }
);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.watchlistIds = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleWatchlist.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleWatchlist.fulfilled, (state, action) => {
        const { movieId, isInWatchlist } = action.payload;
        if (isInWatchlist) {
          if (!state.watchlistIds.includes(movieId)) {
            state.watchlistIds.push(movieId);
          }
        } else {
          state.watchlistIds = state.watchlistIds.filter(id => id !== movieId);
        }
      })
      .addCase(toggleWatchlist.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = watchlistSlice.actions;
export default watchlistSlice.reducer;
