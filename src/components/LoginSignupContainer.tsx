import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import InputBox from './InputBox'
import MyButton from './MyButton'
import GoogleButton from './GoogleButton'

interface FormProps {
      title: string,
      buttonLabel: string,
      showUserNameField?: boolean,
      onPressButton: () => void;
      onToggleForm: () => void;
}

export interface FormValues {
  username?: string;
  email: string;
  password: string;
  
}

const LoginSignupContainer = ({title, buttonLabel,onPressButton,onToggleForm}:FormProps) => {
  return (
      <View style={styles.signupContainer}>

                  <Text style={styles.title}>{title}</Text>

                  <Text style={styles.text1}>
                         {title === 'SignUp' ? 'Create an account to continue' : 'Please login to continue'}
                  </Text>

                  
                  {title === 'SignUp' && (
                  <InputBox iconName={require('../assets/Username.png')} placeholder='Username' />
                  )}
                  <InputBox iconName={require('../assets/Email.png')} placeholder='Email'/>
                  <InputBox iconName={require('../assets/Password.png')} placeholder='Password'/>

                  

                  <MyButton label={buttonLabel} onPress={onPressButton} />
                  
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
})