/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

function App() {


  return (
    <AuthProvider>
      <NavigationContainer>
      
        <AppNavigator />
    
      </NavigationContainer>
    </AuthProvider>
    
  );
}

const styles = StyleSheet.create({

});

export default App;
