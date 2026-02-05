import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../styles/colors';
import Logo from '../../../assets/img/Onboarding/logo.svg';

const EmptyScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[1000],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
