import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMovies } from '../../TMDBapi/TMDB';
import FastImage from 'react-native-fast-image';
import { HomeTabScreenProps } from '../../navigation/types';

const WishlistScreen = ({navigation}: HomeTabScreenProps<'Wishlist'>) => {
  const [favourite, setFavourite] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchFavourite();
  }, [])
  return (
    <View style={{flex:1, padding: 10, backgroundColor:'#002335'}}>
    <FlatList
      data={favourite}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('Movie', { movieId: item.id, title: item.title, image: item.image })}>
          <FastImage
            source={{ uri: item.image }}
            style={styles.poster}
          />
        </TouchableOpacity>
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
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    flex: 1 / 3, 
    alignItems: "center",
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
})