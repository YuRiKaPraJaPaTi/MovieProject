// Foo.jsx
import Toast from 'react-native-toast-message';
import { Button } from 'react-native'

export function Foo() {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello 👋',
      text2: 'How are you doing?'
    });
  }

  return (
    <Button
      title='Show toast'
      onPress={showToast}
    />
  )
}