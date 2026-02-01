import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors.js';

const Tag = ({ name, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected ? styles.activeChip : styles.inactiveChip,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.chipText,
          isSelected ? styles.activeText : styles.inactiveText,
        ]}
      >
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
    alignSelf: 'flex-start', 
  },
  inactiveChip: {
    backgroundColor: colors.grayscale[200],
    borderWidth: 1,
    borderColor: colors.grayscale[500],
  },
  activeChip: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
  },
  inactiveText: {
    color: colors.grayscale[600],
  },
  activeText: {
    color: colors.primary[500],
  },
});

export default Tag;