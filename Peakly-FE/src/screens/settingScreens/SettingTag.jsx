import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import SettingHeader from './settingComponents/SettingHeader';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

const SettingTag = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('암기');
  const categories = ['암기', '이해', '논리·사고', '반복', '창의·구상'];

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <SettingHeader title="커스텀 태그" onBack={() => navigation?.goBack()} />

        <View style={styles.content}>
          <View style={styles.inputRow}>
            {/* 드롭다운 영역 */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={[styles.categorySelector, isOpen && styles.categorySelectorOpen]} 
                activeOpacity={0.7}
                onPress={() => setIsOpen(!isOpen)}
              >
                <Text style={styles.categoryText}>{selectedCategory}</Text>
                <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={colors.grayscale[500]} />
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
                      <Text style={[
                        styles.optionText, 
                        item === selectedCategory && styles.selectedOptionText
                      ]}>
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
                placeholder="커스텀 태그를 작성해보세요."
                placeholderTextColor={colors.grayscale[400]}
              />
            </View>
          </View>

          {/* 태그 박스 영역 */}
          <View style={styles.tagBoxContainer}>
          </View>
        </View>

        <Button 
          text="완료" 
          bgColor="#111" 
          textColor="#FFF" 
          onPress={() => navigation?.goBack()}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SettingTag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 1, 
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    gap: 8,
    marginBottom: 12,
  },
  dropdownContainer: {
    width: 95, 
    zIndex: 10,
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
  },
  categorySelectorOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.grayscale[500],
  },
  optionsWrapper: {
    position: 'absolute',
    top: 44,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.grayscale[100],
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
  },
  tagInputContainer: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  tagInput: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    padding: 0, 
  },
  tagBoxContainer: {
    width: '100%',
    height: 527, 
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 16,
    backgroundColor: colors.grayscale[100], 
  },
});