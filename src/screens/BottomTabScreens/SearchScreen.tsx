import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MovieSection from '../../components/Home/MovieSection'

const SearchScreen = () => {

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Search movie...'
          // onChangeText={(search) => this.setState({search})}
          style={styles.searchBar}
        />
        <MovieSection title="Trending" endpoint="trending" />
        

      
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002335',
    padding: 20,
  },
  searchBar: {
    fontSize: 24,
    paddingHorizontal: 16,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: '#C4C4C499',
    borderRadius: 20,
  },
})