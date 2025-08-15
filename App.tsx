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
import { useEffect } from 'react';
import { fetchWatchlist } from './src/redux/slices/watchlistSlice';
import { useAppDispatch } from './src/redux/hooks';
import { fetchFavorites } from './src/redux/slices/favoriteSlice';

function MainApp() {

  const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchFavorites());
      dispatch(fetchWatchlist());
    }, [dispatch]);


  return (
  
    <>
    
      <StatusBar backgroundColor="#002335" barStyle="light-content" />

      <AuthProvider>
        <NavigationContainer>
        
          <AppNavigator />
      
        </NavigationContainer>
      </AuthProvider>
    
      <Toast />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
