import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from '../TMDBapi/TMDB';
import TopSection from '../components/Movie/TopSection';
import ReviewSection from '../components/Movie/ReviewSection';

type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;

const MovieScreen = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movieId } = route.params;

  

  return (
    <ScrollView style={styles.container}>

      <TopSection movieId={movieId}/>

      

      <ReviewSection movieId={movieId}/>

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
