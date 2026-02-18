import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import CategoryDropdown from './CategoryDropdown';
import CategoryInput from './CategoryInput';
import CategoryList from './CategoryList';

const MAX_CATEGORIES = 5;

const CategoryCreate = ({
  majorCategoryNames,
  currentTags,
  onAdd,
  onDelete,
  onCategoryChange,
  initialCategory,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || majorCategoryNames[0],
  );
  const [text, setText] = useState('');

  const filteredTags = Array.isArray(currentTags) ? currentTags : [];

  const addCategory = async () => {
    if (text.trim() === '') return;

    if (filteredTags.length >= MAX_CATEGORIES) {
      Alert.alert('개수 초과', `태그는 최대 ${MAX_CATEGORIES}개까지만 생성 가능합니다.`);
      return;
    }

    await onAdd(text.trim());
    setText('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <CategoryDropdown
          isOpen={isOpen}
          selectedCategory={selectedCategory}
          categories={majorCategoryNames}
          onToggle={() => setIsOpen(!isOpen)}
          onSelect={(cat) => {
            setSelectedCategory(cat);
            setIsOpen(false);
            onCategoryChange(cat);
          }}
        />
        <CategoryInput
          value={text}
          onChangeText={setText}
          onSubmit={addCategory}
          selectedCategory={selectedCategory}
        />
      </View>

      {/* 서버에서 가져온 태그 리스트를 보여줌 */}
      <CategoryList
        categories={filteredTags}
        selectedCategory={selectedCategory}
        onRemoveCategory={onDelete}
        style={style}
      />

      {/* 드롭다운 열렸을 때 배경 터치 시 닫기 */}
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
