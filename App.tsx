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

function App() {

  return (
     <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
