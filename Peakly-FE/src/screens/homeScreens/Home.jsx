import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import Peakly from '../../../assets/img/homeScreens/Peakly.svg';
import Talkbox from '../../../assets/img/homeScreens/talkbox.svg';
import Character0 from '../../../assets/img/homeScreens/character.svg';
import Character1 from '../../../assets/img/homeScreens/character1.svg';
import Character2 from '../../../assets/img/homeScreens/character2.svg';
import Character3 from '../../../assets/img/homeScreens/character3.svg';
import Character4 from '../../../assets/img/homeScreens/character4.svg';
import { colors } from '../../styles/colors';
import HomeFooter from './homeComponents/HomeFooter';
import PeakTimeline from './homeComponents/PeakTimeline';
import PeakTimechart from './homeComponents/PeakTimechart';
import TimerSetup from '../../screens/timerScreens/TimerSetup';
import { useCondition } from '../../contexts/ConditionContext';
import { useSleep } from '../../contexts/SleepContext';
import { dailyApi } from '../../api/dailycheckin';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { conditionData, setConditionData } = useCondition();
  const { sleepData, setSleepData } = useSleep();
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const characterImages = [Character4, Character3, Character2, Character1, Character0];
  const conditions = ['최악이에요', '별로예요', '보통이에요', '좋아요', '최고예요!'];

  const getKSTDateString = () => {
    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    if (kstDate.getUTCHours() < 5) {
      kstDate.setUTCDate(kstDate.getUTCDate() - 1);
    }
    return kstDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    const checkTodayData = async () => {
      const targetStr = getKSTDateString();

      try {
        const response = await dailyApi.getCheckIn(targetStr);

        if (response.data.isSuccess && response.data.result) {
          const res = response.data.result;
 
          const [bH, bM] = res.bedTime.split(':');
          const [wH, wM] = res.wakeTime.split(':');
          const start = new Date();
          start.setHours(parseInt(bH, 10), parseInt(bM, 10), 0, 0);
          let end = new Date();
          end.setHours(parseInt(wH, 10), parseInt(wM, 10), 0, 0);
          if (end <= start) end.setDate(end.getDate() + 1);
          const diffHours = (end - start) / (1000 * 60 * 60);

          setSleepData({
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            hours: Math.floor(diffHours),
            minutes: Math.round((diffHours % 1) * 60),
            totalHours: diffHours,
          });

          const scoreIndex = res.sleepScore - 1;
          setConditionData({
            text: conditions[scoreIndex],
            image: characterImages[scoreIndex],
            value: scoreIndex * 25,
          });

          await AsyncStorage.setItem('LAST_CHECKIN_DATE', targetStr);
        } else {
          navigation.navigate('DailyCheckin1', { mode: 'onboarding' });
        }
      } catch (error) {
        if (isFocused) {
          navigation.navigate('DailyCheckin1', { mode: 'onboarding' });
        }
      }
    };

    if (isFocused) {
      checkTodayData();
    }
  }, [isFocused]);

  const size = 100;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = sleepData.totalHours / 24;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Peakly style={styles.logo} />
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
        <View style={styles.row}>
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
                  <Text style={styles.sleepText}>{sleepData.hours}h {sleepData.minutes}m</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.card, styles.halfCard]} 
            onPress={() => navigation.navigate('DailyCheckin2', { mode: 'edit' })}
          >
            <Text style={styles.smallCardTitle}>컨디션</Text>
            <View style={styles.characterContainer}>
              {conditionData.image && <conditionData.image width={70} height={90} />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120
  },
  logo: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    marginBottom: 20
  },
  peakCard: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    marginBottom: 12
  },
  yellowBanner: {
    backgroundColor: colors.sub[200],
    paddingVertical: 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center'
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000'
  },
  cardPadding: {
    padding: 12
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 4
  },
  cardSubTitle: {
    fontSize: 12,
    marginBottom: 15
  },
  card: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  cardDateTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 12
  },
  timerWrapper: {
    alignItems: 'center',
    marginBottom: 25
  },
  customTimerBox: {
    backgroundColor: colors.primary[500],
    width: '100%',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customTimerText: {
    color: colors.grayscale[100],
    fontSize: 32,
    fontFamily: 'Pretendard-Bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  halfCard: {
    width: '48%',
    height: 227
  },
  smallCardTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold'
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  talkboxWrapper: {
    width: 90,
    height: 40,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  conditionTalkbox: {
    position: 'absolute'
  },
  talkboxTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  conditionTagText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    paddingTop: 15
  },
  circleGraphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  graphWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerTextContainer: {
    position: 'absolute'
  },
  sleepText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500]
  },
  timeChartPlaceholder: {
    width: '100%',
    height: 150,
    marginTop: 10,
    overflow: 'hidden'
  },
  barChartPlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});

export default Home;