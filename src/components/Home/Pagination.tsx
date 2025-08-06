import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ToastAndroid } from 'react-native';


const Pagination = ({ page, setPage}: { page: number, setPage: (page: number) => void }) => {
      const [inputPage, setInputPage] = useState(page.toString());

      useEffect(() => {
            setInputPage(page.toString());
      }, [page]);

      const handlePageChange = (text: string) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setInputPage(numericText);

            const num = parseInt(text);

            if (!isNaN(num) ) {
                  if (num < 1 || num > 50) {
                        ToastAndroid.show('Page must be between 1 and 50', ToastAndroid.SHORT);
                  return;
            }
                  setPage(num);
            }
      };

      const handleEndEditing = () => {
            const num = parseInt(inputPage, 10);

            // Fix edge cases (empty or out of range)
            if (isNaN(num) || num < 1) {
                  setPage(1);
                  setInputPage('1');
            } else if (num > 50) {
                  setPage(50);
                  setInputPage('50');
            }
      };

      const handlePrev = () => {
            const newPage = Math.max(page - 1, 1);
            setPage(newPage);
      };

            
      const handleNext = () => {
            const newPage = Math.min(page + 1, 500);
            setPage(newPage);
      };

  return (
  
      <View style={styles.pagination}>
            <Text style={styles.unicode} onPress={handlePrev}>
                  ◀ Prev
            </Text>

            <TextInput
                  style={styles.input}
                  value={inputPage}
                  onChangeText={handlePageChange}
                  onEndEditing={handleEndEditing}
                  keyboardType="numeric"
                  maxLength={3}
                  underlineColorAndroid="transparent"

            />

            <Text style={styles.unicode} onPress={handleNext}>
                  Next ▶
            </Text>
      </View>
   
  );
};

const styles = StyleSheet.create({
      container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
            paddingHorizontal: 16,
      },
      title: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
      },
      pagination: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
      },
      unicode: {
            color: '#FFCA45',
            fontSize: 16,
            paddingHorizontal: 4,
      },
      input: {
            color: 'white',   
            width: 30,
            textAlign: 'center',
            fontSize: 16,
      },
      });

export default Pagination;
