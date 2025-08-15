import { StyleSheet, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../navigation/types';
import MovieHeader from '../components/Review/MovieHeader';
import FavoriteButton from '../components/Review/FavouriteButton';
import ReviewForm from '../components/Review/ReviewForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ReviewScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Review'>;

const ReviewScreen = ({ navigation, route}: ReviewScreenRouteProp) => {

  const { movieId, title, image } = route.params;

  return (
    <View style={styles.container}>
      <MovieHeader title={title} image={image} onGoBack={() => navigation.goBack()} />
      <View style={styles.likerow}>
        <FavoriteButton movieId={movieId} navigation={navigation} />
      </View>
      <ReviewForm movieId={movieId} navigation={navigation} />
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#002335"
  },
  likerow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 16,
  },
});











