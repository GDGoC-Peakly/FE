import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Category from '../../components/Category';
import Button from '../../components/Button';
import TimerBox from '../../components/TimerBox';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/colors';
import { getSessionResult } from '../../api/sessions';
import ReportPieChart from '../reportScreens/reportComponents/ReportPieChart';

const TimerResult = ({ navigation, route }) => {
  const { sessionId } = route.params || {};

  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchResultData = async () => {
      if (!sessionId) {
        Alert.alert('오류', '세션 정보를 찾을 수 없습니다.');
        navigation.goBack();
        return;
      }

      try {
        const data = await getSessionResult(sessionId);
        setResultData(data.result);
      } catch (error) {
        Alert.alert('조회 실패', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResultData();
  }, [sessionId]);

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return '00 : 00 : 00';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };

  const getFatigueText = (level) => {
    const map = {
      1: '아주 개운해요',
      2: '개운해요',
      3: '보통이에요',
      4: '조금 피곤해요',
      5: '아주 피곤해요',
    };
    return map[level] || '-';
  };

  const getCaffeineText = (level) => {
    const map = { 0: '마시지 않았어요', 1: '적당히 마셨어요', 2: '많이 마셨어요' };
    return map[level] || '-';
  };

  const getNoiseText = (level) => {
    const map = { 0: '조용해요', 1: '보통이에요', 2: '시끄러워요' };
    return map[level] || '-';
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  const percent = resultData.achievementRate;

  return (
    <LinearGradient colors={[colors.grayscale[100], colors.primary[100]]} style={styles.container}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Peakly와 함께 집중모드로</Text>
          <View style={styles.timerWrapper}>
            <TimerBox
              time={formatTime(resultData?.totalFocusSec)}
              textColor={colors.primary[600]}
            />
          </View>
          <Text style={styles.titleText}>동안 집중했어요!</Text>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>목표 시간 달성률</Text>
            <View style={styles.graphPlaceholder}>
              <ReportPieChart percent={percent} radius={50} innerRadius={35} isTransparent={true} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>주변 환경</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>피로도</Text>
              <Text style={styles.infoValue}>
                {getFatigueText(resultData?.environment?.fatigueLevel)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>카페인</Text>
              <Text style={styles.infoValue}>
                {getCaffeineText(resultData?.environment?.caffeineIntakeLevel)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>주변 소음</Text>
              <Text style={styles.infoValue}>
                {getNoiseText(resultData?.environment?.noiseLevel)}
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={styles.infoLabel}>카테고리</Text>
              <View style={styles.categoryWrapper}>
                <Category
                  name={resultData?.majorCategory?.name || '미설정'}
                  isSelected={true}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </View>
        {resultData?.isCountedInStats === false && (
          <Text style={styles.notCountedText}>5분 미만 집중으로 통계에 반영되지 않습니다.</Text>
        )}
        <Button text="완료" onPress={() => navigation.popToTop()} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TimerResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 100,
    alignItems: 'center',
    marginBottom: 99,
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
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
    backgroundColor: colors.grayscale[100],
    width: '48%',
    borderRadius: 20,
    padding: 12,
    height: 229,
  },
  cardTitle: {
    marginTop: 10,
    color: colors.grayscale[1000],
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },
  graphPlaceholder: {
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
    alignItems: 'center',
  },
  categoryWrapper: {
    transform: [{ scale: 0.8 }],
    marginRight: -10,
  },
  infoLabel: {
    color: colors.grayscale[1000],
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
  },
  infoValue: {
    color: colors.grayscale[1000],
    fontSize: 10,
    fontFamily: 'Pretendard-Bold',
  },
  notCountedText: {
    marginTop: 20,
    color: colors.primary[500],
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
  },
});
