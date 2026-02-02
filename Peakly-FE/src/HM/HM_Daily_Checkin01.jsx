import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'; // Image 추가
import { colors } from '../styles/colors';
import Button from '../component/Button';
import TimeCard from '../component/TimeCard';
import back_icon from '../../assets/img/HM/back_icon.png'; 

const HM_Daily_Checkin01 = ({ navigation, route }) => {
  const mode = route?.params?.mode || 'onboarding';
//   const mode = 'edit';
  const isEditMode = mode === 'edit';

  return (
    <SafeAreaView style={styles.container}>
      {isEditMode ? (
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image 
              source={back_icon} 
              style={styles.backIconStyle} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
          <Text style={styles.navTitle}>숙면시간</Text>
          <View style={{ width: 24 }} /> 
        </View>
      ) : (
        <View style={styles.spacer} />
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>데일리 체크인</Text>
        <Text style={styles.subTitleText}>전날의 숙면 시간을 알려주세요.</Text>
      </View>

      <View style={styles.timeCardRow}>
        <TimeCard label="취침시간" time="22:00" />
        <TimeCard label="기상시간" time="06:00" />
      </View>

      {/* 그래프 영역 */}
      <View style={styles.circleGraphSection}>
        
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          text={isEditMode ? "완료" : "다음"} 
          bgColor={colors.grayscale[1000]} 
          textColor={colors.grayscale[100]}
          onPress={() => {
            if (isEditMode) {
                navigation.goBack(); 
            } else {
                navigation.navigate('HM_02'); 
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HM_Daily_Checkin01;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
    paddingHorizontal: 24, 
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    gap: 102,
    height: 60,
    marginLeft: 21,
    marginBottom: 58,
  },
  backButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconStyle: {
    width: 34,
    height: 14,
  },
  navTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
  },
  spacer: {
    height: 60, 
  },
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 8,
  },
  subTitleText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.primary[500],
  },
  timeCardRow: {
    flexDirection: 'row',
    justifyContent: 'center', 
    gap: 12, 
  },
  circleGraphSection: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 20,
    borderColor: colors.primary[500], 
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphText: {
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  }
});