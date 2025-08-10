import React, {  } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { formatRuntime } from '../../utils/timeUtils';
import ThreeButtonsRow from './ThreeButtonRow';
import { Credits } from '../../screens/MovieScreen';

type  Props = {
    movie: any;
    credits: Credits;
}

const TopSection = ({movie, credits}:Props) => {
  const safeRating = Math.min(Math.max(movie?.rating, 0), 10);
  const percentage = safeRating * 10; 

  return (
  <View>
    <View style={styles.container}>

      <Text style={styles.tagline}>"{movie?.tagline}"</Text>

      <View style={styles.topImageContainer}>
        <Image 
          source={{ uri: movie?.image }}
          style={styles.imageLeft}
        />
      </View>

      <Image 
        source={{ uri: movie?.image }}
        style={styles.imageRight}
      />

      <View style={styles.detailsWrapper}>
        <View style={styles.movieDetails}>

          <Text style={styles.movieName}>{movie.title}</Text>

          <Text style={styles.director}>
              <Image source={require('../../assets/Director.png')} />  Directed by{' '}
              <Text style={styles.directorName}>{credits!.director}</Text>
          </Text>

          <Text style={styles.director}>
              Genere: {' '}
              <Text style={styles.directorName}>{movie?.genres}</Text>
          </Text>
                  
        </View>
      </View>

      <View style={styles.bottomDetails}>
          <Text style={styles.bottomText}><Image source={require('../../assets/Duration.png')}/>  {formatRuntime(movie?.duration)}</Text>
          <Text style={styles.bottomText}><Image source={require('../../assets/Date.png')}/>  {movie?.releaseDate}</Text>
          <Text style={styles.bottomText}><Image source={require('../../assets/Eye.png')}/>  Not Watched</Text>
      </View>
    </View>

    <ThreeButtonsRow />

      <Text style={styles.overview}>{movie?.overview}</Text>

      <Text style={styles.castTitle}>Cast</Text>
      <FlatList
        horizontal
        data={credits!.cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.castItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.profile_path}` }}
              style={styles.profilePic}
          />
          </View>
        )}
      />

      <View style={styles.ratingContainer}>
      <Text style={styles.rating}>Rating: {movie?.rating.toFixed(1)}/10</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
    </View>

    </View>
  
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF60',
    position: 'relative',
    overflow: 'hidden',
    padding: 10,
    borderRadius: 18,
  },
  topImageContainer: {
    height: 150,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageLeft: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imageRight: {
    position: 'absolute',
    top: 70,
    left: 20,
    width: width * 0.3,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  detailsWrapper: {
    marginLeft: width * 0.35, 
    zIndex: 3,
  },
  movieDetails: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
  },
  movieName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  director: {
    fontSize: 16,
    marginTop: 4,
    color: '#FFFFFF75',
  },
  directorName: {
      color: '#FFFFFF',
      fontWeight: 'bold'
  },
  bottomDetails: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  bottomText: {
    fontSize: 16,
    marginRight: 12,
    color: '#FFFFFF75',
  },
  rating: { 
    fontSize: 18, 
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  tagline: { 
    fontSize: 16, 
    color: '#FFFFFF',
    marginBottom: 10, 
    fontStyle: 'italic' 
  },
  genres: { 
    fontSize: 16, 
    marginBottom: 10 ,
    color: '#FFFFFF',

  },
  overview: { 
    fontSize: 16, 
    fontWeight: 400,
    color: '#FFFFFF',
    marginVertical: 10 
  },
  castTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#FFFFFF',
    marginVertical: 10,
  },
   castItem: {
    marginRight: 12,
    alignItems: 'center',
    width: 70,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    backgroundColor: '#FFFFFF60', 
  },
  ratingContainer: {
    marginVertical: 10,
  },
  barBackground: {
    height: 10,
    backgroundColor: '#FFFFFF60',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFCA45',
  },
});

export default TopSection;
