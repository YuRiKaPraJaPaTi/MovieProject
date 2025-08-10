import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchMovieReviews } from '../../TMDBapi/TMDB';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import MyButton from '../MyButton';
import { collection, getDocs, query, where } from '@react-native-firebase/firestore';
import { fetchFirestoreReviews, listenToFirestoreReviews } from '../../firebase/ReviewService';
import ReviewItemDisplay from './ReviewItemDisplay';

type ReviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Movie'>;

interface ReviewSectionProps {
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

const ReviewSection = ({movieId, title, image}: ReviewSectionProps) => {
  const navigation = useNavigation<ReviewScreenNavigationProp>();
  const [tmdbReviews, setTmdbReviews] = useState<Review[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  let unsubscribeFirestore: () => void;

  const loadReviews = async () => {
    setLoading(true);
    try {
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

  loadReviews();

  return () => {
    if (unsubscribeFirestore) unsubscribeFirestore();
  };
}, [movieId]);

// inside ReviewSection
if (loading) {
  return <ActivityIndicator size="large" color="white" style={{ marginVertical: 20 }} />;
}


  return (
    <View>
      <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>

      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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
