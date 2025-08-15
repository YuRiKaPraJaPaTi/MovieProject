import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {
  title: string;
  image: string;
  onGoBack: () => void;
}

const MovieHeader = ({ title, image, onGoBack }: Props) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flex: 7, paddingRight: 4 }}>
      <TouchableOpacity style={styles.goback} onPress={onGoBack}>
        <Image source={require('../../assets/Larrow.png')} />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
    <FastImage source={{ uri: image }} style={styles.movieImage} />
  </View>
);

export default MovieHeader;

const styles = StyleSheet.create({
  goback: {
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginTop: 24,
  },
  movieImage: {
    width: 160,
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
  },
});
