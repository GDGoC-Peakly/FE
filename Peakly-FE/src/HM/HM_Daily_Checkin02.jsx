import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native'; 
import Slider from '@react-native-community/slider';
import { colors } from '../styles/colors';
import Button from '../component/Button';
import back_icon from '../../assets/img/HM/back_icon.png';
import character from '../../assets/img/HM/character.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_HORIZONTAL = 24;
const SLIDER_CONTAINER_PADDING = 20; 

const HM_Daily_Checkin02 = ({ navigation, route }) => {
  const mode = route?.params?.mode || 'onboarding';
// const mode = 'edit'
  const isEditMode = mode === 'edit';

  const [value, setValue] = useState(100); 
  const conditions = ['나빠요', '별로예요', '보통이에요', '좋아요!', '최고예요!'];
  const getConditionText = (val) => conditions[Math.round(val / 25)];

  const availableWidth = SCREEN_WIDTH - (PADDING_HORIZONTAL * 2) - (SLIDER_CONTAINER_PADDING * 2);
  const thumbSize = 24;
  const thumbLeft = (value / 100) * availableWidth;

  return (
    <SafeAreaView style={styles.container}>

      {isEditMode ? (
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
            <Image source={back_icon} style={styles.backIconStyle} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>컨디션</Text>
          <View style={{ width: 34 }} /> 
        </View>
      ) : (
        <View style={styles.spacer} />
      )}

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>데일리 체크인</Text>
          <Text style={styles.subTitleText}>수면의 질은 어땠나요?</Text>
        </View>

        <View style={styles.characterSection}>
          <Image source={character} style={styles.characterStyle} resizeMode="contain" />
        </View>

        <View style={styles.whiteCard}>
          <View style={styles.sliderWrapper}>
            <View style={styles.sliderBackgroundLine}>
              {[0, 1, 2, 3, 4].map((idx) => (
                <View key={idx} style={styles.sliderDot} /> 
              ))}
            </View>

            <View 
              style={[styles.customThumbContainer, { left: thumbLeft - (thumbSize / 2) }]} 
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
              step={25} 
              value={value} 
              onValueChange={setValue} 
              minimumTrackTintColor="transparent" 
              maximumTrackTintColor="transparent" 
              thumbTintColor="transparent"
            />
          </View>
          <Text style={styles.conditionText}>{getConditionText(value)}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button 
          text="완료" 
          bgColor={colors.grayscale[1000]} 
          textColor={colors.grayscale[100]}
        />
      </View>
    </SafeAreaView>
  );
};

export default HM_Daily_Checkin02;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.grayscale[100] },
  scrollContent: { paddingHorizontal: PADDING_HORIZONTAL, paddingBottom: 40 },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 56, paddingHorizontal: 21,marginBottom: 58 },
  backIconStyle: { width: 34, height: 14 },
  navTitle: { fontSize: 24, fontFamily: 'Pretendard-Bold', color: colors.grayscale[1000] },
  spacer: { height: 60 },

  headerContainer: { marginTop: 20, alignItems: 'center', marginBottom: 20 },
  titleText: { fontSize: 28, fontFamily: 'Pretendard-Bold', color: colors.grayscale[1000], marginBottom: 8 },
  subTitleText: { fontSize: 16, fontFamily: 'Pretendard-Bold', color: colors.primary[500] },
  
  characterSection: { alignItems: 'center'},
  characterStyle: { width: 220, height: 280 },
  
  whiteCard: { 
    backgroundColor: colors.grayscale[100], 
    borderRadius: 20, 
    padding: SLIDER_CONTAINER_PADDING,
  },

  sliderWrapper: { height: 44, justifyContent: 'center' },
  sliderBackgroundLine: { 
    position: 'absolute', width: '100%', height: 2, backgroundColor: colors.grayscale[200], 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2 
  },

  sliderDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.grayscale[200] }, 
  actualSlider: { width: '100%', height: 44, zIndex: 10 },
  
  customThumbContainer: { position: 'absolute', zIndex: 5, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  customThumbOuter: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary[500], justifyContent: 'center', alignItems: 'center' },
  customThumbInner: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.primary[50] }, 
  
  conditionText: { textAlign: 'center', fontSize: 14, color: colors.primary[600], fontFamily: 'Pretendard-Bold', marginTop: 10 },

});