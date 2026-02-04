import { StyleSheet, Text, View } from 'react-native';
import TimeComparisonChart from '../components/TimeComparisonChart'; // 파일 경로 확인

const TM04 = () => {
  // 1. API 명세서에 있는 형태의 더미 데이터
  const mockApiResult = {
    baseDate: '2026-01-26',
    windows: [
      {
        startAt: '2026-01-26T11:30:00', // 차트 시작 시간
        endAt: '2026-01-26T15:30:00', // 차트 끝 시간
        score: 2.4,
      },
    ],
  };

  // 2. 실제 사용자가 집중한 시간 데이터 (현재 세션)
  const mySessionData = {
    startAt: '2026-01-26T11:00', // 여기가 핵심! 11:32에 시작
    endAt: '2026-01-26T14:00:00',
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
      <TimeComparisonChart apiResult={mockApiResult} actualSession={mySessionData} />
    </View>
  );
};

export default TM04;

const styles = StyleSheet.create({});
