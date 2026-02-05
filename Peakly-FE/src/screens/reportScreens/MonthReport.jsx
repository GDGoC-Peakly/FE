import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import ReportPieChart from './reportComponents/ReportPieChart';
import MonthlyHeatMap from './reportComponents/MonthlyHeatMap';
import MonthlyPatternChart from './reportComponents/MonthlyPatternChart';
import ReasonCard from './reportComponents/ReasonCard';
import ManyReasonCard from './reportComponents/ManyReasonCard';

const MonthReport = () => {
  const weeklyPatterns = [
    { weekOfMonth: 1, avgFocusScore: 2.3 },
    { weekOfMonth: 2, avgFocusScore: 4.8 },
    { weekOfMonth: 3, avgFocusScore: 3.5 },
    { weekOfMonth: 4, avgFocusScore: 1.2 },
    { weekOfMonth: 5, avgFocusScore: 4.0 },
  ];
  const basicReasons = [
    { reasonId: 1, code: 'SLEEPY', name: '졸림 ', count: 14 },
    { reasonId: 2, code: 'NOISE', name: '소음', count: 9 },
    { reasonId: 3, code: 'PHONE', name: '휴대폰', count: 7 },
  ];
  return (
    <ScrollView style={styles.container} overScrollMode="never" bounces={false}>
      <Text style={styles.dateText}>2026년 1월</Text>
      <View style={styles.contentContainer}>
        <View style={styles.rateContainer}>
          <ReportPieChart title="달성률" percent={75} />
          <ReportPieChart title="적중률" percent={90} status="리듬 일치" />
        </View>
        <View style={styles.heatMap}>
          <Text style={styles.heatMapText}>집중 잔디</Text>
          <MonthlyHeatMap />
        </View>
        <View>
          <MonthlyPatternChart weeklyPattern={weeklyPatterns} />
        </View>
        <View>
          <ReasonCard reasons={basicReasons} />
        </View>
        <View style={{ marginBottom: 80 }}>
          <ManyReasonCard reasons={basicReasons} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MonthReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[900],
    paddingTop: Platform.OS === 'android' ? 35 : 70,
    paddingHorizontal: 20,
  },
  dateText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.grayscale[100],
    marginBottom: 20,
  },
  contentContainer: {
    gap: 12,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: 12,
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
  heatMap: {
    width: '100%',
    backgroundColor: colors.grayscale[100],
    paddingVertical: 20,
    borderRadius: 20,
  },
  heatMapText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.grayscale[1000],
    marginLeft: 20,
    marginBottom: 10,
  },
});
