import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MovieCard from '../../components/Home/MovieCard';
import { fetchFromAPI } from '../../TMDBapi/axiosInstance';
import MovieSection from '../../components/Home/MovieSection';
import Icon from 'react-native-vector-icons/FontAwesome';


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

  const handleSearch = async () => {
      const data = await fetchFromAPI("search", { query });
      if (data?.results) setResults(data.results);
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (text.trim() === '') {
      setResults([]); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <TextInput
        placeholder='Search movie...'
        style={styles.searchBar}
        value={query}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSearch}
      />
      <Icon name="search" size={24} color="#FFFFFF90" style={styles.searchIcon} /> 
      </View>
      <ScrollView>
        {results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.title}
                rating={item.vote_average}
                releaseDate={item.release_date}
                section="Search" 
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resultsContainer} 
            ListHeaderComponent={<Text style={styles.resultsTitle}>Results</Text>}
          />
        )}

        
        <MovieSection title="Trending" endpoint="trending" />

        <View style={styles.browse}>
          <Image source={require('../../assets/browseCircle.png')} />
          <Text style={styles.btext}>BROWSE ALL MOVIES</Text>
          <Image source={require('../../assets/Rarrow.png')} />
        </View>
        
        <MovieSection title='Upcoming' endpoint='upcoming'/>
      </ScrollView>
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
  resultsTitle: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
   resultsContainer: {
    paddingBottom: 20, 
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
