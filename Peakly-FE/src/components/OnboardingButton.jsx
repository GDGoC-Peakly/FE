import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../styles/colors';

const OnboardingButton = ({ text }) => {
  return (
    <Pressable>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default OnboardingButton;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.grayscale[100],
    fontWeight: 400,
    textDecorationLine: 'underline',
  },
});
