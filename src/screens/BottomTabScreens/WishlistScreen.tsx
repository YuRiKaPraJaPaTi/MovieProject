import { FlatList, StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MovieCard from '../../components/Home/MovieCard';
import { RootState } from '../../redux/store';
import { fetchMovies } from '../../TMDBapi/TMDB';

const WishlistScreen = () => {
  const favoriteIds = useSelector((state: RootState) => state.favorite.favoriteIds);
  const movieDetailsState = useSelector((state: RootState) => state.movieDetails.movies);

  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to fetch movie details from IDs either from Redux or API fallback
  const fetchMoviesByIds = async (ids: string[]) => {
    
    const cachedMovies = ids
      .map(id => movieDetailsState[id]?.details)
      .filter(Boolean); 

    if (cachedMovies.length === ids.length) {
      
      return cachedMovies;
    } else {
      
      const missingIds = ids.filter(id => !movieDetailsState[id]?.details);

      
      const fetchedMovies = await Promise.all(
        missingIds.map(id => fetchMovies(id))
      );

      
      return [...cachedMovies, ...fetchedMovies.flat()];
    }
  };

  const fetchFavourite = async () => {

    setLoading(true);
    try {
      if (favoriteIds.length > 0) {
        
        const movies = await fetchMoviesByIds(favoriteIds);
        setFavoriteMovies(movies);
      } else {
        
        const favouriteMovies = await fetchMovies('favorite');
        setFavoriteMovies(favouriteMovies);
      }
    } catch (error) {
      console.log('Error fetching favorite movies:', error);
      setFavoriteMovies([]);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavourite();
    }, [favoriteIds]) // refetch when favoriteIds change
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#002335' }}>
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard image={item.image} id={item.id} title={item.title} section="Favorite" />
        )}
        numColumns={3}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          !loading ? <View><Text style={{color:'white', textAlign:'center'}}>No favorites found.</Text></View> : null
        }
      />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
  },
  card: {
    alignItems: 'center',
  },
});
