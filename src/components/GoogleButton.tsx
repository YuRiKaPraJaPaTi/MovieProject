import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface GoogleButtonProps {
//   onPress: () => void;
      label: string,
      iconName: string,
      style?: ViewStyle;
      textStyle?: TextStyle;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({label,iconName, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.buttonBox, style]}>
      <Icon name={iconName} size={20} color="white" style={styles.icon} />
      <Text style={[styles.buttonText, textStyle]}>Sign up with {label} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCA45',
    borderRadius: 16,
    justifyContent: 'center',
    width: '100%',
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default GoogleButton;
