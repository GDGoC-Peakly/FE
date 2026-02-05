import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { colors } from '../../../styles/colors';
import { getProgressData } from '../../../utils/getProgressData';

const ReportPieChart = ({ title, percent, status }) => {
  return (
    <View style={styles.rateRectangle}>
      <View style={styles.rateTextWrapper}>
        <Text style={styles.rateText}>{title}</Text>
        {status && <Text style={styles.statusText}>{status}</Text>}
      </View>

      <View style={styles.chartWrapper}>
        <PieChart
          data={getProgressData(percent)}
          donut
          radius={65}
          innerRadius={48}
          centerLabelComponent={() => {
            return <Text style={styles.percentageText}>{percent}%</Text>;
          }}
        />
      </View>
    </View>
  );
};

export default ReportPieChart;

const styles = StyleSheet.create({
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
    color: colors.grayscale[700],
    marginTop: 4,
  },
  percentageText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.primary[500],
  },
});
