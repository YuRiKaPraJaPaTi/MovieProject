import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../../components/Home/HomeHeader'
import MovieSection from '../../components/Home/MovieSection';
import { fetchNowPlayingMovies } from '../../TMDBapi/TMDB';

export const dummyMovieData = {
  // newReleases: [
  //   { id: '1', title: 'The Boy and the Heron', image: require('../../assets/movies_images/m1.jpg') },
  //   { id: '2', title: 'Inside Out 2', image: require('../../assets/movies_images/m2.jpg') },
  //   { id: '3', title: 'Furiosa: A Mad Max Saga', image: require('../../assets/movies_images/m3.jpg') },
  // ],
  upcoming: [
    { id: '4', title: 'Deadpool & Wolverine', image: require('../../assets/movies_images/m4.jpg'), releaseDate: '2024-07-26', },
    { id: '5', title: 'Despicable Me 4', image: require('../../assets/movies_images/m5.jpg'), releaseDate: '2024-07-03'},
    { id: '6', title: 'A Quiet Place: Day One', image: require('../../assets/movies_images/m6.jpg'), releaseDate: '2024-06-28', },
  ],
  ranked: [
    { id: '7', title: 'The Godfather', image: require('../../assets/movies_images/m7.jpg'), rating: 9.2 },
    { id: '8', title: 'Parasite', image: require('../../assets/movies_images/m8.jpg'), rating: 8.6 },
    { id: '9', title: 'Spider-Man: Across the Spider-Verse', image: require('../../assets/movies_images/m9.jpg'), rating: 8.9 },
  ],
};


const HomeScreen = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedMovies = await fetchNowPlayingMovies();
      setNowPlaying(fetchedMovies); // Update state with fetched data
      // You can use a similar method to fetch upcoming and ranked sections if needed
    };

    getData();
  }, []);
  return (
    <View style={{flex:1, backgroundColor:"#002335",padding:20}}>
      <HomeHeader />
      <ScrollView>
        <MovieSection title="Now Playing" data={nowPlaying} />
        {/* <MovieSection title="Upcoming" data={dummyMovieData.upcoming} />
        <MovieSection title="Ranked" data={dummyMovieData.ranked} /> */}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  
})