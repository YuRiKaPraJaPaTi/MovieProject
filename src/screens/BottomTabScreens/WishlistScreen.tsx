import { FlatList, StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MovieCard from '../../components/Home/MovieCard';
import { RootState } from '../../redux/store';
import { fetchMovieDetails, fetchMovies } from '../../TMDBapi/TMDB';

const WishlistScreen = () => {
  const favoriteIds = useSelector((state: RootState) => state.favorite.favoriteIds);
  const movieDetailsState = useSelector((state: RootState) => state.movieDetails.movies);

  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   useFocusEffect(
    useCallback(() => {
      let isActive = true; 

      const fetchFavourite = async () => {
        setLoading(true);

        try {
          // Get cached movies from Redux slice
          const cachedMovies = favoriteIds
            .map(id => movieDetailsState[id]?.details)
            .filter(Boolean);

          // Identify missing IDs
          const missingIds = favoriteIds.filter(id => !movieDetailsState[id]?.details);

          // Fetch missing movie details
          let fetchedMovies: any[] = [];
          if (missingIds.length > 0) {
            fetchedMovies = await Promise.all(
              missingIds.map(id => fetchMovieDetails(id))
            );
          }

          // Update state if component is still focused
          if (isActive) {
            setFavoriteMovies([...cachedMovies, ...fetchedMovies]);
          }

        } catch (error) {
          console.log('Error fetching favorite movies:', error);
          if (isActive) setFavoriteMovies([]);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchFavourite();

      return () => {
        isActive = false; // prevent state updates on unmounted screen
      };
    }, [favoriteIds, movieDetailsState])
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
