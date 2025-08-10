import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { fetchMovies } from '../../TMDBapi/TMDB';
import MovieCard from '../../components/Home/MovieCard';
import { useFocusEffect } from '@react-navigation/native';

const WishlistScreen = () => {
  const [favourite, setFavourite] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourite = async () => {
      setLoading(true);
      try {
        const favouriteMovies = await fetchMovies("favorite")
        setFavourite(favouriteMovies)
      } catch (error) {
        console.log("error fetchong favourite movies", error)
        setFavourite([])
      }
      
      setLoading(false)
    }

    useFocusEffect(
    useCallback(() => {
      fetchFavourite();
    }, [])
  );
  return (
    <View style={{flex:1, padding: 10, backgroundColor:'#002335'}}>
    <FlatList
      data={favourite}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
      
          <MovieCard image={item.image} id={item.id} title={item.title} section='Favourite' />
      
      )}
      numColumns={3}
      columnWrapperStyle={styles.row}
      
    />

    </View>
  )
}

export default WishlistScreen

const styles = StyleSheet.create({
   row: {
    marginBottom: 16,
  },
  card: {
    alignItems: "center",
  },
})