import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { colors } from '../../styles/colors'; // 경로 확인 필요
import { Ionicons } from '@expo/vector-icons';
import { Subtitles } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';

const CustomTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('암기');
  const categories = ['암기', '이해', '논리·사고', '반복', '창의·구상'];

  // 태그 상태 관리
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);

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
        <View style={styles.inputRow}>
          {/* 드롭다운 영역 */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[styles.categorySelector, isOpen && styles.categorySelectorOpen]}
              activeOpacity={0.7}
              onPress={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
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
                  <TouchableOpacity
                    key={index}
                    style={styles.optionItem}
                    onPress={() => {
                      setSelectedCategory(item);
                      setIsOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item === selectedCategory && styles.selectedOptionText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* 태그 입력 영역 */}
          <View style={styles.tagInputContainer}>
            <TextInput
              style={styles.tagInput}
              placeholder="태그 입력 후 엔터"
              placeholderTextColor={colors.grayscale[400]}
              value={text}
              onChangeText={setText}
              onSubmitEditing={addTag}
              returnKeyType="done"
            />
          </View>
        </View>

        {/* 태그 박스 영역 */}
        <View style={styles.tagBoxContainer}>
          <View style={styles.tagListContainer}>
            {tags.length === 0 ? (
              <Text style={styles.emptyText}>추가된 태그가 없습니다.</Text>
            ) : (
              tags.map((tag) => (
                <TouchableOpacity
                  key={tag.id}
                  style={styles.tagItem}
                  onPress={() => removeTag(tag.id)}
                >
                  <Text style={styles.tagCategory}>{tag.category}</Text>
                  <View style={styles.tagDivider} />
                  <Text style={styles.tagContent}>{tag.content}</Text>
                  <Ionicons
                    name="close"
                    size={12}
                    color={colors.primary[500]}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
        <CustomButton text={'다음'} style={styles.button} />
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
    paddingHorizontal: 20,
  },
  titleWrapper: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 135,
    marginTop: 50,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
  },
  subTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
    zIndex: 2000,
  },
  dropdownContainer: {
    width: 95,
    zIndex: 3000,
    elevation: 3000,
  },
  categorySelector: {
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
  categorySelectorOpen: {
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
  tagInputContainer: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors.grayscale[100],
    zIndex: 10,
  },
  tagInput: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    padding: 0,
    color: colors.grayscale[900],
  },
  tagBoxContainer: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 16,
    backgroundColor: colors.grayscale[100],
    marginBottom: 20,
    overflow: 'hidden',
    zIndex: 1,
    elevation: 1,
  },
  tagListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    padding: 13,
    borderRadius: 12,
    borderColor: colors.primary[500],
    borderWidth: 1,
  },
  tagCategory: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
  tagDivider: {
    width: 1,
    height: 10,
    backgroundColor: colors.grayscale[400],
    marginHorizontal: 8,
  },
  tagContent: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.primary[500],
  },
  emptyText: {
    color: colors.grayscale[400],
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
