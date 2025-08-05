import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MyButton from '../../components/MyButton';
import InputBox from '../../components/InputBox';
import { BlurView } from '@react-native-community/blur';
import GoogleButton from '../../components/GoogleButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}:Props) => {
  return (
   
      <ImageBackground source={require('../../assets/LoginBg.jpg')} resizeMode='cover' style={{flex:1, padding: 20}}>

            <Image source={require('../../assets/LOGOcinephiler.png')} />

            <View style={styles.loginContainer}>

                  <Text style={styles.title}>Login</Text>

                  <Text style={styles.text1}>Please signin to continue</Text>

                  <InputBox iconName={require('../../assets/Username.png')} placeholder='Username'/>
                  <InputBox iconName={require('../../assets/Password.png')} placeholder='Password'/>

                  <Text style={styles.forgotPass}>Forgot Password??</Text>

                  <MyButton label='Login' onPress={()=>{navigation.navigate('Signup')}} />
                  
                  <View style={styles.foot}>
                        <Text style={styles.normalText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupLink}> SignUp </Text>
                        </TouchableOpacity>
                        <Text style={styles.normalText}>first</Text>
                  </View>

                  <Text style={{fontSize:16, marginVertical:10, color:'white'}}>OR</Text>

                  <GoogleButton label='Google' iconName='google'/>
                  
            </View>

      </ImageBackground>
      
  )
}

export default LoginScreen

const styles = StyleSheet.create({
      loginContainer: {
            position: 'relative', 
            top:250, 
            padding: 20,
            // backgroundColor: 'rgba(255, 255, 255, 0.6)', 
            backgroundColor: 'gray',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            
            
      },
      title: {
            fontSize: 44,
            fontWeight: 800,
            color: 'white',
      },
      text1: {
            fontSize: 16,
            fontWeight: 600,
            color: 'white',
            marginBottom: 12,
      },
      forgotPass: {
            fontSize: 16,
            alignSelf: 'flex-end',
            color: '#FFCA45',
            marginBottom: 12,
      },
      foot: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
      },
      normalText: {
            fontSize: 16,
            color: 'white', 
      },
      signupLink: {
            fontSize: 16,
            color: '#FFCA45', 
            fontWeight: 600,
      },
})
