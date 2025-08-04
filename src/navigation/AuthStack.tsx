import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../Auth/WelcomeScreen'
import LoginScreen from '../Auth/LoginScreen'
import SignupScreen from '../Auth/SignupScreen'
import { AuthStackParamList } from './types';

const Auth = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
      <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: true}}/>
      <Auth.Screen name="Signup" component={SignupScreen} options={{headerShown: true}}/>
    </Auth.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})