import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MyButton from '../../components/MyButton';
import InputBox from '../../components/InputBox';
import { BlurView } from '@react-native-community/blur';
import GoogleButton from '../../components/GoogleButton';
import LoginSignupContainer from '../../components/LoginSignupContainer';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}:Props) => {
  return (
   
      <ImageBackground source={require('../../assets/LoginBg.jpg')} resizeMode='cover' style={{flex:1, padding: 20}}>

            <Image source={require('../../assets/LOGOcinephiler.png')} />

            <LoginSignupContainer 
                  title='LogIn' 
                  buttonLabel='LogIn' 
                  onPressButton={()=>navigation.navigate('Signup')} 
                  onToggleForm={()=>navigation.navigate('Signup')}
            />

      </ImageBackground>
      
  )
}

export default LoginScreen

const styles = StyleSheet.create({
      
})
