import { Image, StyleSheet } from 'react-native'
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
                        headerShown: true,
                        tabBarStyle: {
                              backgroundColor:'#001C29'
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
                  <BottomTab.Screen name='Home' component={HomeScreen} 
                        options={() => ({
                        headerStyle: {
                              backgroundColor: '#002335',
                              elevation: 0,
                              borderBottomWidth: 0,
                        },
                        headerTitle: '',
                        headerLeft: () => {
                              return (
                              <Image
                              source={require('../../src/assets/LOGOcinephiler.png')}
                              style={{ width: 188, height: 48, marginLeft: 20 }}
                              />
                              );
                        },
                        })}
                  />
                  <BottomTab.Screen name='Search' component={SearchScreen} options={{headerShown:false}}/>
                  <BottomTab.Screen name='Wishlist' component={WishlistScreen} 
                        options={() => ({
                        headerStyle: {
                              backgroundColor: '#002335',
                        },
                        headerTitle: 'My Wishlist',
                        headerTitleStyle: {
                              fontSize: 28, 
                              color: '#FFFFFF', 
                              fontWeight: '600',
                        },
                        headerRight: () => {
                              return (
                              <Image
                              source={require('../../src/assets/3line.png')}
                              style={{marginRight: 20 }}
                              />
                              );
                        },
                        })}
                  />
                  <BottomTab.Screen name='Profile' component={ProfileScreen} options={{headerShown:false}}/>
            </BottomTab.Navigator>
      )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})