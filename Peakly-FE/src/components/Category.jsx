import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors.js';

const Category = ({ name, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        isSelected ? styles.activeChip : styles.inactiveChip
      ]}
    >
      <Text style={[
        styles.chipText, 
        isSelected ? styles.activeText : styles.inactiveText
      ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6.5,
    borderRadius: 20,
  },
  inactiveChip: {
    backgroundColor: colors.grayscale[200],
  },
  activeChip: {
    backgroundColor: colors.primary[500],
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
  },
  inactiveText: {
    color: colors.grayscale[600],
  },
  activeText: {
    color: colors.grayscale[100],
  },
});

export default Category;