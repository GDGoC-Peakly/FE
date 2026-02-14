import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import CategoryDropdown from './CategoryDropdown';
import CategoryInput from './CategoryInput';
import CategoryList from './CategoryList';

const CATEGORIES = ['암기', '이해', '논리·사고', '반복', '창의·구상'];
const MAX_CATEGORIES = 5;

const CategoryCreate = ({ categories, setCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [text, setText] = useState('');

  const filteredCategories = categories.filter((item) => item.category === selectedCategory);

  const addCategory = () => {
    if (text.trim() === '') return;

    if (filteredCategories.length >= MAX_CATEGORIES) {
      Alert.alert(
        '개수 초과',
        `'${selectedCategory}' 카테고리는 최대 ${MAX_CATEGORIES}개까지만 생성 가능합니다.`,
      );
      return;
    }

    setCategories([
      ...categories,
      {
        id: Date.now(),
        category: selectedCategory,
        content: text.trim(),
      },
    ]);
    setText('');
  };

  const removeCategory = (id) => {
    setCategories(categories.filter((item) => item.id !== id));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <CategoryDropdown
          isOpen={isOpen}
          selectedCategory={selectedCategory}
          categories={CATEGORIES}
          onToggle={() => setIsOpen(!isOpen)}
          onSelect={handleCategorySelect}
        />
        <CategoryInput
          value={text}
          onChangeText={setText}
          onSubmit={addCategory}
          selectedCategory={selectedCategory}
        />
      </View>
      <CategoryList
        categories={filteredCategories}
        selectedCategory={selectedCategory}
        onRemoveCategory={removeCategory}
      />
      {isOpen && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        />
      )}
    </View>
  );
};

export default CategoryCreate;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    zIndex: 2000,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
    zIndex: 2000,
  },
});
