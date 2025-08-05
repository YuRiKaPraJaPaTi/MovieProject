import { Alert, Image, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginSignupContainer, { FormValues } from '../../components/LoginSignupContainer';
import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'> & {
      onLogin: () => void;
};

const LoginScreen = ({navigation, onLogin}:Props) => {
      const [loading, setLoading] = useState(false);
      const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

      const handleLogin = (form: FormValues) => {
            const { email, password } = form;

            const errors: typeof fieldErrors = {};

            if (!email) errors.email = 'Email is required';
            if (!password) errors.password = 'Password is required';

            if (Object.keys(errors).length > 0) {
                  setFieldErrors(errors);
                  return;
            }

            setLoading(true);
            setFieldErrors({});

            auth()
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {
                  onLogin();
                  // navigation.navigate('Signup')
                  })
                  .catch((error) => {
                  // Handle Firebase authentication errors
                  const errorMap: typeof fieldErrors = {};

                  switch (error.code) {
                  case 'auth/user-not-found':
                        errorMap.email = 'No account found with this email.';
                        break;
                  case 'auth/wrong-password':
                        errorMap.password = 'Incorrect password.';
                        break;
                  case 'auth/invalid-email':
                        errorMap.email = 'Invalid email address.';
                        break;
                  case 'auth/credential-already-associated':
                        errorMap.email = 'This email is already associated with another account.';
                        break;
                  default:
                        Alert.alert(error.message || 'Login failed');
                        break;
                  }

                  setFieldErrors(errorMap);
                  })

                  .finally(() => {
                  setLoading(false);
                  });
      }
      ;
  return (
   
      <ImageBackground source={require('../../assets/LoginBg.jpg')} resizeMode='cover' style={{flex:1, padding: 20}}>

            <Image source={require('../../assets/LOGOcinephiler.png')} />

            <LoginSignupContainer 
                  title='LogIn' 
                  buttonLabel='LogIn' 
                  onSubmit={handleLogin} 
                  onToggleForm={()=>navigation.navigate('Signup')}
                  externalErrors={fieldErrors}
                  loading={loading}
            />

      </ImageBackground>
      
  )
}

export default LoginScreen

const styles = StyleSheet.create({
      
})
