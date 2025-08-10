import React, {  } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import MyButton from '../MyButton';
import ReviewItemDisplay from './ReviewItemDisplay';

type ReviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Movie'>;

interface ReviewSectionProps {
  reviews: Review[];
  movieId: string;
  title: string;
  image: any;
}

interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
  source: 'tmdb' | 'firebase';
}

const ReviewSection = ({reviews, movieId, title, image}: ReviewSectionProps) => {
  const navigation = useNavigation<ReviewScreenNavigationProp>();
  
  return (
    <View>
      <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>

      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12}}>
        <MyButton label='Write a Review' width={150} onPress={() => navigation.navigate('Review', {movieId, title, image})}/>
      </View>

      {reviews.length > 0 ? (
        reviews.map((item) => (
          <ReviewItemDisplay key={item.id} review={item} />
        ))
      ) : (
        <Text style={{color: 'white'}}>No reviews available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 10,
  },

});

export default ReviewSection;
