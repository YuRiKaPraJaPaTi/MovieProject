import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import SignupScreen from '../screens/Auth/SignupScreen'
import { AuthStackParamList } from './types';

const Auth = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
      <Auth.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Auth.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
    </Auth.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})