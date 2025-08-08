import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
// import Icon from 'react-native-vector-icons/FontAwesome';

interface props {
      iconName?: any;
      placeholder: string;
      style?: object;
      value?: string;
      onChangeText?: (text:string)=>void;
}

const InputBox = ({iconName, placeholder, style, value, onChangeText}:props) => {
      return (
            <View style={[styles.inputContainer, style]}>
                  <FastImage source ={iconName}  style={styles.icon} />
            
            <TextInput  style={[styles.input]}
                  placeholder={placeholder}
                  placeholderTextColor="#FFFFFF80"
                  value={value}
                  onChangeText={onChangeText}
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
      },

      input: {
            flex: 1,
            height: '100%',
            fontSize: 20,
      },
})