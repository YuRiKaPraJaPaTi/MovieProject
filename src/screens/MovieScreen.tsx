import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import TopSection from '../components/Movie/TopSection';
import ReviewSection from '../components/Movie/ReviewSection';
import { listenToFirestoreReviews } from '../firebase/ReviewService';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieReviews } from '../TMDBapi/TMDB';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCredits, setError, setFirebaseReviews, setLoading, setTmdbReviews, setDetails } from '../redux/movieDetailsSlice';

type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;


const MovieScreen = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movieId, title, image } = route.params;

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
          // Fetch movie details only if not cached:
          if (!movieData?.details) {
          const movieDetails = await fetchMovieDetails(movieId);
          dispatch(setDetails({ movieId, details: movieDetails }))  
        }
          
        if (!movieData?.credits) {
          const creditDetails = await fetchMovieCredits(movieId);
          dispatch(setCredits({ movieId, credits: creditDetails ?? null }))
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
  
          // Real-time Firebase listener
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
          return unsubscribeFirestore;

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

    const reviews = [...(movieData?.firebaseReviews ?? []), ...(movieData?.tmdbReviews ?? [])];

    if (!movieData || movieData.loading) {
      return <ActivityIndicator size="large" color="#002335" style={{ marginVertical: 50 }} />;
    }
    if (movieData.error) {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{movieData.error}</Text>
      </ScrollView>
    );
  }


  
  return (
    <ScrollView style={styles.container}>

       {movieData.credits && (
        <>
          <TopSection movie={movieData.details} credits={movieData.credits} />
          <ReviewSection reviews={reviews} movieId={movieId} title={title} image={image}/>
        </>
       )
       }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 16,
    backgroundColor: '#002335',
  },

});

export default MovieScreen;
