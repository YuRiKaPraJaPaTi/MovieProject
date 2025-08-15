import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen = ({navigation}:Props) => {
  return (
    <View style={styles.container}>
            <Image 
                  source={require('../../assets/Banner.png')}
                  style={styles.banner}
            />
            <Image 
                  source={require('../../assets/LOGO.png')}
                  style={styles.logo}
            />

            <View style={styles.textContainer}>
                  <Text style={styles.text}>"Track films you've watched. Save these you want to see."</Text>
            </View>

            <TouchableOpacity style={styles.getStarted} onPress={() => navigation.navigate('Login')} >
                  <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
      
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
      container: {
            flex:1,
            backgroundColor: '#002335'
      },
      banner: {
            width: "100%",
            position: 'absolute',
      },
      logo: {
            width:158,
            height: 189,
            position: 'relative',
            top: 236,
            alignSelf: 'center',
      },
      textContainer: {
            padding: 30,
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent:'center',
            marginTop: 300,
      },
      text: {
            fontSize: 32,
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
      },
      getStarted: {
            backgroundColor: '#FFCA45',
            // padding: 40,
            width: 200,
            height: 56,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
      },
      buttonText: {
            fontSize: 24,
            alignSelf: 'center',
            color: 'white',
            
      }
      
})