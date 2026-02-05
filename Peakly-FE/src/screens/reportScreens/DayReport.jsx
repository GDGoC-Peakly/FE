import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { colors } from '../../styles/colors';
import PeakTimeTable from './reportComponents/PeakTimeTable';
import ReportPieChart from './reportComponents/ReportPieChart';

function DayReport() {
  const initialData = [
    { startTime: '03:00', endTime: '05:00' },
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '13:00', endTime: '15:00' },
    { startTime: '19:30', endTime: '21:00' },
  ];

  const actualStudyData = [
    { startTime: '03:00', endTime: '05:00' },
    { startTime: '09:00', endTime: '11:00' },
    { startTime: '16:00', endTime: '17:30' },
    { startTime: '19:30', endTime: '20:15' },
  ];

  return (
    <ScrollView style={styles.container} overScrollMode="never" bounces={false}>
      <View style={styles.contentWrapper}>
        <Text style={styles.dateText}>2026년 2월 23일 월요일</Text>

        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>오늘 집중도 총평</Text>
          <Text style={styles.reviewText}>최상의 리듬입니다! 🌊</Text>
        </View>
        <View style={styles.rateContainer}>
          <ReportPieChart title="달성률" percent={75} />
          <ReportPieChart title="적중률" percent={90} status="리듬 일치" />
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
