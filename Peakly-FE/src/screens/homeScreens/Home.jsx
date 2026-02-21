import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const [loading, setLoading] = useState(true);

  const characterImages = [Character4, Character3, Character2, Character1, Character0];
  const conditions = ['최악이에요', '별로예요', '보통이에요', '좋아요', '최고예요!'];

  useEffect(() => {
    const fetchHomeData = async () => {
      if (!isFocused) return;
      setLoading(true);

      const now = new Date();
      const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
      if (kstDate.getUTCHours() < 5) kstDate.setUTCDate(kstDate.getUTCDate() - 1);
      const targetDate = kstDate.toISOString().split('T')[0];

      console.log('--- [Home] API Fetch Start ---');
      console.log('Target Date:', targetDate);

      try {
        const response = await dailyApi.getCheckIn(targetDate);
        const res = response.data;
        
        console.log('Home API Response:', res);

        if (res.isSuccess && res.result) {
          const data = res.result;
          const hMatch = data.durationDisplay.match(/(\d+)h/);
          const mMatch = data.durationDisplay.match(/(\d+)m/);
          
          setSleepData({
            startTime: data.bedTime.substring(0, 5),
            endTime: data.wakeTime.substring(0, 5),
            hours: hMatch ? parseInt(hMatch[1]) : 0,
            minutes: mMatch ? parseInt(mMatch[1]) : 0,
            totalHours: (parseInt(hMatch ? hMatch[1] : 0)) + (parseInt(mMatch ? mMatch[1] : 0) / 60),
          });

          const scoreIndex = Math.max(0, Math.min(Math.round(data.sleepScore) - 1, 4));
          setConditionData({
            text: conditions[scoreIndex],
            image: characterImages[scoreIndex],
            value: scoreIndex * 25,
          });
          console.log('Context Update Complete:', { scoreIndex, sleepScore: data.sleepScore });
        }
      } catch (error) {
        console.error('Home API Error:', error.response?.data || error.message);
        if (error.response?.status === 404 || error.response?.data?.code === 'DAILY500_001') {
          console.log('No Data Found, Navigating to Onboarding...');
          navigation.navigate('DailyCheckin1', { mode: 'onboarding' });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [isFocused]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </SafeAreaView>
    );
  }

  const size = 100;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min((sleepData.totalHours || 0) / 24, 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <Peakly style={styles.logo} />
        <View style={styles.peakCard}>
          <View style={styles.yellowBanner}>
            <Text style={styles.bannerText}>오늘의 집중 피크타임을 확인해보세요.</Text>
          </View>
          <View style={styles.cardPadding}>
            <Text style={styles.cardTitle}>지금은 피크타임이에요!</Text>
            <Text style={styles.cardSubTitle}>오늘의 집중 피크타임을 확인해보세요.</Text>
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => navigation.navigate('PeakTimeline')}
            >
              <PeakTimeline />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardDateTitle}>누적 집중 시간</Text>
          <PeakTimechart />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.card, styles.halfCard]}
            onPress={() => navigation.navigate('DailyCheckin1', { mode: 'edit' })}
          >
            <Text style={styles.smallCardTitle}>숙면시간</Text>
            <View style={styles.graphWrapper}>
              <Svg width={size} height={size}>
                <Circle 
                  cx={50} cy={50} r={radius} 
                  stroke={colors.grayscale[200]} strokeWidth={12} fill="none" 
                />
                <Circle
                  cx={50} cy={50} r={radius}
                  stroke={colors.primary[500]} strokeWidth={12}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  fill="none" transform="rotate(-90 50 50)"
                />
              </Svg>
              <View style={styles.centerTextContainer}>
                <Text style={styles.sleepText}>{sleepData.hours}h {sleepData.minutes}m</Text>
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
      <TimerSetup isVisible={isTimerVisible} onClose={() => setIsTimerVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  logo: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  peakCard: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  yellowBanner: {
    backgroundColor: colors.sub[200],
    paddingVertical: 9,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
  },
  cardPadding: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 4,
  },
  cardSubTitle: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: colors.grayscale[600],
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
    color: colors.grayscale[1000],
    marginBottom: 12,
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
    color: colors.grayscale[1000],
  },
  graphWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  centerTextContainer: {
    position: 'absolute',
  },
  sleepText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
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
    position: 'absolute',
    marginTop: 10,
  },
  conditionTagText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
});

export default Home;