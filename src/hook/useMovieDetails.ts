// src/hooks/useMovieDetails.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  setCredits, setError, setFirebaseReviews, setLoading, setTmdbReviews, setDetails 
} from '../redux/movieDetailsSlice';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieReviews } from '../TMDBapi/TMDB';
import { listenToFirestoreReviews } from '../firebase/ReviewService';

export function useMovieDetails(movieId: string) {
  const dispatch = useAppDispatch();
  const movieData = useAppSelector(state => state.movieDetails.movies[movieId]);

  useEffect(() => {
    if (movieData?.details) {
      dispatch(setLoading({ movieId, loading: false }));
      return;
    }
    dispatch(setLoading({ movieId, loading: true }));

    let unsubscribeFirestore: () => void;

    const fetchData = async () => {
      try {
        if (!movieData?.details) {
          const movieDetails = await fetchMovieDetails(movieId);
          dispatch(setDetails({ movieId, details: movieDetails }));
        }
        if (!movieData?.credits) {
          const creditDetails = await fetchMovieCredits(movieId);
          dispatch(setCredits({ movieId, credits: creditDetails ?? null }));
        }
        if (!movieData?.tmdbReviews?.length) {
          const tmdbReviews = await fetchMovieReviews(movieId);
          const formattedTmdb = tmdbReviews.map((item: any) => ({
            id: item.id,
            author: item.author,
            comment: item.content,
            rating: item.author_details.rating,
            source: 'tmdb' as const,
          }));
          dispatch(setTmdbReviews({ movieId, reviews: formattedTmdb }));
        }

        unsubscribeFirestore = listenToFirestoreReviews(movieId, (firebaseReviews) => {
          if (firebaseReviews) {
            const formattedFirebase = firebaseReviews.map((item: any) => ({
              id: item.id,
              author: item.author,
              comment: item.comment,
              rating: item.rating,
              source: 'firebase' as const,
            }));
            dispatch(setFirebaseReviews({ movieId, reviews: formattedFirebase }));
          } else {
            dispatch(setFirebaseReviews({ movieId, reviews: [] }));
          }
          dispatch(setLoading({ movieId, loading: false }));
        });
      } catch (error) {
        dispatch(setError({ movieId, error: 'Failed to load movie details' }));
        dispatch(setLoading({ movieId, loading: false }));
      }
    };

    fetchData();

    return () => {
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, [dispatch, movieId]);

  return movieData;
}
