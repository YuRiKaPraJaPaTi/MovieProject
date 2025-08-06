import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/BottomTabScreens/HomeScreen';
import SearchScreen from '../screens/BottomTabScreens/SearchScreen';
import WishlistScreen from '../screens/BottomTabScreens/WishlistScreen';
import ProfileScreen from '../screens/BottomTabScreens/ProfileScreen';
import { BottomTabParamList } from './types';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
      return (
            <BottomTab.Navigator
                  screenOptions={({route}) => ({
                        headerShown: false,
                        tabBarStyle: {
                              backgroundColor:'black'
                        },
                        tabBarIcon: ({color, size}) => {
                              let iconName: string;
                              if(route.name == 'Home') {
                                    iconName = 'home'
                              } else if (route.name === 'Profile') {
                                    iconName = 'user-circle-o'
                              } else if (route.name === 'Search') {
                                    iconName = 'search'
                              } else iconName = 'th-list'
                              return <Icon name={iconName} size={size} color={color} />;
                        },
                        tabBarLabelStyle: {
                              fontSize: 16,
                              fontFamily: 'Georgia',
                              fontWeight: 300,
                        },
                        tabBarActiveTintColor: '#FFB703',
                        tabBarInactiveTintColor: '#FFFFFF',
                  })}
            >
                  <BottomTab.Screen name='Home' component={HomeScreen} />
                  <BottomTab.Screen name='Search' component={SearchScreen} />
                  <BottomTab.Screen name='Wishlist' component={WishlistScreen} />
                  <BottomTab.Screen name='Profile' component={ProfileScreen} />
            </BottomTab.Navigator>
      )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})