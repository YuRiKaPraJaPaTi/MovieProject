import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MovieCard from './MovieCard';

interface MovieItem {
  id: string;
  title: string;
  image: any;
  rating?: number;
  releaseDate?: string;
}

interface Props {
  title: string;
  data: MovieItem[];
}

const MovieSection = ({ title, data }: Props) => {
  let sectionType: 'New Releases' | 'Upcoming' | 'Ranked' = 'New Releases';
  if (title === 'Upcoming') sectionType = 'Upcoming';
  if (title === 'Ranked') sectionType = 'Ranked';
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard 
            image={item.image} 
            title={item.title} 
            rating={item.rating}
            releaseDate={item.releaseDate}
            section={sectionType}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: 12,
  },
});
