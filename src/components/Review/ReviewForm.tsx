import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { addReview } from '../../firebase/ReviewService';
import { showErrorToast, showSuccessToast } from '../../utils/toast/toastHelper';
import RatingRow from './RatingRow';
import MyButton from '../MyButton';


interface Props {
  movieId: string;
  navigation: any;
}

const ReviewForm = ({ movieId, navigation }: Props) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitReview = async () => {
    if (!comment && rating === 0) return;

    try {
      await addReview(movieId, comment, rating);
      setComment('');
      setRating(0);
      navigation.goBack();
      showSuccessToast('Review added!');
    } catch (error) {
      console.error('Error submitting review:', error);
      showErrorToast('Failed to add review');
    }
  };

  return (
    <View>
      <RatingRow rating={rating} setRating={setRating} />
      <TextInput
        placeholder="Write your review..."
        style={styles.input}
        value={comment}
        multiline
        onChangeText={setComment}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <MyButton label="Publish" width={100} onPress={handleSubmitReview} />
      </View>
    </View>
  );
};

export default ReviewForm;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF50',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 28,
    height: 250,
    color: '#FFFFFFBHG',
    textAlignVertical: 'top',
    fontSize: 24,
  },
});
