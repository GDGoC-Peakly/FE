import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { PieChart } from 'react-native-gifted-charts';
import { getProgressData } from '../../utils/getProgressData';

const WeekReport = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.dateText}>2026년 2월 23일 월요일</Text>
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
});
