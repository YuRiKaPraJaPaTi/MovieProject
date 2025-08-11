import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/AuthContext';
import MovieSection from '../../components/Home/MovieSection';

const ProfileScreen = () => {
  const {user} = useAuth()
  const email = user?.email ?? 'No Email';
  const initial = email.charAt(0).toUpperCase();

  const handleSignOut = useCallback(async () => {
    const auth = getAuth();
      try {
        await signOut(auth);
          Alert.alert("Signed out", "You have been signed out successfully.");
                  
          } catch (error) {
            Alert.alert("Error", "Something went wrong while signing out.");
            console.error("Sign-out error:", error);
          }
      }, []);

  return (
        
    <View style={{flex:1,padding:10, backgroundColor:'#002335'}}>

      <View style={styles.TopContainer}>
        <View style={styles.topImageContainer}>
          <Image 
            source={require('../../assets/movies_images/Batman.jpg')}
            style={styles.fullImage}
            />
            <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
              <Icon name="sign-out" size={40} color="#FFCA45" />
              <Text style={{color:'#FFCA45'}}>LogOut</Text>
            </TouchableOpacity>
        </View>
            
        {/* <Image 
          source={require('../../assets/movies_images/m1.jpg')}
          style={styles.circleImage}
        /> */}
        <View style={styles.circleImage}>
          <Text style={styles.initial}>{initial}</Text>
        </View>

            
        <View style={styles.detailsWrapper}>
          <View style={styles.personDetails}>
            <Text style={styles.personName}>{initial}</Text>
            
            <Text style={styles.email}>
              <Image source={require('../../assets/Email.png')} />   Email {' '}
              <Text style={styles.directorName}>{user!.email}</Text>
            </Text>
                              
          </View>

        </View>      
      </View>

      <ScrollView>

        <MovieSection title='Favorites' endpoint='favorite'/>

        <MovieSection title='Recently Watched' endpoint='watchlist'/>

      </ScrollView>

    </View>
  )
}

export default ProfileScreen
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  logout: {
    marginRight: 20,
    alignItems: 'flex-end',
    paddingVertical: 16,
    zIndex: 10,
    position: 'absolute',
    top: 4,      
    right: 4,
  },
  TopContainer: {
    backgroundColor: '#FFFFFF60',
    position: 'relative',
    padding: 10,
    paddingBottom: 28,
    borderRadius: 18,
  },
  topImageContainer: {
    height: 150,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  circleImage: {
    position: 'absolute',
    top: 90,
    left: 20,
    width: width * 0.35,
    height: width*0.35,
    borderRadius: (width*0.4)/2,
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsWrapper: {
    marginLeft: width * 0.4, 
    zIndex: 3,
  },
  personDetails: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
  },
  personName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  email: {
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
})