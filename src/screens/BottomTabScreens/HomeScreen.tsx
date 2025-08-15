import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import HomeHeader from '../../components/Home/HomeHeader'
import MovieSection from '../../components/Home/MovieSection';

const HomeScreen = () => {

  return (
    <View style={{flex:1, backgroundColor:"#002335",padding:20}}>
      
      
      <ScrollView>

        <HomeHeader />

        <MovieSection title="Now Playing" endpoint='now_playing'/>
        <MovieSection title="Upcoming" endpoint="upcoming" />
        <MovieSection title="Top Rated" endpoint="top_rated" />
        <MovieSection title="Popular" endpoint="popular" />
      
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  
})