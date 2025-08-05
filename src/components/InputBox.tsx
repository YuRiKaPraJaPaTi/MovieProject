import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
// import Icon from 'react-native-vector-icons/FontAwesome';

interface props {
      iconName?: any;
      placeholder: string;
      style?: object;
      //   hasError?: boolean;
}

const InputBox = ({iconName, placeholder, style}:props) => {
      return (
            <View style={[styles.inputContainer, style]}>
                  <Image source ={iconName}  style={styles.icon} />
            
            <TextInput  style={[styles.input]}
                  placeholder={placeholder}
                  placeholderTextColor="#FFFFFF80"
            />      
            
      </View>
      )
}

export default InputBox

const styles = StyleSheet.create({
      inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.32)',
            borderRadius: 16,
            paddingHorizontal: 10,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 1)',
      },
      icon: {
            marginRight: 10,
            height:30,
            width: 30,
            //     color: 'rgba(255, 255, 255, 0.9)',
      },

      input: {
            flex: 1,
            height: '100%',
            fontSize: 20,
      },
})