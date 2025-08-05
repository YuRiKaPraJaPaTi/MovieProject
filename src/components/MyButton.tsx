import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
      label: string,
      onPress: ()=>void
}

const MyButton = ({onPress, label}:Props) => {
  return (
    
            <TouchableOpacity onPress={onPress} style={styles.button}>
                  <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
    
  )
}

export default MyButton

const styles = StyleSheet.create({
      button: {
            height: 40,
            width: '100%',
            backgroundColor: '#FFCA45',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
      },
      buttonText: {
            fontSize: 24,
            alignSelf: 'center',
            color: 'white',
      }
})