import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';

const Button = ({ onPress, text = "완료" }) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity 
        style={styles.completeButton} 
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={styles.completeButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 18, 
  },
  completeButton: {
    backgroundColor: colors.primary[600],
    width: '100%',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: colors.grayscale[100],
    fontSize: 20,
    fontWeight: 'bold',
  },
});