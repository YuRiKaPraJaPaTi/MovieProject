import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MovieCard from './MovieCard';
import { fetchMovies } from '../../TMDBapi/TMDB';
import Pagination from './Pagination';

interface MovieItem {
  id: string;
  title: string;
  image: any;
  rating?: number;
  releaseDate?: string;
}

interface Props {
  title: string;
  category: string;
}

const MovieSection = ({ title, category }: Props) => {
  let sectionType: 'Now Playing' | 'Upcoming' | 'Top Rated' | 'Popular' = 'Now Playing';
  if (title === 'Upcoming') sectionType = 'Upcoming';
  if (title === 'Top Rated') sectionType = 'Top Rated';

  const [data, setData] = useState<MovieItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null); // Reset error state on new request

      try {
        // Fetch the movies for the given category
        const movies = await fetchMovies(category, page);

        // After getting the movies, update the state
        setData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies");
        setData([]);
      }

      setLoading(false);
    };

    getMovies();
  }, [category, page]);

  return (
    <View style={styles.section}>

      <View style={styles.top}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pagination page={page} setPage={setPage}/>
      </View>

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
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: '#FFFFFF',
  },
  unicode: {
    color: '#FFCA45',
    fontSize: 20,
  },
  page: {
    color: '#FFFFFF',
    fontSize: 20,
  }
});
