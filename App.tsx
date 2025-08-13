/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Foo } from './src/utils/toast/toastHelper';

function App() {


  return (
  
    <>
    {/* <Provider store={store}>
      <StatusBar backgroundColor="#002335" barStyle="light-content" />

      <AuthProvider>
        <NavigationContainer>
        
          <AppNavigator />
      
        </NavigationContainer>
      </AuthProvider>
    </Provider> */}
    <Foo />
    <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
