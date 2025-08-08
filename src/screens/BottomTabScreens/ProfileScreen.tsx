import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = () => {
      const {user} = useAuth()
      const email = user?.email ?? 'No Email';
      const initial = email.charAt(0).toUpperCase();

      const handleSignOut = useCallback(async () => {
            const auth = getAuth();
            try {
                  await signOut(auth);
                  Alert.alert("Signed out", "You have been signed out successfully.");
                  
            } catch (error) {
                  Alert.alert("Error", "Something went wrong while signing out.");
                  console.error("Sign-out error:", error);
            }
      }, []);
      return (
      
            <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
                  <Icon name="sign-out" size={40} color="#FFCA45" />
                  <Text style={{color:'#FFCA45'}}>LogOut</Text>
            </TouchableOpacity>
      
      )
}

export default ProfileScreen

const styles = StyleSheet.create({
      logout: {
            marginRight: 20,
            alignItems: 'flex-end',
            paddingVertical: 15,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
            // backgroundColor: 'black'
      },
})