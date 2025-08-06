import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Image } from 'react-native';

interface GoogleButtonProps {
//   onPress: () => void;
      label: string,
      iconName: any,
      style?: ViewStyle;
      textStyle?: TextStyle;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({label,iconName, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.buttonBox, style]}>
      {/* <Icon name={iconName} size={20} color="black" style={styles.icon} /> */}
      <Image source={iconName} style={{ width: 24, height: 24 }} />
      <Text style={[styles.buttonText, textStyle]}>Sign in with {label} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: 'row',
    gap:12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF90',
    borderWidth: 1,
    borderColor: '#00000090',
    borderRadius: 24,
    justifyContent: 'center',
    width: '100%',
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});

export default GoogleButton;
