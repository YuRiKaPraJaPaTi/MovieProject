import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchMovieReviews } from '../../TMDBapi/TMDB';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import MyButton from '../MyButton';
import { collection, getDocs, query, where } from '@react-native-firebase/firestore';
import { fetchFirestoreReviews, listenToFirestoreReviews } from '../../firebase/ReviewService';

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
        rating: item.rating ?? 0,
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

  return (
    <View>
      <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>

      <MyButton label='Write a Review' onPress={() => navigation.navigate('Review', {movieId, title, image})}/>

      {reviews.length > 0 ? (
        reviews.map((item) => (
          <View key={item.id} style={styles.reviewBox}>
            <Text style={styles.reviewer}>{item.author}</Text>
            <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
            <Text style={styles.reviewContent}>{item.comment}</Text>
          </View>
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
  reviewBox: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 10,
  },
  reviewer: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  reviewContent: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
});

export default ReviewSection;
