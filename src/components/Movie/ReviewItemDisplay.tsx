import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StarRatingDisplay from './StarRatingDisplay';
import { Review } from '../../types/types';

type ReviewItemProps = {
  review: Review;
}

const ReviewItemDisplay = ({ review }: ReviewItemProps) => {
  return (
    <View style={styles.reviewBox}>
      <Text style={styles.reviewer}>
            Review by {''}
            <Text style={{color: '#FFCA45'}}>{review.author}</Text>

      </Text>
      <StarRatingDisplay rating={review.rating} />
      <Text style={styles.reviewContent}>{review.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    marginBottom: 16,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF50',
    borderRadius: 12,
    padding: 8
  },
  reviewer: {
    fontWeight: 'bold',
    color: '#FFFFFF90',
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

export default ReviewItemDisplay;
