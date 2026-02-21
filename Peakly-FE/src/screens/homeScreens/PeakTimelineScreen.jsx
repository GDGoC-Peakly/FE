import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator 
} from 'react-native';
import { colors } from '../../styles/colors';
import Backicon from '../../../assets/img/homeScreens/back_icon.svg';
import { useNavigation } from '@react-navigation/native';
import { homeApi } from '../../api/home'; // API import 경로 확인 필요

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HOUR_WIDTH = 80;
const START_HOUR = 0;
const END_HOUR = 24;
const TOTAL_HOURS = END_HOUR - START_HOUR + 1;
const CONTENT_WIDTH = TOTAL_HOURS * HOUR_WIDTH;

const PeakTimelineScreen = () => {
  const navigation = useNavigation();
  const scrollRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [windows, setWindows] = useState([]);
  const [baseDate, setBaseDate] = useState('');

  // 1. API 연동 함수
  const fetchPeakTime = async () => {
    setLoading(true);
    
    // 한국 시간 기준 YYYY-MM-DD 생성
    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const dateStr = kstDate.toISOString().split('T')[0];

    try {
      console.log('--- [PeakTime API Request] ---');
      const response = await homeApi.getPeakTimeData(dateStr);
      const res = response.data;

      console.log('--- [PeakTime API Response] ---');
      console.log(JSON.stringify(res, null, 2));

      if (res.isSuccess && res.result) {
        setWindows(res.result.windows || []);
        setBaseDate(res.result.baseDate);
      }
    } catch (error) {
      console.error('PeakTime Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeakTime();
  }, []);

  // 2. 시간 값 계산 함수 (ISO 문자열에서 시간 추출)
  const getHourValue = (dateStr) => {
    const d = new Date(dateStr);
    return d.getHours() + d.getMinutes() / 60;
  };

  // 3. 현재 시간으로 자동 스크롤
  useEffect(() => {
    if (!loading) {
      const currentHour = new Date().getHours();
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: Math.max(0, currentHour * HOUR_WIDTH - 20),
          animated: true,
        });
      }, 500);
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Backicon style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>피크타임</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        ref={scrollRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width: CONTENT_WIDTH + 40, paddingHorizontal: 20 }}>
          <View style={styles.timeHeaderContainer}>
            <View style={styles.timeHeaderRow}>
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                <View key={i} style={{ width: HOUR_WIDTH }}>
                  <Text style={styles.timeText}>{String(START_HOUR + i).padStart(2, '0')}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.timelineBody}>
            <View style={styles.gridOverlay}>
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                <View key={i} style={styles.gridLine} />
              ))}
            </View>

            {windows.map((item, index) => {
              // API 명세서 키: startAt, endAt
              const startVal = getHourValue(item.startAt);
              const endVal = getHourValue(item.endAt);
              
              const left = startVal * HOUR_WIDTH;
              const width = (endVal - startVal) * HOUR_WIDTH;

              // 라벨 시간 포맷 (HH:mm)
              const formatLabel = (dateStr) => {
                const d = new Date(dateStr);
                return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
              };

              return (
                <View key={index} style={[styles.peakBlock, { left, width }]}>
                  <Text style={styles.peakLabel}>피크 타임 {item.rank}위</Text>
                  <Text style={styles.peakTimeText}>
                    {`${formatLabel(item.startAt)} ~ ${formatLabel(item.endAt)}`}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.bottomBorderLine} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PeakTimelineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayscale[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    height: 60,
    marginTop: 59,
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
  },
  timeHeaderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale[300],
    marginTop: 43,
    paddingBottom: 6,
  },
  timeHeaderRow: {
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: colors.grayscale[600],
  },
  timelineBody: {
    height: SCREEN_HEIGHT * 0.7,
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  gridLine: {
    width: HOUR_WIDTH,
    height: '100%',
    borderLeftWidth: 1,
    borderColor: colors.grayscale[300],
    borderStyle: 'dashed',
  },
  peakBlock: {
    position: 'absolute',
    top: 13,
    height: 225,
    backgroundColor: colors.primary[50],
    padding: 12,
    zIndex: 1,
  },
  peakLabel: {
    fontSize: 14,
    color: colors.primary[500],
    fontFamily: 'Pretendard-Bold',
  },
  peakTimeText: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: colors.primary[500],
  },
  bottomBorderLine: {
    borderTopWidth: 1,
    borderTopColor: colors.grayscale[300],
    width: '100%',
  },
});