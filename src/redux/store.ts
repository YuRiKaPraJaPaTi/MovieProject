import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './slices/movieSlice'
import movieDetailsReducer from './slices/movieDetailsSlice'
import favoriteReducer from './slices/favoriteSlice'
import watchlistReducer from './slices/watchlistSlice'

export const store = configureStore({
  reducer: {
      movies: movieReducer,
      movieDetails: movieDetailsReducer,
      favorite: favoriteReducer,
      watchlist: watchlistReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch