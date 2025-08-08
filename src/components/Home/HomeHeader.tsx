import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const HomeHeader = () => {
      const {user} = useAuth()
  return (
   
      <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome back, <Text style={styles.name}>{user?.email}</Text></Text>
            <Text style={styles.review}>Review or log film you have watched </Text>
      </View>
    
  )
}

export default HomeHeader

const styles = StyleSheet.create({
      welcomeContainer: {
            marginBottom: 24,
      },
      welcome: {
            fontSize: 28,
            fontWeight: 700,
            color: '#FFFFFF'
      },
      name: {
            color: '#FFCA45'
      },
      review: {
            fontSize: 16,
            color: "#FFFFFF"
      }
})