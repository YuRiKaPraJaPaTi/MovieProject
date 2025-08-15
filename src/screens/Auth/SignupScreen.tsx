import { ImageBackground, StyleSheet} from 'react-native'
import React, { useCallback, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList } from '../../navigation/types';
import { Image } from 'react-native/';
import LoginSignupContainer, { FormValues } from '../../components/LoginSignupContainer';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';
import { showErrorToast, showSuccessToast } from '../../utils/toast/toastHelper';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({navigation}: Props) => {
      const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; username?: string }>({});

  const handleSignup = useCallback((form: FormValues) => {
    const { email, password, username } = form;

    const errors: typeof fieldErrors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password min of 6 length required';
//     if (!username) errors.username = 'Username is required';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setFieldErrors({});

    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      showSuccessToast('Account created successfully!');
    })
    .catch((error) => {
      const errorMap: typeof fieldErrors = {};

      if (error.code === 'auth/email-already-in-use') {
        errorMap.email = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        errorMap.email = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMap.password = 'Password must be at least 6 characters.';
      } else {
        showErrorToast(error.message || 'Signup failed');
      }

      setFieldErrors(errorMap);
    })
    .finally(() => {
      setLoading(false);
    });
  },[navigation]);

  return (
    <ImageBackground source={require('../../assets/SignupBg.jpg')} resizeMode='cover' style={{flex:1, padding: 20}}>

            <Image source={require('../../assets/LOGOcinephiler.png')} />

            <LoginSignupContainer 
                  title='SignUp' 
                  buttonLabel='SignUp' 
                  onSubmit={handleSignup}
                  onToggleForm={()=>navigation.navigate('Login')}
                  externalErrors={fieldErrors}
                  loading={loading}
            />

      </ImageBackground>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  
})