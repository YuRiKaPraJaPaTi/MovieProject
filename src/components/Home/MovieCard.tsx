import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface MovieCardProps {
      image: any;
      title: string;
      rating?: number;
      releaseDate?: string;
      section: 'Now Playing' | 'Upcoming' | 'Top Rated' | 'Popular'
}

const MovieCard = ({ image, title, rating, releaseDate, section }: MovieCardProps) => {
  // console.log("image is:", image)
      return (
      <View style={styles.card}>
            <FastImage source={{uri: image}} style={styles.image} />
            
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>

            {section === 'Upcoming' && releaseDate && (
                  <Text style={styles.metaText}>📅 {releaseDate}</Text>
            )}

            {section === 'Top Rated' && rating !== undefined && (
                  <Text style={styles.metaText}>⭐ {rating.toFixed(1)}</Text>
            )}
            
      </View>
      );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    marginRight: 12,
    width: 120,
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
