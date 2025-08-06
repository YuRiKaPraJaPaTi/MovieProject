/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StyleSheet, View } from 'react-native';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  // Handle authentication state
  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      setIsLoggedIn(!!user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);



  if (initializing) return null;

  return (
     <NavigationContainer>
      {/* <AuthStack /> */}
      {/* <BottomTabNavigator/> */}
      {/* <AppNavigator /> */}
      {isLoggedIn ? (
          <AppNavigator />
          ) : (
          <AuthStack onLogin={() => setIsLoggedIn(true)} />
        )}
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({

});

export default App;
