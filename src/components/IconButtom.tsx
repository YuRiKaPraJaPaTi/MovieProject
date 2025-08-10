import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

type IconButtonProps = {
  label: string;
  icon?: ImageSourcePropType;        
};

const IconButton = ({ label, icon}: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button]}>
      <View style={styles.content}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF60',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 108,
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF75',
  },
});

export default IconButton;
