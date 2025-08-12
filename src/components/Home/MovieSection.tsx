import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MovieCard from './MovieCard';
import { fetchMovies } from '../../TMDBapi/TMDB';
import Pagination from './Pagination';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Movie } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setMovies, setPage } from '../../redux/slices/movieSlice';


interface Props {
  title: string;
  endpoint: string;
}

const MovieSection = ({ title, endpoint }: Props) => {

  const dispatch = useAppDispatch()
  const category = useAppSelector(
    (state) => state.movies.categories[endpoint] || { movies: [], page: 1 }
  );

  let sectionType: 'Now Playing' | 'Upcoming' | 'Top Rated' | 'Popular' | 'Trending' | 'Favorite' | 'Watchlist' = 'Now Playing';
  if (title === 'Upcoming') sectionType = 'Upcoming';
  if (title === 'Top Rated') sectionType = 'Top Rated';
  if (title === 'Trending') sectionType = 'Trending';
  if (title === 'Favorites') sectionType = 'Favorite';
  if (title === 'Recently Watched') sectionType = 'Watchlist';


  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies(endpoint, category.page)
      dispatch(setMovies({endpoint, movies}))
    };
    getMovies();
  }, [endpoint, category.page, dispatch]);

  const onPageChange = (newPage: number) => {
    dispatch(setPage({ endpoint, page: newPage }));
  };

  return (
    <View style={styles.section}>

      <View style={styles.top}>
        <Text style={styles.sectionTitle}>{title}</Text>
          {title !== 'Trending' && <Pagination page={category.page} setPage={onPageChange} />}
      </View>

      <FlatList
        data={category.movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        

          <MovieCard 
            image={item.image} 
            id={item.id.toString()}
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
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  unicode: {
    color: '#FFCA45',
    fontSize: 20,
  },
  page: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
});
