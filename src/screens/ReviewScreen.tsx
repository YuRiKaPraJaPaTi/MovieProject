import { Alert, Image, StyleSheet, Text, TextInput,TouchableOpacity,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import MyButton from '../components/MyButton';
import RatingRow from '../components/RatingRow';
import { addReview } from '../firebase/ReviewService';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import api from '../TMDBapi/axiosInstance';
import { addToFavourite } from '../TMDBapi/addFavourite';
import { ToastAndroid } from 'react-native';



type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'Review'>;


const ReviewScreen = () => {
  const route = useRoute<ReviewScreenRouteProp>();
  const navigation = useNavigation();

  const { movieId, title, image } = route.params;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [canEditRating, setCanEditRating] = useState(true);

  const [isFavorite, setIsFavorite] = useState(false);


  const handleToggleFavorite = async () => {
    const newStatus = !isFavorite;
    try {
      const result = await addToFavourite(newStatus, movieId);
      if (result.success) {
        setIsFavorite(newStatus);
        ToastAndroid.show(
          newStatus ? 'Added to favourites!' : 'Removed from favourites!', 
          ToastAndroid.SHORT);
      } else {
        Alert.alert('Failed, Try again');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not update favourite status.');
    }
  };

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
      <View style={{flexDirection: 'row'}}>
        <View style={{ flex: 7, paddingRight: 4 }}>
          <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}><Image source={require('../assets/Larrow.png')}/></TouchableOpacity>
          <Text
            style={styles.title}
            numberOfLines={3} 
            ellipsizeMode="tail" 
          >
            {title}
          </Text>
        </View>
        <View style={{}}>
          <FastImage 
            source={{ uri: image }} 
            style={styles.movieImage} 
          />
        </View>
      </View>
      
      <View style={styles.likerow}>
        <RatingRow rating={rating} setRating={setRating} />
      
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.favourite}>Add to Favourite</Text>
              <TouchableOpacity onPress={handleToggleFavorite}>
                <Image
                  source={require('../assets/Like.png')}
                  style={[styles.likeIcon, { tintColor: isFavorite ? 'yellow' : 'gray' },]}
                />
              </TouchableOpacity>
            </View>
      </View>

      
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
   movieImage: {
    width: 160,
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
    
  },
  goback: {
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginTop: 24
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
    marginTop: 10,
    marginBottom: 28,
    height: 250,
    color: '#FFFFFFBHG',
    textAlignVertical: 'top',
    fontSize: 24,
  
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
    resizeMode: 'contain',
  },
  favourite: {
    color: '#FFFFFF',
    gap: 10,
    fontSize: 16,
  }
})