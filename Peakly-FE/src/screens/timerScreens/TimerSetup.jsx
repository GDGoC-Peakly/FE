import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import Category from '../../components/Category.jsx';
import Tag from '../../components/Tag.jsx'; 
import Button from '../../components/Button.jsx'; 
import { colors } from '../../styles/colors.js';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 추가

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_HEIGHT = 44; 
const PADDING_HORIZONTAL = 20; 
const SLIDER_CONTAINER_PADDING = 20;

const TimerSetup = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); // navigation 객체 생성

  const [selectedCategory, setSelectedCategory] = useState('논리·사고');
  const [selectedTag, setSelectedTag] = useState(''); 
  const [fatigue, setFatigue] = useState(50);
  const [caffeine, setCaffeine] = useState(50);
  const [noise, setNoise] = useState(0); 

  const [hour, setHour] = useState(2);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  // 집중모드 시작 버튼 클릭 시 실행될 함수
  const handleStart = () => {
    onClose(); // 먼저 모달을 닫고
    navigation.navigate('TimerRunning'); // 타이머 실행 화면으로 이동
  };

  const categories = [
    { id: 'logic', name: '논리·사고' },
    { id: 'memo', name: '암기' },
    { id: 'understand', name: '이해' },
    { id: 'repeat', name: '반복' },
    { id: 'creativity', name: '창의·구상' },
  ];

  const tags = [
    { id: 'tag1', name: 'TAG 1' },
    { id: 'tag2', name: 'TAG 1' },
    { id: 'tag3', name: 'TAG 1' },
  ];

  const firstRowCats = categories.slice(0, 3);
  const secondRowCats = categories.slice(3, 5);

  const getFatigueText = (val) => {
    if (val <= 0) return "전혀 안 피곤해요";
    if (val <= 25) return "조금 피곤해요";
    if (val <= 50) return "보통이에요";
    if (val <= 75) return "많이 피곤해요";
    return "매우 피곤해요";
  };

  const getCaffeineText = (val) => {
    if (val <= 0) return "안 마셨어요";
    if (val <= 50) return "적당히 마셨어요";
    return "많이 마셨어요";
  };

  const getNoiseText = (val) => {
    if (val <= 0) return "조용해요";
    if (val <= 50) return "보통이에요";
    return "시끄러워요";
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.topDismiss} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheetContainer}>
          <View style={styles.handle} />
          
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionTitle}>카테고리 선택</Text>
            <View style={styles.whiteCard}>
              <View style={styles.row}>
                {firstRowCats.map((item) => (
                  <Category
                    key={item.id}
                    name={item.name}
                    isSelected={selectedCategory === item.name}
                    onPress={() => setSelectedCategory(item.name)}
                  />
                ))}
              </View>
              <View style={[styles.row, { marginTop: 12 }]}>
                {secondRowCats.map((item) => (
                  <Category
                    key={item.id}
                    name={item.name}
                    isSelected={selectedCategory === item.name}
                    onPress={() => setSelectedCategory(item.name)}
                  />
                ))}
              </View>
              <View style={[styles.row, { marginTop: 20 }]}>
                {tags.map((item, index) => (
                  <Tag
                    key={`${item.id}-${index}`}
                    name={item.name}
                    isSelected={selectedTag === `${item.id}-${index}`}
                    onPress={() => setSelectedTag(`${item.id}-${index}`)}
                  />
                ))}
              </View>
            </View>

            <Text style={styles.sectionTitle}>컨디션</Text>
            <View style={styles.whiteCard}>
              <ConditionSlider label="피로도" value={fatigue} step={25} onValueChange={setFatigue} valueText={getFatigueText(fatigue)} dotCount={5} />              
              <ConditionSlider label="카페인 섭취" subLabel="최근 6시간 이내" value={caffeine} step={50} onValueChange={setCaffeine} valueText={getCaffeineText(caffeine)} dotCount={3} />
              <ConditionSlider label="현재 주변 소음" value={noise} step={50} onValueChange={setNoise} valueText={getNoiseText(noise)} isLast dotCount={3} />
            </View>

            <Text style={styles.sectionTitle}>목표 시간</Text>
            <View style={styles.whiteCard}>
              <View style={styles.pickerContainer}>
                <View style={styles.selectionIndicator} />
                <WheelPicker data={[...Array(24).keys()]} selected={hour} onSelect={setHour} label="시간" />
                <WheelPicker data={[...Array(60).keys()]} selected={min} onSelect={setMin} label="분" />
                <WheelPicker data={[...Array(60).keys()]} selected={sec} onSelect={setSec} label="초" />
              </View>
            </View>
            
            <View style={{ height: 120 }} />
          </ScrollView>

          <View style={styles.bottomWrapper}>
            {/* handleStart 함수 연결 */}
            <Button text="▶  집중모드 시작" onPress={handleStart} bgColor={colors.sub[200]} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const WheelPicker = ({ data, selected, onSelect, label }) => {
  return (
    <View style={styles.wheelWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
          if (data[index] !== undefined) onSelect(data[index]);
        }}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }} 
      >
        {data.map((item) => (
          <View key={item} style={styles.itemWrapper}>
            <Text style={[styles.itemText, selected === item && styles.selectedItemText]}>
              {item}
              {selected === item && <Text style={styles.unitText}> {label}</Text>}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ConditionSlider = ({ label, subLabel, value, onValueChange, valueText, isLast, step, dotCount }) => {
  const dots = Array.from({ length: dotCount }, (_, i) => (100 / (dotCount - 1)) * i);
  const availableWidth = SCREEN_WIDTH - (PADDING_HORIZONTAL * 2) - (SLIDER_CONTAINER_PADDING * 2);
  const thumbSize = 24;
  const left = (value / 100) * availableWidth;

  return (
    <View style={[styles.conditionItem, isLast && { marginBottom: 0 }]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>
      <View style={styles.sliderWrapper}>
        <View style={styles.sliderBackgroundLine}>
          {dots.map((_, idx) => (
            <View key={idx} style={styles.sliderDot} /> 
          ))}
        </View>
        <View style={[styles.customThumbContainer, { left: left - (thumbSize / 2) }]} pointerEvents="none">
          <View style={styles.customThumbOuter}><View style={styles.customThumbInner} /></View>
        </View>
        <Slider 
          style={styles.actualSlider}
          minimumValue={0} maximumValue={100} step={step} value={value} 
          onValueChange={onValueChange} minimumTrackTintColor="transparent" 
          maximumTrackTintColor="transparent" thumbTintColor="transparent"
        />
      </View>
      <Text style={styles.valueText}>{valueText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  topDismiss: { flex: 1 },
  sheetContainer: { backgroundColor: colors.grayscale[200], borderTopLeftRadius: 22, borderTopRightRadius: 22, height: SCREEN_HEIGHT * 0.88 },
  handle: { width: 95, height: 6, backgroundColor: colors.grayscale[300], borderRadius: 20, alignSelf: 'center', marginVertical: 10 },
  scrollContent: { paddingHorizontal: PADDING_HORIZONTAL, paddingBottom: 20 },
  sectionTitle: { fontSize: 24, fontFamily: 'Pretendard-Bold', color: colors.grayscale[1000], marginBottom: 12, marginTop: 10 },
  whiteCard: { backgroundColor: colors.grayscale[100], borderRadius: 20, padding: SLIDER_CONTAINER_PADDING, marginBottom: 35 },
  row: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10 },
  conditionItem: { marginBottom: 14 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  label: { fontSize: 16, fontFamily: 'Pretendard-Bold', color: colors.grayscale[900] },
  subLabel: { fontFamily: 'Pretendard-regular', color: colors.grayscale[500] }, 
  sliderWrapper: { height: 40, justifyContent: 'center', marginVertical: 9 },
  sliderBackgroundLine: { position: 'absolute', width: '100%', height: 3, backgroundColor: colors.grayscale[200], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2 },
  sliderDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.grayscale[200] }, 
  actualSlider: { width: '100%', height: 40, zIndex: 2 },
  customThumbContainer: { position: 'absolute', zIndex: 3, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  customThumbOuter: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primary[500], justifyContent: 'center', alignItems: 'center' },
  customThumbInner: { width: 14, height: 14, borderRadius: 6, backgroundColor: colors.primary[50] }, 
  valueText: { textAlign: 'center', fontSize: 13, color: colors.primary[600], fontFamily: 'Pretendard-Bold', marginTop: -4 },
  pickerContainer: { flexDirection: 'row', alignItems: 'center', height: ITEM_HEIGHT * 3 },
  wheelWrapper: { flex: 1, height: ITEM_HEIGHT * 3 },
  itemWrapper: { height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' },
  itemText: { fontFamily: 'Pretendard-Bold', color: colors.grayscale[300] },
  selectedItemText: { color: colors.primary[500], fontFamily: 'Pretendard-Bold', fontSize: 22 },
  unitText: { fontSize: 15, fontFamily: 'Pretendard-regular', color: colors.primary[600] },
  selectionIndicator: { position: 'absolute', left: 0, right: 0, height: ITEM_HEIGHT, borderWidth: 1.5, borderColor: colors.primary[500], borderRadius: 18, top: ITEM_HEIGHT, backgroundColor: colors.primary[50] },
});

export default TimerSetup;