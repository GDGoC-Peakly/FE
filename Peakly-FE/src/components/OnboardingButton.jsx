import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../styles/colors';

const OnboardingButton = ({ text, style }) => {
  return (
    <Pressable style={[style]}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default OnboardingButton;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: colors.grayscale[100],
    textDecorationLine: 'underline',
  },
});
