import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { DisturbConfig } from '../constants/reasonData';

const DisturbCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <View style={styles.buttonContainer}>
      {DisturbConfig.map((item, index) => {
        const isSelected = selectedCategory === item.id;
        const IconComponent = isSelected ? item.IconOn : item.IconOff;
        return (
          <Pressable
            key={index}
            style={[styles.button, isSelected && styles.selectedButton]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <IconComponent width={20} height={20} />
            <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default DisturbCategories;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  buttonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
