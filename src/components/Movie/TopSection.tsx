import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { fetchMovieCredits, fetchMovieDetails } from '../../TMDBapi/TMDB';

type  Props = {
    movieId: string;
}

interface Credits {
  director: string | null;
  cast: string[];
}

const TopSection = ({movieId}:Props) => {
  const [movie, setMovie] = useState<any>(null);
  const [credits, setCredits] = useState<Credits | undefined>(undefined);

  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const movieDetails = await fetchMovieDetails(movieId);
        const creditDetails = await fetchMovieCredits(movieId);
        
        setMovie(movieDetails);
        setCredits(creditDetails);
        setLoading(false);
      };
  
      fetchData();
    }, [movieId]);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#000" style={{ marginTop: 100 }} />;
    }
  
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
          <Text style={styles.bottomText}><Image source={require('../../assets/Duration.png')}/>  {movie?.duration} min</Text>
          <Text style={styles.bottomText}><Image source={require('../../assets/Date.png')}/>  {movie?.releaseDate}</Text>
          <Text style={styles.bottomText}><Image source={require('../../assets/Eye.png')}/>  Not Watched</Text>
      </View>
    </View>

      
      <Text style={styles.rating}>Rating: {movie?.rating.toFixed(1)}</Text>

      <Text style={styles.overview}>{movie?.overview}</Text>

      <Text style={styles.castTitle}>Cast</Text>
      <Text style={{color: '#FFFFFF',}}>{credits!.cast.join(', ')}</Text>

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
    fontSize: 16, 
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
    color: '#FFFFFF',
    marginVertical: 10 
  },
  castTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#FFFFFF',
    marginVertical: 10 
  },
});

export default TopSection;
