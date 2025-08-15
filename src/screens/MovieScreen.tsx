import React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import TopSection from '../components/Movie/TopSection';
import ReviewSection from '../components/Movie/ReviewSection';
import { useMovieDetails } from '../hook/useMovieDetails';

type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;


const MovieScreen = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movieId, title, image } = route.params;

  const movieData = useMovieDetails(movieId);
              
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
