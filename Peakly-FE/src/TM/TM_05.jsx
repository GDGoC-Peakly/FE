import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Category from '../component/Category'; 
import Button from '../component/Button'; 
import TimerBox from '../component/TimerBox'; // 1. 타이머 컴포넌트 임포트
import { colors } from '../styles/colors';

const TM_05 = () => {
  const [selectedCategory, setSelectedCategory] = useState("논리·사고");

  const categoryData = {
    id: 1,
    name: "논리·사고",
    icon: require('../../assets/img/TM/logic_icon_g.png'), 
    activeIcon: require('../../assets/img/TM/logic_icon_b.png'), 
  };

  const handleComplete = () => {
    console.log("완료 버튼 클릭!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Peakly와 함께 집중모드로</Text>
        
        <View style={styles.timerWrapper}>
          <TimerBox time="00 : 38 : 41" />
        </View>
        
        <Text style={styles.titleText}>동안 집중했어요!</Text>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>목표 시간 달성률</Text>
          <View style={styles.graphPlaceholder}>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>주변 환경</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>피로도</Text>
            <Text style={styles.infoValue}>조금 피곤해요</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>카페인</Text>
            <Text style={styles.infoValue}>적당히 마셨어요</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>주변 소음</Text>
            <Text style={styles.infoValue}>조용해요</Text>
          </View>
          
          <View style={styles.categoryRow}>
            <Text style={styles.infoLabel}>카테고리</Text>
            <View style={styles.categoryWrapper}>
              <Category
                name={categoryData.name}
                icon={categoryData.icon}
                activeIcon={categoryData.activeIcon}
                isSelected={selectedCategory === categoryData.name}
                onPress={() => {}} 
              />
            </View>
          </View>
        </View>
      </View>

      <Button text="완료" onPress={handleComplete} />
      
    </SafeAreaView>
  );
};

export default TM_05;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[900],
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 100,
    alignItems: 'center',
    marginBottom: 99,
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[100],
  },
  timerWrapper: {
    marginVertical: 18,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 33,
  },
  card: {
    backgroundColor: colors.grayscale[800],
    width: '48%', 
    borderRadius: 20,
    padding: 12,
    height: 229, 
  },
  cardTitle: {
    marginTop: 10,
    color: colors.grayscale[100],
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginBottom: 29,
  },
  graphPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryWrapper: {
    transform: [{ scale: 0.5 }], 
    marginTop: -17,
    marginRight: -35, 
  },
  infoLabel: {
    color: colors.grayscale[100],
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
  },
  infoValue: {
    color: colors.grayscale[100],
    fontSize: 10,
    fontFamily: 'Pretendard-regular',
  },
});