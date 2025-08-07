import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchMovieReviews } from '../../TMDBapi/TMDB';


interface ReviewSectionProps {
  movieId: string;
}

const ReviewSection = ({movieId}: ReviewSectionProps) => {
      const [reviews, setReviews] = useState<any[]>([]);
        const [loading, setLoading] = useState(true);
      useEffect(() => {
          const fetchData = async () => {
            
            const reviewDetails = await fetchMovieReviews(movieId);
      
            setReviews(reviewDetails);
            
          };
      
          fetchData();
        }, [movieId]);
  return (
    <View>
      <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
      {reviews.length > 0 ? (
        reviews.map((item) => (
          <View key={item.id} style={styles.reviewBox}>
            <Text style={styles.reviewer}>{item.author}</Text>
            <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
            <Text style={styles.reviewContent}>{item.content}</Text>
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
