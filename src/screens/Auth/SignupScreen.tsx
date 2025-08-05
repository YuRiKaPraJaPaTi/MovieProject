import { ImageBackground, StyleSheet} from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { Image } from 'react-native/';
import LoginSignupContainer from '../../components/LoginSignupContainer';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen = ({navigation}: Props) => {
  return (
    <ImageBackground source={require('../../assets/SignupBg.jpg')} resizeMode='cover' style={{flex:1, padding: 20}}>

            <Image source={require('../../assets/LOGOcinephiler.png')} />

            <LoginSignupContainer 
                  title='SignUp' 
                  buttonLabel='SignUp' 
                  onPressButton={()=>navigation.navigate('Login')} 
                  onToggleForm={()=>navigation.navigate('Login')}
            />

      </ImageBackground>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  
})