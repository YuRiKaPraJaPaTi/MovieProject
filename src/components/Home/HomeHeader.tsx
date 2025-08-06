import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
        <Image source={require('../../assets/LOGOcinephiler.png')} />
                  <View style={styles.welcomeContainer}>
                        <Text style={styles.welcome}>Welcome back, <Text style={styles.name}>Dilhara</Text></Text>
                        <Text style={styles.review}>Review or log film you have watched </Text>
                  </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
      headerContainer: {

      },
      welcomeContainer: {
            marginTop: 24,
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