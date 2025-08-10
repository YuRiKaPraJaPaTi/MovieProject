import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../IconButtom';

const ThreeButtonsRow = () => {
  return (
    <View style={styles.row}>
      <IconButton label="Watch Trailer" icon={require('../../assets/Utube.png')}  />
      <IconButton label="WishList" icon={require('../../assets/Bookmark.png')}  />
      <IconButton label="Log"  />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});

export default ThreeButtonsRow;
