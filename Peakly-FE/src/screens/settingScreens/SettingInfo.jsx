import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import SettingHeader from './settingComponents/SettingHeader';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';

const SettingInfo = ({ navigation }) => {
  const [selectedValues, setSelectedValues] = useState({
    chrono: '저녁형',
    peak: '밤-새벽',
    caffeine: '보통이에요',
    noise: '매우 민감해요',
    job: '대학생',
  });

  // 드롭다운 옵션 데이터
  const options = {
    chrono: ['아침형', '중간형', '저녁형'],
    peak: ['오전', '오후', '저녁', '밤', '밤-새벽'],
    caffeine: ['민감해요', '보통이에요', '강해요'],
    noise: ['상관없어요', '보통이에요', '매우 민감해요'],
    job: ['대학생', '취준생', '직장인', '기타'],
  };

  // 2. 값을 변경하는 함수
  const handleSelect = (key, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 개별 드롭다운 컴포넌트
  const DropdownSelector = ({ label, id, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentText = selectedValues[id]; 

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        
        <TouchableOpacity 
          style={[styles.dropdown, isOpen && styles.dropdownOpen]} 
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.7}
        >
          <Text style={styles.dropdownText}>{currentText}</Text>
          <Ionicons 
            name={isOpen ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={colors.grayscale[500]} 
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.optionsWrapper}>
            {items.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.optionItem}
                onPress={() => {
                  handleSelect(id, item); 
                  setIsOpen(false);      
                }}
              >
                <Text style={[
                  styles.optionText, 
                  item === currentText && styles.selectedOptionText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SettingHeader title="기본정보" onBack={() => navigation?.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DropdownSelector label="크로노타입" id="chrono" items={options.chrono} />
        <DropdownSelector label="나의 피크타임" id="peak" items={options.peak} />
        <DropdownSelector label="카페인 반응도" id="caffeine" items={options.caffeine} />
        <DropdownSelector label="소음 반응도" id="noise" items={options.noise} />
        <DropdownSelector label="직업" id="job" items={options.job} />

      </ScrollView>
      <View style={styles.bottomWrapper}>
        <Button text="완료" bgColor="#111" textColor="#FFF" onPress={() => { navigation?.goBack();}}/>
    </View>
    </SafeAreaView>
  );
};

export default SettingInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100], 
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 11,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    borderColor: colors.grayscale[300],
  },
  dropdownText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
  },
  optionsWrapper: {
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.grayscale[100],
    paddingBottom: 8,
    zIndex: 10,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 20,
    color: colors.grayscale[1000],
  },
  selectedOptionText: {
    color: colors.grayscale[500],
  },
    bottomWrapper: { 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        height: 100 
    },
});
