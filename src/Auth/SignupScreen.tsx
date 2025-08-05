import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen = ({navigation}: Props) => {
  return (
     <View>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                <Text>SignupScreen</Text>
          </TouchableOpacity>
        </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({})