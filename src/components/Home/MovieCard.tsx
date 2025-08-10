import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

interface MovieCardProps {
      image: string;
      id: string;
      title: string;
      rating?: number;
      releaseDate?: string;
      section?: 'Now Playing' | 'Upcoming' | 'Top Rated' | 'Popular' | 'Trending' | 'Search' | 'Favourite'
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

            {section !== 'Favourite' && (
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
            
            {section === 'Top Rated' && rating !== undefined && (
                  <Text style={styles.metaText}>⭐ {rating.toFixed(1)}</Text>
            )}
            </TouchableOpacity>  
      </View>
      );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    marginRight: 12,
    width: 120,
    marginBottom: 8,
  },
  image: {
    width: 120,
    height: 180,
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
