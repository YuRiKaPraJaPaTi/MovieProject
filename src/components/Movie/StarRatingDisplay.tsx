import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRatingDisplay = ({ rating}: {rating:number}) => {
      const maxRating = 10
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(rating)) {
      // full star
      stars.push(
        <Icon key={i} name="star" size={20} color="#FFD700" style={styles.star} />
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // half star
      stars.push(
        <Icon key={i} name="star-half-full" size={20} color="#FFD700" style={styles.star} />
      );
    } else {
      // empty star
      stars.push(
        <Icon key={i} name="star-o" size={20} color="#FFD700" style={styles.star} />
      );
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 1,
  },
});

export default StarRatingDisplay;

