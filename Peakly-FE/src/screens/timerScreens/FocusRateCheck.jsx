import { StyleSheet, Text, View, Pressable, ActivityIndicator, Alert } from 'react-native';
import TimeComparisonChart from './timerComponents/TimeComparisonChart';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/colors';
import Focus from '../../../assets/img/TM/focus.svg';
import { useState, useEffect } from 'react';
import { getPeaktimeOverlaps } from '../../api/sessions';

const FocusRateCheck = ({ navigation, route }) => {
  const { sessionId } = route.params || {};

  const [isLoading, setIsLoading] = useState(true);
  const [apiResult, setApiResult] = useState(null);
  const [mySessionData, setMySessionData] = useState(null);

  useEffect(() => {
    const fetchPeakTimeData = async () => {
      if (!sessionId) {
        Alert.alert('오류', '세션 정보를 찾을 수 없습니다.');
        navigation.goBack();
        return;
      }

      try {
        const data = await getPeaktimeOverlaps(sessionId);
        const { session, windows, baseDate } = data.result;

        // 1. 데이터는 왔지만 windows(피크타임 구간)가 비어있는 경우
        if (!windows || windows.length === 0) {
          navigation.replace('DisturbCheck', { sessionId });
          return;
        }

        setApiResult({
          baseDate: baseDate,
          windows: windows.map((w) => ({
            ...w,
            startAt: w.startedAt,
            endAt: w.endedAt,
          })),
        });

        setMySessionData({
          startAt: session.startedAt,
          endAt: session.endedAt,
        });
      } catch (error) {
        // 🚨 2. API 자체에서 "예측 결과가 없습니다"(404) 에러를 던진 경우
        if (error.message === '해당 날짜의 피크타임 예측 결과가 없습니다.') {
          navigation.replace('DisturbCheck', { sessionId });
          return; // 여기서 함수를 종료하여 Alert나 렌더링을 막습니다.
        }

        // 그 외의 진짜 네트워크 에러나 서버 에러인 경우에만 알림창을 띄웁니다.
        Alert.alert('조회 실패', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeakTimeData();
  }, [sessionId]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.grayscale[100] }]}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  return (
    <Pressable
      style={styles.gradient}
      onPress={() => navigation.navigate('DisturbCheck', { sessionId })}
    >
      <LinearGradient
        colors={[colors.grayscale[100], colors.primary[50]]}
        locations={[0.0, 1.0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>오늘의 PeakTime</Text>
            <Text style={styles.description}>PeakTime 동안 집중했어요.</Text>
          </View>
          <View style={styles.svg}>
            <Focus />
          </View>
          <View>
            {apiResult && mySessionData && (
              <TimeComparisonChart actualSession={mySessionData} apiResult={apiResult} />
            )}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default FocusRateCheck;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    marginTop: -100,
  },
  textWrapper: {
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 108,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
  },
  description: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
  },
});
