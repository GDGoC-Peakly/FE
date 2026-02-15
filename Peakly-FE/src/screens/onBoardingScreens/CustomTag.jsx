import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';
import CategoryCreate from '../../components/CategoryCreate';
import { categoryApi } from '../../api/category';

const CustomTag = () => {
  const [majorCategories, setMajorCategories] = useState([]); 
  const [tags, setTags] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const fetchMajors = useCallback(async () => {
    try {
      const response = await categoryApi.getMajorCategories();
      // console.log("대분류 목록 API", response.data.result);
      
      const majors = response.data.result || [];
      setMajorCategories(majors);

      if (majors.length > 0) {
        setSelectedCategory(majors[0]);
        fetchTags(majors[0].id);
      }
    } catch (error) {
      Alert.alert('에러', '대분류를 불러오지 못했습니다.');
    }
  }, []);


  const fetchTags = useCallback(async (majorId) => {
    if (!majorId) return;
    try {
      const response = await categoryApi.getCustomTags(majorId);
      setTags(response.data.result || []);
    } catch (error) {
      setTags([]);
    }
  }, []);

  useEffect(() => {
    fetchMajors();
  }, [fetchMajors]);


  const handleCategoryChange = (categoryName) => {
    const target = majorCategories.find(c => c.name === categoryName);
    if (target) {
      setSelectedCategory(target);
      fetchTags(target.id);
    }
  };

  const handleAddTag = async (tagName) => {
    if (!tagName.trim() || !selectedCategory) return;
    try {
      const response = await categoryApi.createCustomTag(tagName.trim(), selectedCategory.id);
      // console.log("[API 성공] 태그 생성 완료:", response.data);
      await fetchTags(selectedCategory.id);
    } catch (error) {
      const errorMsg = error.response?.data?.message || '태그 생성 실패';
      Alert.alert('알림', errorMsg);
    }
  };


  const handleDeleteTag = async (tagId) => {
    try {
      await categoryApi.deleteCustomTag(tagId);
      // console.log("[API 성공] 태그 삭제 완료");
      await fetchTags(selectedCategory.id);
    } catch (error) {
      Alert.alert('알림', '삭제 실패');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header totalStep={7} currentStep={6} />

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>커스텀 태그</Text>
          <Text style={styles.subTitle}>자유롭게 커스텀 태그를 만들어보세요.</Text>
        </View>

        {majorCategories.length > 0 ? (
          <CategoryCreate 
            majorCategoryNames={majorCategories.map(c => c.name)} 
            currentTags={tags} 
            onAdd={handleAddTag}
            onDelete={handleDeleteTag}
            onCategoryChange={handleCategoryChange} 
            initialCategory={selectedCategory?.name}
          />
        ) : (
          <Text style={{ marginTop: 20 }}>카테고리를 불러오는 중입니다...</Text>
        )}

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