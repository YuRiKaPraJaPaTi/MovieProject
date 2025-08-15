import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MovieCard from '../Home/MovieCard';
import { fetchMovieDetails } from '../../TMDBapi/TMDB';

const WatchlistSection = () => {
  const watchlistIds = useSelector((state: RootState) => state.watchlist.watchlistIds);
  const movieDetailsState = useSelector((state: RootState) => state.movieDetails.movies);

  const [watchlistMovies, setWatchlistMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchWatchlist = async () => {
      setLoading(true);

      // Cached movies
      const cachedMovies = watchlistIds
        .map(id => movieDetailsState[id]?.details)
        .filter(Boolean);

      // Missing movies
      const missingIds = watchlistIds.filter(id => !movieDetailsState[id]?.details);

      let fetchedMovies: any[] = [];
      if (missingIds.length > 0) {
        fetchedMovies = await Promise.all(missingIds.map(id => fetchMovieDetails(id)));
      }

      if (isActive) {
        setWatchlistMovies([...cachedMovies, ...fetchedMovies]);
        setLoading(false);
      }
    };

    fetchWatchlist();

    return () => { isActive = false; };
  }, [watchlistIds, movieDetailsState]);

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionTitle}>Recently Watched</Text>

      {watchlistMovies.length === 0 && !loading ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No movies in your watchlist.</Text>
        </View>
      ) : (
        <FlatList
          data={watchlistMovies}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              image={item.image}
              id={item.id.toString()}
              title={item.title}
              rating={item.rating ?? 0}
              releaseDate={item.releaseDate ?? ''}
              section="Watchlist"
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default WatchlistSection;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginVertical: 10,
  },
  empty: { padding: 20, alignItems: 'center' },
  emptyText: { color: 'white', textAlign: 'center' },
});
