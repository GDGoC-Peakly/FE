import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../styles/colors';
import { useState } from 'react';

const CheckBox = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Pressable
      style={[isDisabled ? styles.on : styles.off]}
      onPress={() => setIsDisabled((prev) => !prev)}
    />
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  off: {
    width: 16,
    height: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
  },
  on: {
    width: 16,
    height: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary[500],
  },
});
