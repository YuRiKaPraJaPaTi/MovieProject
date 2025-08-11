import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../redux/movieSlice'
import movieDetailsReducer from './movieDetailsSlice'

export const store = configureStore({
  reducer: {
      movies: movieReducer,
      movieDetails: movieDetailsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch