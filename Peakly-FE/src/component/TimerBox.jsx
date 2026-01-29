import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors.js';

const TimerBox = ({ time = "00 : 00 : 00" }) => {
  return (
    <View style={styles.timerBox}>
      <Text style={styles.timerText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerBox: {
    backgroundColor: colors.primary[100],
    borderWidth: 1,
    borderColor: colors.primary[600],
    width: 259,
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 39,
  },
  timerText: {
    color: colors.primary[600],
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
  },
});

export default TimerBox;