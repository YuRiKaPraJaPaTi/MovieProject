import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import SignupScreen from '../screens/Auth/SignupScreen'
import { AuthStackParamList } from './types';

const Auth = createNativeStackNavigator<AuthStackParamList>();

type Props = {
  onLogin: ()=>void;
}

const AuthStack = ({onLogin}:Props) => {
  return (
    <Auth.Navigator>

      <Auth.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />

      <Auth.Screen name="Login" options={{headerShown: false}}>
            {props => <LoginScreen {...props} onLogin={onLogin} />}
      </Auth.Screen>

      <Auth.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
    </Auth.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})