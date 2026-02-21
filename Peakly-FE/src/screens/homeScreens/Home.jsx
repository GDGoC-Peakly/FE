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
import { homeApi } from '../../api/home';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { conditionData, setConditionData } = useCondition();
  const { sleepData, setSleepData } = useSleep();
  
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);

  const characterImages = [Character4, Character3, Character2, Character1, Character0];
  const conditions = ['최악이에요', '별로예요', '보통이에요', '좋아요', '최고예요!'];

  useEffect(() => {
    const fetchHomeData = async () => {
      if (!isFocused) return;
      setLoading(true);

      // 1. 날짜 계산 확인용 로그
      const now = new Date();
      const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
      if (kstDate.getUTCHours() < 5) kstDate.setUTCDate(kstDate.getUTCDate() - 1);
      const targetDate = kstDate.toISOString().split('T')[0];
      
      console.log('--- [API Request] ---');
      console.log('Target Date:', targetDate);

      try {
        const response = await homeApi.getHomeData(targetDate);
        const res = response.data;

        // 2. 서버 응답 전체 구조 확인
        console.log('--- [API Response Success] ---');
        console.log('Full Response:', JSON.stringify(res, null, 2));

        if (res.isSuccess && res.result) {
          setHomeData(res.result);
          const { summary, peaktime } = res.result;
          
          // 3. 주요 데이터 가공 전 로그
          console.log('Summary Data:', summary);
          console.log('PeakTime Windows Count:', peaktime?.windows?.length);

          // 수면 데이터 가공
          const totalSec = summary.sleep.sleepSec;
          const h = Math.floor(totalSec / 3600);
          const m = Math.floor((totalSec % 3600) / 60);
          
          setSleepData({
            hours: h,
            minutes: m,
            totalHours: totalSec / 3600,
          });

          // 컨디션 캐릭터 인덱스 계산 로그
          const score = summary.sleep.sleepScore;
          const scoreIndex = Math.max(0, Math.min(Math.round(score) - 1, 4));
          console.log('Sleep Score:', score, '-> Calculated Index:', scoreIndex);
          
          setConditionData({
            text: conditions[scoreIndex],
            image: characterImages[scoreIndex],
            value: scoreIndex * 25,
          });
        }
      } catch (error) {
        // 4. 에러 발생 시 상세 정보 로그
        console.error('--- [API Response Error] ---');
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
          
          if (error.response.data.code === 'DAILY500_001') {
            console.log('Redirecting to DailyCheckin1 (Daily Info Missing)');
            navigation.navigate('DailyCheckin1', { mode: 'onboarding' });
          }
        } else {
          console.error('Error Message:', error.message);
        }
      } finally {
        setLoading(false);
        console.log('--- [Fetch End] ---');
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
            <Text style={styles.cardTitle}>
              {homeData?.peaktime?.isNowInPeakTime ? "지금은 피크타임이에요!" : "집중할 준비가 되었나요?"}
            </Text>
            <Text style={styles.cardSubTitle}>오늘의 집중 피크타임을 확인해보세요.</Text>
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => {
                console.log('Navigating to PeakTimeline with:', homeData?.peaktime?.windows);
                navigation.navigate('PeakTimeline');
              }}
            >
              <PeakTimeline windows={homeData?.peaktime?.windows} />
            </TouchableOpacity>
          </View>
        </View>

        <PeakTimechart 
          totalFocusSec={homeData?.summary?.totalFocusSec} 
          baseDate={homeData?.baseDate}
        />

        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.card, styles.halfCard]}
            onPress={() => navigation.navigate('DailyCheckin1', { mode: 'edit' })}
          >
            <Text style={styles.smallCardTitle}>숙면시간</Text>
            <View style={styles.graphWrapper}>
              <Svg width={100} height={100}>
                <Circle 
                  cx={50} 
                  cy={50} 
                  r={44} 
                  stroke={colors.grayscale[200]} 
                  strokeWidth={12} 
                  fill="none" 
                />
                <Circle
                  cx={50}
                  cy={50}
                  r={44}
                  stroke={colors.primary[500]}
                  strokeWidth={12}
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - progress)}
                  fill="none"
                  transform="rotate(-90 50 50)"
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