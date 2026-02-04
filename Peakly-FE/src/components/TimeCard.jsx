import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

const TimeCard = ({ label, time }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

export default TimeCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 151,
    height: 68,
    backgroundColor: colors.primary[50], 
    borderWidth: 1.2,           
    borderColor: colors.primary[500],    
    borderRadius: 12,           
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,               
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000], 
  },
  timeText: {
    fontSize: 20,                
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],          
  },
});