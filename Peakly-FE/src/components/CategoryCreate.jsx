import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import CategoryDropdown from './CategoryDropdown';
import CategoryInput from './CategoryInput';
import CategoryList from './CategoryList';

const CATEGORIES = ['암기', '이해', '논리·사고', '반복', '창의·구상'];
const MAX_CATEGORIES = 5;

const CategoryCreate = ({ categories, onAdd, onDelete, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [text, setText] = useState('');

  const filteredCategories = Array.isArray(categories) ? categories : [];

  const addCategory = async () => { 
    if (text.trim() === '') return;
    if (filteredCategories.length >= MAX_CATEGORIES) {
      Alert.alert('개수 초과', '최대 5개까지만 생성 가능합니다.');
      return;
    }
    await onAdd(text.trim(), selectedCategory);
    setText(''); 
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <CategoryDropdown
          isOpen={isOpen}
          selectedCategory={selectedCategory}
          categories={CATEGORIES}
          onToggle={() => setIsOpen(!isOpen)}
          onSelect={(cat) => {
            setSelectedCategory(cat);
            setIsOpen(false);
            onCategoryChange(cat); // 카테고리가 바뀌면 부모에게 알림
          }}
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
        onRemoveCategory={onDelete}
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
    zIndex: 2000 
  },
  inputRow: { 
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    gap: 8, 
    marginBottom: 12, 
    zIndex: 2000 
  },
});