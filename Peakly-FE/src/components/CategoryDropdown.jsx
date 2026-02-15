import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const CategoryDropdown = ({ isOpen, selectedCategory, categories, onToggle, onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selector, isOpen && styles.selectorOpen]}
        activeOpacity={0.7}
        onPress={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <Text style={styles.categoryText}>{selectedCategory}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.grayscale[500]}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.optionsWrapper}>
          {categories.map((item, index) => (
            <TouchableOpacity key={index} style={styles.optionItem} onPress={() => onSelect(item)}>
              <Text
                style={[styles.optionText, item === selectedCategory && styles.selectedOptionText]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoryDropdown;

const styles = StyleSheet.create({
  container: {
    width: 95,
    zIndex: 3000,
    elevation: 3000,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.grayscale[100],
  },
  selectorOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.grayscale[500],
  },
  optionsWrapper: {
    position: 'absolute',
    top: 43,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.grayscale[100],
    zIndex: 4000,
    elevation: 4000,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.grayscale[600],
  },
  selectedOptionText: {
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[900],
  },
});
