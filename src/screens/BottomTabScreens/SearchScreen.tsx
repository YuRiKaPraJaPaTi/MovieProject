import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/Home/MovieCard';
import { fetchFromAPI } from '../../TMDBapi/axiosInstance';
import MovieSection from '../../components/Home/MovieSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDebounce } from '../../hook/useDebounce';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const debouncedQuery = useDebounce(query, 500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      const data = await fetchFromAPI('search', { query: debouncedQuery });
      if (data?.results) setResults(data.results);
      else setResults([]);
      setLoading(false);
    };

    fetchResults();
  }, [debouncedQuery]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Search movie...'
          style={styles.searchBar}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="times-circle" size={24} color="#FFFFFF90" />
          </TouchableOpacity>
        ) : (
          <Icon name="search" size={24} color="#FFFFFF90" style={styles.searchIcon}/> 
        )}
        
      </View>
      
      {debouncedQuery.trim().length > 0 ? (
        <>
          {loading ? (
            <Text style={styles.statusText}>Loading...</Text>
          ) : results.length === 0 ? (
            <Text style={styles.statusText}>No Results Found</Text>
          ) : (
            <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard
                id={item.id.toString()}
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.title}
                rating={item.vote_average}
                releaseDate={item.release_date}
                section="Search" 
              />
            )}
            numColumns={3} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resultsContainer} 
            ListHeaderComponent={<Text style={styles.resultsTitle}>Results</Text>}
          />
          )}
        </>
      ) : (

      <ScrollView>

        <MovieSection title="Trending" endpoint="trending" />

        <View style={styles.browse}>
          <Image source={require('../../assets/browseCircle.png')} />
          <Text style={styles.btext}>BROWSE ALL MOVIES</Text>
          <Image source={require('../../assets/Rarrow.png')} />
        </View>
        
        <MovieSection title='Upcoming' endpoint='upcoming'/>
      </ScrollView>
        )}
    </View>

    
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
    padding: 20,
  },
  searchContainer: {
    position: 'relative',
  },
  searchBar: {
    fontSize: 20,
    height: 50,
    paddingLeft: 20,
    backgroundColor: '#C4C4C499',
    borderRadius: 16,
    marginBottom: 40,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
   clearButton: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  resultsTitle: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
   resultsContainer: {
    paddingBottom: 20, 
    
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  browse: {
    backgroundColor: "#FFFFFF80",
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btext: {
    fontSize: 24,
    color: "#FFFFFF"
  }
});
