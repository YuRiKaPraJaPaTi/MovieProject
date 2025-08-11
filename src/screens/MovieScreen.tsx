import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
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
  const {movie, credits, tmdbReviews, firebaseReviews, loading, error} = useAppSelector(state => state.movieDetails)


  
    useEffect(() => {
      dispatch(setLoading(true))
      

      let unsubscribeFirestore: () => void;
    
      const fetchData = async () => {
        try {
          const movieDetails = await fetchMovieDetails(movieId);
          dispatch(setDetails(movieDetails))

          const creditDetails = await fetchMovieCredits(movieId);
          dispatch(setCredits(creditDetails ?? null))
          
          const tmdbReviews = await fetchMovieReviews(movieId);
          const formattedTmdb = tmdbReviews.map((item: any) => ({
            id: item.id,
            author: item.author,
            comment: item.content,
            rating: item.author_details.rating,
            source: 'tmdb' as const,
          }));
          dispatch(setTmdbReviews(formattedTmdb));
    
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
    
            dispatch(setFirebaseReviews(formattedFirebase));

            } else {
              dispatch(setFirebaseReviews([]));
            }
            dispatch(setLoading(false));
        
          });
          return unsubscribeFirestore;

        } catch (error) {
          dispatch(setError('Failed to load movie details'));
          dispatch(setLoading(false));
        }
      };
    
      fetchData();
    
      return () => {
        if (unsubscribeFirestore) unsubscribeFirestore();
      };
    }, [dispatch, movieId]);

    const reviews = [...firebaseReviews, ...tmdbReviews];

    if (loading) {
      return <ActivityIndicator size="large" color="#002335" style={{ marginVertical: 50 }} />;
    }

  
  return (
    <ScrollView style={styles.container}>

       {credits && (
        <>
          <TopSection movie={movie} credits={credits} />
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
