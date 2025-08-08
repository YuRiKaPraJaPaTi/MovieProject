import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import BottomTabNavigator from './BottomTabNavigator';
import MovieScreen from '../screens/MovieScreen';
import ReviewScreen from '../screens/ReviewScreen';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
      const {user} = useAuth();
      return (
            <RootStack.Navigator >
                  {user ? (
                        <>
                              <RootStack.Screen name="Tabs" component={BottomTabNavigator} 
                              options={{headerShown: false}}
                              />
                              <RootStack.Screen name="Movie" component={MovieScreen} 
                                    options={{
                                          headerTitle: 'Movie Detail',
                                          headerStyle: { backgroundColor: '#002335' },
                                          headerTintColor: '#FFFFFF', 
                                          headerTitleStyle: { fontWeight: 'bold' },
                                          
                                    }} 
                              />
                              <RootStack.Screen name="Review" component={ReviewScreen} options={{headerShown: false}} />
                        </>
                  ) : (
                        <>
                              <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
                              <RootStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                              <RootStack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
                        </>
                  )}
                  
            </RootStack.Navigator>
      )
}

export default AppNavigator

const styles = StyleSheet.create({})