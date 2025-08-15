import Toast from 'react-native-toast-message';

export function showSuccessToast(text1: string, text2?: string) {
  Toast.show({
    type: 'success',
    text1,
    text2,
    position: 'top',
    topOffset: 100,
    visibilityTime: 3000,
    autoHide: true,
  });
}

export function showErrorToast(text1: string, text2?: string) {
  Toast.show({
    type: 'error',
    text1,
    text2,
    position: 'top',
    topOffset: 50,
    visibilityTime: 3000,
    autoHide: true,
  });
}

export function showInfoToast(text1: string, text2?: string) {
  Toast.show({
    type: 'info',
    text1,
    text2,
    position: 'top',
    topOffset: 50,
    visibilityTime: 3000,
    autoHide: true,
  });
}


// import React from 'react';
// import { View, Button, StyleSheet } from 'react-native';



// export function Foo() {
//   return (
//     <View style={styles.container}>
//       <Button title="Show Success Toast" onPress={() => showSuccessToast('Success!', 'Operation completed')} />
//       <View style={styles.spacer} />
//       <Button title="Show Error Toast" onPress={() => showErrorToast('Error!', 'Something went wrong')} />
//       <View style={styles.spacer} />
//       <Button title="Show Info Toast" onPress={() => showInfoToast('Info', 'Just so you know')} />
//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1,  padding: 20 , zIndex: 0},
//   spacer: { height: 12 },
// });

