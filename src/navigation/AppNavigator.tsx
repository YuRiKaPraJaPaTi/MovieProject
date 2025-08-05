import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import BottomTabNavigator from './BottomTabNavigator';
import MovieScreen from '../screens/MovieScreen';
import ReviewScreen from '../screens/ReviewScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
      return (
            <RootStack.Navigator initialRouteName='Tabs'
            
            >
                  <RootStack.Screen name="Tabs" component={BottomTabNavigator} 
                  options={{headerShown: false}}
                  />
                  <RootStack.Screen name="Movie" component={MovieScreen} />
                  <RootStack.Screen name="Review" component={ReviewScreen} />
            </RootStack.Navigator>
      )
}

export default AppNavigator

const styles = StyleSheet.create({})