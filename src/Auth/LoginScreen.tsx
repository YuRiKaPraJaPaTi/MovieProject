import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AuthStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}:Props) => {
  return (
    <View>
      <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}>
            <Text>LoginScreen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
