import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors.js';

const Category = ({ name, icon, activeIcon, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        isSelected ? styles.activeChip : styles.inactiveChip
      ]}
    >
      <Image 
        source={isSelected ? activeIcon : icon} 
        style={styles.icon} 
      />
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  inactiveChip: {
    backgroundColor: colors.grayscale[200],
    borderColor: colors.grayscale[500],
  },
  activeChip: {
    backgroundColor: colors.primary[100],
    borderColor: colors.primary[600],
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
    resizeMode: 'contain',
  },
  chipText: {
    fontSize: 16,
    fontWeight: '700',
  },
  inactiveText: {
    color: colors.grayscale[600],
  },
  activeText: {
    color: colors.primary[600],
  },
});

export default Category;