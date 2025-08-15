import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleFavorite } from '../../redux/slices/favoriteSlice';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../utils/toast/toastHelper';


interface Props {
  movieId: string;
  navigation: any;
}

const FavoriteButton = ({ movieId, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(state => state.favorite.favoriteIds);
  const isFavorite = favoriteIds.includes(movieId.toString());

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ movieId: movieId.toString(), isFavorite: !isFavorite }))
      .unwrap()
      .then(() => {
        !isFavorite
          ? showSuccessToast('Added to favourites!')
          : showInfoToast('Removed from favourites!');
        setTimeout(() => {
          navigation.navigate('Tabs', { screen: 'Wishlist' });
        }, 1000);
      })
      .catch(() => {
        dispatch(toggleFavorite({ movieId: movieId.toString(), isFavorite: isFavorite }));
        showErrorToast('Failed', 'Please try again');
      });
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Text style={styles.favourite}>Add to Favourite</Text>
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Image
          source={require('../../assets/Like.png')}
          style={[styles.likeIcon, { tintColor: isFavorite ? 'yellow' : 'gray' }]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  favourite: { color: '#FFFFFF', gap: 10, fontSize: 16 },
  likeIcon: { width: 30, height: 30, marginLeft: 'auto', resizeMode: 'contain' },
});
