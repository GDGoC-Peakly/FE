import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import ReportPieChart from './reportComponents/ReportPieChart';
import WeeklyHeatMap from './reportComponents/WeeklyHeatMap';
import ReasonCard from './reportComponents/ReasonCard';
import ManyReasonCard from './reportComponents/ManyReasonCard';
import WeeklyPatternChart from './reportComponents/WeeklyPatternChart';

const WeekReport = () => {
  const dummyData = [
    { weekday: 'MON', avgFocusScore: 0.0 },
    { weekday: 'TUE', avgFocusScore: 3.1 },
    { weekday: 'WED', avgFocusScore: 2.8 },
    { weekday: 'THU', avgFocusScore: 0.9 },
    { weekday: 'FRI', avgFocusScore: 5.0 },
    { weekday: 'SAT', avgFocusScore: 0.0 },
    { weekday: 'SUN', avgFocusScore: 5.0 },
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
          <WeeklyHeatMap />
        </View>
        <View>
          <WeeklyPatternChart weeklyPattern={dummyData} />
        </View>
        <View>
          <ReasonCard />
        </View>
        <View style={{ marginBottom: 80 }}>
          <ManyReasonCard />
        </View>
      </View>
    </ScrollView>
  );
};

export default WeekReport;

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
  },
});
