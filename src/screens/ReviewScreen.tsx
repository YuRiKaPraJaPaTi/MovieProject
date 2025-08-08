import { StyleSheet, Text, TextInput,TouchableOpacity,View, Image } from 'react-native'
import React, { useState } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import MyButton from '../components/MyButton';
import auth from '@react-native-firebase/auth';
import RatingRow from '../components/RatingRow';
import firestore from "@react-native-firebase/firestore";
import { addReview } from '../firebase/ReviewService';
import { useNavigation } from '@react-navigation/native';



type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'Review'>;


const ReviewScreen = () => {
  const route = useRoute<ReviewScreenRouteProp>();
  const navigation = useNavigation();

  const { movieId } = route.params;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [canEditRating, setCanEditRating] = useState(true);

  const handleSubmitReview = async () => {
    if (!comment && rating === 0) return;

    try {
      await addReview(movieId, comment, rating)
    
      setComment('');
      setCanEditRating(false);
      navigation.goBack();
      
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  return (
    <View style={styles.container}>
      
      <View style={styles.likerow}>
        <RatingRow rating={rating} setRating={setRating} />
      
            <TouchableOpacity>
              <Text style={styles.favourite}>Add to Favourite</Text>
              <Image
                source={require('../assets/Like.png')}
                style={styles.likeIcon}
              />
            </TouchableOpacity>
      </View>

      <Text style={styles.label}>Review</Text>
      <TextInput
        placeholder="Write your review..."
        style={styles.input}
        value={comment}
        multiline
        onChangeText={setComment}
      />

      <MyButton label='Publish' onPress={handleSubmitReview} />
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#002335"
  },

  starsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 32,
    color: '#FFCA45',
    marginRight: 8,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF50',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    height: 200,
    color: '#000',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFCA45',
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  likerow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  likeIcon: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
  },
  favourite: {
    color: '#FFFFFF',
    gap: 10,
  }
})