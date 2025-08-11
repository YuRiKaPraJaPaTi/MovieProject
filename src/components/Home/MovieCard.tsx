import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 12;
const numColumns = 3;

const cardWidth = (screenWidth - 40 - cardMargin * (numColumns - 1)) / numColumns;

interface MovieCardProps {
      image: string;
      id: string;
      title: string;
      rating?: number;
      releaseDate?: string;
      section?: 'Now Playing' | 'Upcoming' | 'Top Rated' | 'Popular' | 'Trending' | 'Search' | 'Favorite' | 'Watchlist'
}

type MovieScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Movie'>;

const MovieCard = ({ id, image, title, rating, releaseDate, section }: MovieCardProps) => {
   const navigation = useNavigation<MovieScreenNavigationProp>();
  // console.log("image is:", image)
  
      return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('Movie', { movieId: id, title: title, image: image })}>
            <FastImage 
              source={{uri: image}}
              style={styles.image} 
            />

            {section !== 'Favorite' && (
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            )}
            
            {section === 'Upcoming' && releaseDate && (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
                  <Text style={styles.metaText}>📅 {releaseDate}</Text>
                  <TouchableOpacity>
                  <Text style={styles.metaText}> 🔖 </Text>
                </TouchableOpacity>
              </View>
            )}
            
            {(section === 'Top Rated' || section === 'Search') && rating !== undefined && (
                  <Text style={styles.metaText}>⭐ {rating.toFixed(1)}</Text>
            )}
            </TouchableOpacity>  
      </View>
      );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    marginRight: cardMargin,
    width: cardWidth,
    marginBottom: 8,
  },
  image: {
    width: cardWidth,
    height: cardWidth*1.5,
    borderRadius: 8,
  },
  title: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  metaText: {
    color: '#E0E0E0',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },

});
