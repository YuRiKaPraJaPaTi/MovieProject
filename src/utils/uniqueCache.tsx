// src/redux/selectors/moviesSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';// adjust path to your RootState type

const selectCategories = (state: RootState) => state.movies.categories;

export const selectUniqueCachedMovies = createSelector(
  [selectCategories],
  (categories) => {
    const allMovies = Object.values(categories).flatMap(cat => cat.movies);
    const uniqueMoviesMap = new Map();

    allMovies.forEach(movie => {
      uniqueMoviesMap.set(movie.id, movie);
    });

    return Array.from(uniqueMoviesMap.values());
  }
);
