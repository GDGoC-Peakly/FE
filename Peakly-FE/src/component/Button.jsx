import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';

const Button = ({ 
  onPress, 
  text = "완료", 
  bgColor = colors.primary[500],
  textColor = colors.grayscale[1000]
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity 
        style={[styles.completeButton, { backgroundColor: bgColor }]} 
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={[styles.completeButtonText, { color: textColor }]}>
          {text}
        </Text>
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
    alignSelf: 'center', 
  },
  completeButton: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});