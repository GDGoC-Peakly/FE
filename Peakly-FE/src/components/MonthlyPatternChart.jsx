import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { colors } from '../styles/colors';

const MonthlyPatternChart = ({ weeklyPattern = [] }) => {
  const defaultData = [
    { weekOfMonth: 1, avgFocusScore: 0.0 },
    { weekOfMonth: 2, avgFocusScore: 0.0 },
    { weekOfMonth: 3, avgFocusScore: 0.0 },
    { weekOfMonth: 4, avgFocusScore: 0.0 },
    { weekOfMonth: 5, avgFocusScore: 0.0 },
  ];

  const sourceData = weeklyPattern && weeklyPattern.length > 0 ? weeklyPattern : defaultData;

  const chartData = sourceData.map((item) => ({
    value: item.avgFocusScore,
    label: `${item.weekOfMonth}주차`,
    showVerticalLine: true,
    verticalLineColor: colors.grayscale[300],
    verticalLineThickness: 1,
    verticalLineStrokeDashArray: [4, 4],
  }));

  if (chartData.length === 0) {
    return null;
  }

  const maxValue = Math.max(...chartData.map((item) => item.value));
  const peakIndex = chartData.findIndex((item) => item.value === maxValue);

  const CHART_HEIGHT = 100;
  const CHART_WIDTH = 275;
  const SPACING = 60;
  const INITIAL_SPACING = 20;

  const tooltipLeft = INITIAL_SPACING + peakIndex * SPACING - 46;
  const tooltipBottom = (maxValue / 5) * CHART_HEIGHT + 35;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주차별 패턴</Text>

      <View style={styles.contentContainer}>
        <View style={styles.chartWrapper}>
          <View style={{ height: CHART_HEIGHT + 30, width: CHART_WIDTH }}>
            <LineChart
              data={chartData}
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              thickness={2}
              color={colors.primary[500]}
              maxValue={5.5}
              noOfSections={2}
              xAxisThickness={1}
              xAxisColor={colors.grayscale[300]}
              yAxisOffset={-0.2}
              xAxisLabelTextStyle={styles.xAxisText}
              verticalLinesColor={colors.grayscale[400]}
              verticalLinesThickness={1}
              verticalLinesStrokeDashArray={[2, 2]}
              rulesType="solid"
              rulesColor={colors.grayscale[400]}
              hideYAxisText
              yAxisThickness={0}
              dataPointsColor={colors.primary[500]}
              dataPointsRadius={4}
              spacing={SPACING}
              initialSpacing={INITIAL_SPACING}
              endSpacing={INITIAL_SPACING}
            />
          </View>

          <View style={[styles.tooltip, { left: tooltipLeft, bottom: tooltipBottom }]}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>이번달의 Peak주간</Text>
            </View>
            <View style={styles.arrow} />
          </View>
        </View>

        <View style={[styles.yAxisContainer, { height: CHART_HEIGHT }]}>
          <Text style={styles.yAxisTitle}>집중도</Text>
          <View style={styles.yAxisLabels}>
            <Text style={styles.yAxisText}>높음</Text>
            <Text style={styles.yAxisText}>낮음</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginBottom: 40,
    color: colors.grayscale[1000],
  },
  contentContainer: {
    flexDirection: 'row',
  },
  chartWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  xAxisText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.grayscale[800],
  },
  yAxisContainer: {
    justifyContent: 'flex-start',
  },
  yAxisTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[900],
    marginBottom: 5,
    marginTop: -30,
  },
  yAxisLabels: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: -10,
  },
  yAxisText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: colors.grayscale[600],
  },
  tooltip: {
    position: 'absolute',
    alignItems: 'center',
    width: 110,
    zIndex: 9999,
  },
  bubble: {
    backgroundColor: colors.sub[200],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  bubbleText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    textAlign: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.sub[200],
    marginTop: -1,
  },
});

export default MonthlyPatternChart;
