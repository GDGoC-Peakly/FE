import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../styles/colors';

const EmptyScreen = () => {
  return <View style={styles.container} />;
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[1000],
  },
});
