import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';
import CategoryCreate from '../../components/CategoryCreate';
import { categoryApi } from '../../api/category';

const CATEGORY_MAP = {
  '암기': 1,
  '이해': 2,
  '논리·사고': 3,
  '반복': 4,
  '창의·구상': 5,
};

const CustomTag = () => {
  const [tags, setTags] = useState([]); 
  const [selectedCategoryName, setSelectedCategoryName] = useState('암기');

  const fetchTags = useCallback(async (majorId) => {
    try {
      const response = await categoryApi.getCustomTags(majorId);
      setTags(response.data.result || []);
    } catch (error) {
      setTags([]);
    }
  }, []);

  useEffect(() => {
    fetchTags(CATEGORY_MAP['암기']);
  }, [fetchTags]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategoryName(categoryName);
    const majorId = CATEGORY_MAP[categoryName];
    fetchTags(majorId); 
  };

  const handleAddTag = async (tagName, selectedCategory) => {
    if (!tagName.trim()) return;
    const majorId = CATEGORY_MAP[selectedCategory];

    try {
      await categoryApi.createCustomTag(tagName, majorId);
      await fetchTags(majorId); 
    } catch (error) {
      Alert.alert('알림', '태그 생성 실패');
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await categoryApi.deleteCustomTag(tagId);
      await fetchTags(CATEGORY_MAP[selectedCategoryName]);
    } catch (error) {
      Alert.alert('알림', '삭제 실패');
    }
  };

  // 태그 추가 함수
  const addTag = () => {
    if (text.trim() === '') return;

    const newTag = {
      id: Date.now(),
      category: selectedCategory,
      content: text.trim(),
    };

    setTags([...tags, newTag]);
    setText('');
  };

  // 태그 삭제 함수
  const removeTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
      <View style={styles.container}>
        <Header totalStep={7} currentStep={6} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>커스텀 태그</Text>
          <Text style={styles.subTitle}>자유롭게 커스텀 태그를 만들어보세요.</Text>
        </View>

        <CategoryCreate 
          categories={tags} 
          onAdd={handleAddTag}
          onDelete={handleDeleteTag}
          onCategoryChange={handleCategoryChange} 
        />

        <CustomButton text={'다음'} style={styles.button} onPress={() => {}} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomTag;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.grayscale[100], 
    alignItems: 'center', 
    paddingHorizontal: 20 
  },
  titleWrapper: { 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 135, 
    marginTop: 50 
  },
  title: { 
    fontFamily: 'Pretendard-Bold', 
    fontSize: 28 
  },
  subTitle: { 
    fontFamily: 'Pretendard-Bold', 
    fontSize: 16, 
    color: colors.primary[500] 
  },
  button: { 
    position: 'absolute', 
    bottom: 50 
  },
});