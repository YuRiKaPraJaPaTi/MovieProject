import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import TopSection from '../components/Movie/TopSection';
import ReviewSection from '../components/Movie/ReviewSection';
import { listenToFirestoreReviews } from '../firebase/ReviewService';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieReviews } from '../TMDBapi/TMDB';
import { Credits, Movie, Review } from '../types/types';


type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;


const MovieScreen = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movieId, title, image } = route.params;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credits | undefined>(undefined);
  const [tmdbReviews, setTmdbReviews] = useState<Review[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      let unsubscribeFirestore: () => void;
    
      const fetchData = async () => {
        setLoading(true);
        try {
          const movieDetails = await fetchMovieDetails(movieId);
          const creditDetails = await fetchMovieCredits(movieId);
          setMovie(movieDetails);
          setCredits(creditDetails);
          const tmdbReviews = await fetchMovieReviews(movieId);
          const formattedTmdb = tmdbReviews.map((item: any) => ({
            id: item.id,
            author: item.author,
            comment: item.content,
            rating: item.author_details.rating,
            source: 'tmdb' as const,
          }));
          setTmdbReviews(formattedTmdb);
    
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
    
            setReviews([...formattedFirebase, ...formattedTmdb]);
            } else {
              setReviews(formattedTmdb);
            }
            setLoading(false);
          });
    
        } catch (error) {
          console.error('Failed to load reviews:', error);
          setLoading(false);
        }
      };
    
      fetchData();
    
      return () => {
        if (unsubscribeFirestore) unsubscribeFirestore();
      };
    }, [movieId]);
  
  if (loading) {
    return <ActivityIndicator size="large" color="#002335" style={{ marginVertical: 50 }} />;
  }
  
  return (
    <ScrollView style={styles.container}>
       
       {movie && credits && <TopSection movie={movie} credits={credits} />}

      <ReviewSection reviews={reviews} movieId={movieId} title={title} image={image}/>

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
