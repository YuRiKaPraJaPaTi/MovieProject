import { ActivityIndicator, DimensionValue, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
      label: string,
      onPress?: ()=>void;
      loading?: boolean;
      width?: DimensionValue;
      height?: DimensionValue;
}

const MyButton = ({onPress, label, loading, width='100%', height=40}:Props) => {
  return (
    
            <TouchableOpacity onPress={onPress} style={[styles.button, {width, height}]}>
                  
                  {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>{label}</Text>
              )}
            </TouchableOpacity>
    
  )
}

export default MyButton

const styles = StyleSheet.create({
      button: {
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