import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputBox from './InputBox'
import MyButton from './MyButton'
import GoogleButton from './GoogleButton'

interface FormProps {
      title: string,
      buttonLabel: string,
      showUserNameField?: boolean,
      onPressButton?: () => void;
      onToggleForm: () => void;
      onSubmit: (form: FormValues) => void;
        externalErrors?: {
            email?: string;
            password?: string;
            username?: string;
      };
}

export interface FormValues {
  username?: string;
  email: string;
  password: string;
  
}

const LoginSignupContainer = ({title, buttonLabel,onToggleForm,onSubmit, externalErrors}:FormProps) => {
      const [form, setForm] = useState<FormValues>({email:'', password:'',username:''})
      const [emailValid, setEmailValid] = useState(true)
      const [passwordValid, setPasswordValid] = useState(true);
      const [emailError, setEmailError] = useState<string | null>(null);
      const [passwordError, setPasswordError] = useState<string | null>(null); 

      // Handle email validation
      const handleEmailChange = (email: string) => {
            setForm({ ...form, email });

            if (externalErrors?.email) externalErrors.email = undefined;
            
            if (!email) {
                  setEmailError(null);
                  setEmailValid(true);
            } else {
                  // Validate the email format
                  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailFormat.test(email)) {
                        setEmailValid(false);
                        setEmailError('Please enter a valid email address.');
                        } else {
                        setEmailValid(true);
                        setEmailError(null);
                  }
            }
      };

      // Handle password validation
      const handlePasswordChange = (password: string) => {
            setForm({ ...form, password });

            if (externalErrors?.password) externalErrors.password = undefined;

            if (!password) {
                  setPasswordError(null);
                  setPasswordValid(true);
            } else {
                  // Validate the password length
                  if (password.length < 6) {
                        setPasswordValid(false);
                        setPasswordError('Password must be at least 6 characters.');
                  } else {
                        setPasswordValid(true);
                        setPasswordError(null);
                  }
            }
      };

      // Handle form submission
      const handleSubmit = () => {
            if (emailValid && passwordValid) {
                  onSubmit(form);
            }
      };
      
  return (
      <View style={styles.signupContainer}>

                  <Text style={styles.title}>{title}</Text>

                  <Text style={styles.text1}>
                         {title === 'SignUp' ? 'Create an account to continue' : 'Please login to continue'}
                  </Text>

                  
                  {title === 'SignUp' && (
                  <InputBox 
                        iconName={require('../assets/Username.png')} placeholder='Username' 
                        value={form.username!}
                        onChangeText={(text) => setForm({ ...form, username: text })}
                        style={[externalErrors?.username && styles.errorBorder]}
                  />
                  )}

                  <InputBox 
                        iconName={require('../assets/Email.png')} 
                        placeholder='Email'
                        value={form.email}
                        onChangeText={handleEmailChange}
                        style={[(!emailValid || externalErrors?.email) && styles.errorBorder]}
                  />
                  {(!emailValid || externalErrors?.email) && (
                        <Text style={styles.errorText}>{externalErrors?.email || emailError}</Text>
                  )}

                  <InputBox 
                        iconName={require('../assets/Password.png')} 
                        placeholder='Password'
                        value={form.password}
                        onChangeText={handlePasswordChange}
                        style={[(!passwordValid || externalErrors?.password) && styles.errorBorder]}
                  />
                  {(!passwordValid || externalErrors?.password) && (
                        <Text style={styles.errorText}>{externalErrors?.password || passwordError}</Text>
                  )}

                  

                  <MyButton label={buttonLabel} onPress={handleSubmit} />
                  
                  <View style={styles.foot}>
                        <Text style={styles.normalText}>
                              {title === 'SignUp' ? 'Already have an account?' : "Don't have an account?"}
                        </Text>
                        <TouchableOpacity onPress={onToggleForm}>
                        <Text style={styles.signupLink}> {title === 'SignUp' ? ' Login' : ' SignUp'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.normalText}>{title === 'SignUp' ? ' here' : ' first'}</Text>
                  </View>

                  <Text style={{fontSize:16, marginVertical:10, color:'white'}}>OR</Text>

                  <GoogleButton label='Google' iconName='google'/>
                  
            </View>
  )
}

export default LoginSignupContainer

const styles = StyleSheet.create({
       signupContainer: {
            position: 'relative', 
            top:250, 
            padding: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.4)', 
            // backgroundColor: 'gray',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            
            
      },
      title: {
            fontSize: 44,
            fontWeight: 800,
            color: 'white',
      },
      text1: {
            fontSize: 16,
            fontWeight: 600,
            color: 'white',
            marginBottom: 12,
      },
    
      foot: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
      },
      normalText: {
            fontSize: 16,
            color: 'white', 
      },
      signupLink: {
            fontSize: 16,
            color: '#FFCA45', 
            fontWeight: 600,
      },
        errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
  },
 
})