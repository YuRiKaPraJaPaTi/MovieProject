import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import TopSection from '../components/Movie/TopSection';
import ReviewSection from '../components/Movie/ReviewSection';

type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;

const MovieScreen = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movieId, title, image } = route.params;
  

  

  return (
    <ScrollView style={styles.container}>

      <TopSection movieId={movieId}/>

      <ReviewSection movieId={movieId} title={title} image={image}/>

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
