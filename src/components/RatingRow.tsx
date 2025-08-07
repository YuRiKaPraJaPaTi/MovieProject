import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RatingProps = {
      rating: number;
      setRating: (value: number)=>void;
}

const RatingRow = ({ rating, setRating }: RatingProps) => {

      const handleStarPress = (value: number) => {
            setRating(value);
      };

      return (

            <View style={styles.rowContainer}>
                  <Text style={styles.title}>Rate</Text>
                  
                  {/* Stars */}
                  <View style={styles.starsContainer}>
                        
                  {[1, 2, 3, 4, 5].map((i) => (
                  <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                        <Icon
                        name={i <= rating ? 'star' : 'star'}
                        size={36}
                        color={i <= rating ? '#FFD700' : '#FFFFFF50'}
                        />
                  </TouchableOpacity>
                  ))}
            </View>

      
    </View>
  );
};

export default RatingRow;

const styles = StyleSheet.create({
      title: {
            fontSize: 16,
            color: '#FFFFFF'
      },
      rowContainer: {
            flexDirection: 'column',
            gap: 10,
      },
      image: {
            width: 60,
            height: 90,
            borderRadius: 8,
      },
      starsContainer: {
            flexDirection: 'row',
      },
      
});
