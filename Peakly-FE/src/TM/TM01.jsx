import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Dimensions, Modal, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import Category from '../component/Category.jsx';
import { colors } from '../styles/colors.js';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_HEIGHT = 44; 
const PADDING_HORIZONTAL = 20; 
const SLIDER_CONTAINER_PADDING = 20;

const TM01 = ({ isVisible, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('논리·사고');
  const [fatigue, setFatigue] = useState(50);
  const [caffeine, setCaffeine] = useState(50);
  const [noise, setNoise] = useState(0); 

  const [hour, setHour] = useState(2);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const categories = [
    { id: 'logic', name: '논리·사고', icon: require('../../assets/img/TM/logic_icon_g.png'), activeIcon: require('../../assets/img/TM/logic_icon_b.png') },
    { id: 'memo', name: '암기', icon: require('../../assets/img/TM/memorization_icon_g.png'), activeIcon: require('../../assets/img/TM/memorization_icon_b.png') },
    { id: 'understand', name: '이해', icon: require('../../assets/img/TM/understanding_icon_g.png'), activeIcon: require('../../assets/img/TM/understanding_icon_b.png') }, 
    { id: 'repeat', name: '반복', icon: require('../../assets/img/TM/repeat_icon_g.png'), activeIcon: require('../../assets/img/TM/repeat_icon_b.png') },
    { id: 'creativity', name: '창의·구상', icon: require('../../assets/img/TM/creativity_icon_g.png'), activeIcon: require('../../assets/img/TM/creativity_icon_b.png') },
  ];

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
    if (val <= 25) return "조금 조용해요";
    if (val <= 50) return "보통이에요";
    if (val <= 75) return "조금 시끄러워요";
    return "시끄러워요";
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.topDismiss} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheetContainer}>
          <View style={styles.handle} />
          
          <ScrollView scrollEnabled={scrollEnabled} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionTitle}>카테고리 선택</Text>
            <View style={styles.whiteCard}>
              <View style={styles.categoryWrapper}>
                {categories.map((item) => (
                  <Category
                    key={item.id}
                    name={item.name}
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    isSelected={selectedCategory === item.name}
                    onPress={() => setSelectedCategory(item.name)}
                  />
                ))}
              </View>
            </View>

            <Text style={styles.sectionTitle}>컨디션</Text>
            <View style={styles.whiteCard}>
              <ConditionSlider label="피로도" value={fatigue} step={25} onValueChange={setFatigue} valueText={getFatigueText(fatigue)} dotCount={5} />              
              <ConditionSlider label="카페인 섭취" subLabel="최근 6시간 이내" value={caffeine} step={50} onValueChange={setCaffeine} valueText={getCaffeineText(caffeine)} dotCount={3} />
              <ConditionSlider label="현재 주변 소음" value={noise} step={25} onValueChange={setNoise} valueText={getNoiseText(noise)} isLast dotCount={5} />
            </View>

            <Text style={styles.sectionTitle}>목표 시간</Text>
            <View style={styles.whiteCard} onStartShouldSetResponderCapture={() => { setScrollEnabled(false); return false; }}>
              <View style={styles.pickerContainer}>
                <View style={styles.selectionIndicator} />
                <WheelPicker data={[...Array(24).keys()]} selected={hour} onSelect={(val) => {setHour(val); setScrollEnabled(true);}} label="시간" />
                <WheelPicker data={[...Array(60).keys()]} selected={min} onSelect={(val) => {setMin(val); setScrollEnabled(true);}} label="분" />
                <WheelPicker data={[...Array(60).keys()]} selected={sec} onSelect={(val) => {setSec(val); setScrollEnabled(true);}} label="초" />
              </View>
            </View>
            <View style={{ height: 30 }} />
          </ScrollView>

          <View style={styles.bottomWrapper}>
            <TouchableOpacity style={styles.startBtn} onPress={onClose}>
              <Text style={styles.startBtnText}>▶  집중모드 시작</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// --- 커스텀 슬라이더 컴포넌트 ---
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
        
        <View 
          style={[
            styles.customThumbContainer, 
            { left: left - (thumbSize / 2) }
          ]} 
          pointerEvents="none"
        >
          <View style={styles.customThumbOuter}>
             <View style={styles.customThumbInner} />
          </View>
        </View>

        <Slider 
          style={styles.actualSlider}
          minimumValue={0} 
          maximumValue={100} 
          step={step} 
          value={value} 
          onValueChange={onValueChange} 
          minimumTrackTintColor="transparent" 
          maximumTrackTintColor="transparent"
          thumbTintColor="transparent"
        />
      </View>
      <Text style={styles.valueText}>{valueText}</Text>
    </View>
  );
};

// --- 휠 피커 ---
const WheelPicker = ({ data, selected, onSelect, label }) => {
  const modifiedData = ['', ...data, ''];
  return (
    <View style={styles.wheelWrapper}>
      <FlatList
        data={modifiedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <Text style={[styles.itemText, selected === item && styles.selectedItemText]}>
              {item !== '' ? item : ''}
              {item !== '' && selected === item && <Text style={styles.unitText}> {label}</Text>}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
          if (data[index] !== undefined) onSelect(data[index]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  topDismiss: { flex: 1 },
  sheetContainer: { backgroundColor: colors.grayscale[200], borderTopLeftRadius: 22, borderTopRightRadius: 22, height: SCREEN_HEIGHT * 0.88, paddingHorizontal: PADDING_HORIZONTAL },
  handle: { width: 95, height: 6, backgroundColor: colors.grayscale[300], borderRadius: 20, alignSelf: 'center', marginVertical: 10 },
  scrollContent: { paddingBottom: 20 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: colors.grayscale[1000], marginBottom: 12, marginTop: 10 },
  whiteCard: { backgroundColor: colors.grayscale[100], borderRadius: 20, padding: SLIDER_CONTAINER_PADDING, marginBottom: 35 },
  categoryWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  conditionItem: { marginBottom: 14 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  label: { fontSize: 16, fontWeight: '700', color: colors.grayscale[900] },
  subLabel: { fontSize: 10, color: colors.grayscale[500] },
  
  sliderWrapper: { height: 40, justifyContent: 'center', marginVertical: 9},
  sliderBackgroundLine: { position: 'absolute', width: '100%', height: 2, backgroundColor: colors.grayscale[200], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2 },
  sliderDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E5E5E5' }, 
  actualSlider: { width: '100%', height: 40, zIndex: 2 },
  
  // 커스텀 핸들 스타일
  customThumbContainer: { position: 'absolute', zIndex: 3, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  customThumbOuter: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primary[600], justifyContent: 'center', alignItems: 'center' },
  customThumbInner: { width: 14, height: 14, borderRadius: 6, backgroundColor: colors.primary[100] },

  valueText: { textAlign: 'center', fontSize: 13, color: colors.primary[600], fontWeight: '600', marginTop: -4 },

  pickerContainer: { flexDirection: 'row', alignItems: 'center', height: ITEM_HEIGHT * 3 },
  wheelWrapper: { flex: 1, height: ITEM_HEIGHT * 3},
  itemWrapper: { height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' },
  itemText: { fontSize: 18, color: colors.grayscale[300] },
  selectedItemText: { color: colors.primary[600], fontWeight: '800', fontSize: 22 },
  unitText: { fontSize: 15, fontWeight: '400', color: colors.primary[600] },
  selectionIndicator: { position: 'absolute', left: 0, right: 0, height: ITEM_HEIGHT, borderWidth: 1.5, borderColor: colors.primary[600], borderRadius: 18, top: ITEM_HEIGHT,  backgroundColor: colors.primary[100] },
  bottomWrapper: { paddingBottom: Platform.OS === 'ios' ? 30 : 20, paddingTop: 10 },
  startBtn: { backgroundColor: colors.primary[600], borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center' },
  startBtnText: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});

export default TM01;