import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import Peakly from '../../../assets/img/homeScreens/Peakly.svg';
import Talkbox from '../../../assets/img/homeScreens/talkbox.svg';
import { colors } from '../../styles/colors';
import HomeFooter from './homeComponents/HomeFooter';
import PeakTimeline from './homeComponents/PeakTimeline';
import PeakTimechart from './homeComponents/PeakTimechart';
import TimerSetup from '../../screens/timerScreens/TimerSetup';
import { useCondition } from '../../contexts/ConditionContext';
import { useSleep } from '../../contexts/SleepContext';

const Home = () => {
  const navigation = useNavigation();
  const { conditionData } = useCondition();
  const { sleepData } = useSleep();
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const size = 100;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = sleepData.totalHours / 24;
  const strokeDashoffset = circumference * (1 - progress);

  // 컨디션 SVG 컴포넌트 추출
  const ConditionCharacter = conditionData.image;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <Peakly style={styles.logo} />

        {/* 피크타임 카드 */}
        <View style={styles.peakCard}>
          <View style={styles.yellowBanner}>
            <Text style={styles.bannerText}>오후 2시에 집중력이 폭발할 예정이에요!</Text>
          </View>
          <View style={styles.cardPadding}>
            <Text style={styles.cardTitle}>지금은 피크타임이에요!</Text>
            <Text style={styles.cardSubTitle}>오늘의 집중 피크타임을 확인해보세요.</Text>
            <TouchableOpacity 
              activeOpacity={0.7} 
              style={styles.timeChartPlaceholder} 
              onPress={() => navigation.navigate('PeakTimeline')}
            >
              <PeakTimeline style={{ flex: 1 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 누적 시간 카드 */}
        <View style={styles.card}>
          <Text style={styles.cardDateTitle}>2월 23일 누적 집중 시간</Text>
          <View style={styles.timerWrapper}>
            <View style={styles.customTimerBox}>
              <Text style={styles.customTimerText}>01 : 38 : 41</Text>
            </View>
          </View>
          <View style={styles.barChartPlaceholder}>
            <PeakTimechart />
          </View>
        </View>

        {/* 하단 2열 카드 섹션 */}
        <View style={styles.row}>
          {/* 숙면시간 */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.card, styles.halfCard]} 
            onPress={() => navigation.navigate('DailyCheckin1', { mode: 'edit' })} 
          >
            <Text style={styles.smallCardTitle}>숙면시간</Text>
            <View style={styles.circleGraphContainer}>
              <View style={styles.graphWrapper}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                  <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={colors.grayscale[200]}
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={colors.primary[500]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    fill="none"
                    transform={`rotate(-90 ${center} ${center})`}
                  />
                </Svg>
                <View style={styles.centerTextContainer}>
                  <Text style={styles.sleepText}>
                    {sleepData.hours}h {sleepData.minutes}m
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* 컨디션 */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.card, styles.halfCard]} 
            onPress={() => navigation.navigate('DailyCheckin2', { mode: 'edit' })}
          >
            <Text style={styles.smallCardTitle}>컨디션</Text>
            <View style={styles.characterContainer}>
              {/* SVG 캐릭터 렌더링 */}
              <ConditionCharacter 
                width={70} 
                height={90} 
              />
              <View style={styles.talkboxWrapper}>
                <Talkbox style={styles.conditionTalkbox} />
                <View style={styles.talkboxTextContainer}>
                  <Text style={styles.conditionTagText}>{conditionData.text}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <HomeFooter onFocusPress={() => setIsTimerVisible(true)} />

      <TimerSetup 
        isVisible={isTimerVisible} 
        onClose={() => setIsTimerVisible(false)} 
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  logo: {
    width: 100,
    height: 40,
    marginLeft: 118,
    marginBottom: 20,
  },
  peakCard: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    marginBottom: 12,
  },
  yellowBanner: {
    backgroundColor: colors.sub[200],
    paddingVertical: 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  cardPadding: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 4,
  },
  cardSubTitle: {
    fontSize: 12,
    marginBottom: 15,
  },
  card: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cardDateTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 12,
  },
  timerWrapper: {
    alignItems: 'center',
    marginBottom: 25,
  },
  customTimerBox: {
    backgroundColor: colors.primary[500],
    width: '100%',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTimerText: {
    color: colors.grayscale[100],
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: '48%',
    height: 227,
  },
  smallCardTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  talkboxWrapper: {
    width: 90,
    height: 40,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionTalkbox: {
    position: 'absolute',
  },
  talkboxTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionTagText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    paddingTop: 10,
  },
  circleGraphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  graphWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
  },
  sleepText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
  timeChartPlaceholder: {
    width: '100%',
    height: 150,
    marginTop: 10,
    overflow: 'hidden',
  },
  barChartPlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
