import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { BarChart, chartTypes, PieChart } from 'react-native-gifted-charts';
import { colors } from '../../styles/colors';
import { getProgressData } from '../../utils/getProgressData';
import PeakTimeTable from '../../components/PeakTimeTable';
import ReportTab from '../../components/ReportTab';

function DayReport() {
  const initialData = [
    { startTime: '03:00', endTime: '05:00' }, // 케이스 1: 완벽 일치용
    { startTime: '08:00', endTime: '10:00' }, // 케이스 2: 절반만 걸치기용
    { startTime: '13:00', endTime: '15:00' }, // 케이스 3: 아예 따로 놀기용 (예상)
    { startTime: '19:30', endTime: '21:00' }, // 케이스 4: 30분 단위 시작 테스트용
  ];

  // 2. 확정 시간 (Actual Data)
  const actualStudyData = [
    { startTime: '03:00', endTime: '05:00' }, // 케이스 1: 03-05시 완벽하게 겹침 (진한 파랑이 위를 다 덮음)
    { startTime: '09:00', endTime: '11:00' }, // 케이스 2: 9시부터 1시간만 겹치고 10~11시는 확정만 표시됨
    { startTime: '16:00', endTime: '17:30' }, // 케이스 3: 13-15시 예상과 별개로 16시에 따로 생성됨
    { startTime: '19:30', endTime: '20:15' }, // 케이스 4: 19:30부터 시작해서 예상(21시)보다 일찍 끝남
  ];
  return (
    <ScrollView style={styles.container} overScrollMode="never" bounces={false}>
      <ReportTab />
      <View style={styles.contentWrapper}>
        <Text style={styles.dateText}>2026년 2월 23일 월요일</Text>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>오늘 집중도 총평</Text>
          <Text style={styles.reviewText}>최상의 리듬입니다! 🌊</Text>
        </View>
        <View style={styles.rateContainer}>
          <View style={styles.rateRectangle}>
            <Text style={styles.rateText}>달성률</Text>
            <View style={styles.chartWrapper}>
              <PieChart
                data={getProgressData(75)}
                donut
                radius={65}
                innerRadius={48}
                innerCircleBorderColor={colors.primary[600]}
                innerCircleBorderWidth={1}
                strokeColor={colors.primary[600]}
                strokeWidth={1}
                centerLabelComponent={() => {
                  return <Text style={styles.percentageText}>75%</Text>;
                }}
              />
            </View>
          </View>
          <View style={styles.rateRectangle}>
            <View style={styles.rateTextWrapper}>
              <Text style={styles.rateText}>적중률</Text>
              <Text style={styles.statusText}>리듬 일치</Text>
            </View>
            <View style={styles.chartWrapper}>
              <PieChart
                data={getProgressData(90)}
                donut
                radius={65}
                innerRadius={48}
                innerCircleBorderColor={colors.primary[600]}
                innerCircleBorderWidth={1}
                strokeColor={colors.primary[600]}
                strokeWidth={1}
                centerLabelComponent={() => {
                  return <Text style={styles.percentageText}>90%</Text>;
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.peakTimeRectangle}>
          <Text style={styles.peakTimeText}>피크타임 적중률 비교</Text>
          <PeakTimeTable data={initialData} actualData={actualStudyData} />
        </View>
      </View>
    </ScrollView>
  );
}

export default DayReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[900],
    paddingTop: Platform.OS === 'android' ? 35 : 70,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dateText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.grayscale[100],
    marginBottom: 20,
  },
  reviewContainer: {
    paddingVertical: 20,
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.grayscale[100],
    paddingHorizontal: 20,
    paddingVertical: 20.5,
    gap: 12,
    marginBottom: 12,
  },
  reviewTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.grayscale[1000],
  },
  reviewText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  rateRectangle: {
    flex: 1,
    height: 220,
    borderRadius: 20,
    backgroundColor: colors.grayscale[100],
    paddingTop: 20,
    gap: 20,
  },
  chartWrapper: {
    alignSelf: 'center',
  },
  rateTextWrapper: {
    flexDirection: 'row',
    gap: 7,
  },
  rateText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.grayscale[1000],
    marginLeft: 20,
  },
  statusText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.grayscale[500],
    marginTop: 4,
  },
  percentageText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.primary[600],
  },
  peakTimeRectangle: {
    width: '100%',
    backgroundColor: colors.grayscale[100],
    borderRadius: 20,
    height: 750,
    paddingLeft: 20,
    paddingRight: 120,
    paddingTop: 20,
    gap: 20,
    marginBottom: 50,
  },
  peakTimeText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.grayscale[1000],
  },
});
