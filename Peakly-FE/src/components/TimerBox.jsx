import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors.js';

const TimerBox = ({ time = "00 : 00 : 00", textColor }) => {
  return (
    <View style={styles.timerBox}>
      <Text style={[styles.timerText, textColor && { color: textColor }]}>
        {time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerBox: {
    backgroundColor: colors.grayscale[800],
    width: 259,
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: colors.sub[200], 
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
  },
});

export default TimerBox;