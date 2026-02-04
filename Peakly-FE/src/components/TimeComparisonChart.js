import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { formatTimeLabel } from '../utils/dateUtils';
import { useTimeChartLogic } from '../hooks/useTimeChartLogic';

const TimeComparisonChart = ({ apiResult, actualSession }) => {
  const { isValid, data, state, layout, constants } = useTimeChartLogic(apiResult, actualSession);

  if (!isValid) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.labelColumn, { height: constants.CHART_HEIGHT }]}>
        <Text style={styles.staticTimeText}>{formatTimeLabel(data.expectedStart)}</Text>
        {state.hasOverlap && state.showLabel && (
          <View style={[styles.dynamicLabelContainer, { top: layout.labelTop }]}>
            <Text style={styles.highlightTimeText}>{formatTimeLabel(data.actualStart)}</Text>
          </View>
        )}
        <View style={styles.bottomLabelWrapper}>
          <Text style={styles.staticTimeText}>{formatTimeLabel(data.expectedEnd)}</Text>
        </View>
      </View>
      <View style={[styles.chartColumn, { height: constants.CHART_HEIGHT }]}>
        <View style={styles.expectedBox}>
          <View style={styles.dashedLineTop} />
          <View style={styles.dashedLineBottom} />
        </View>
        {state.hasOverlap && (
          <View style={[styles.actualBox, { top: layout.top, height: layout.height }]}>
            <View
              style={[
                styles.badgeContainerRightPurple,
                state.shouldBadgeBeAtBottom ? { top: undefined, bottom: -13 } : { top: -13 },
              ]}
            >
              <View style={styles.purpleBadge}>
                <Text style={styles.badgeTextWhite}>실제 집중한 시간</Text>
              </View>
            </View>
          </View>
        )}
        <View style={styles.badgeContainerRightYellow}>
          <View style={styles.yellowBadge}>
            <Text style={styles.badgeTextBlack}>오늘의 예상 PeakTime</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
  },
  labelColumn: {
    width: 80,
    position: 'relative',
    marginRight: 0,
  },
  staticTimeText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.grayscale[1000],
    position: 'absolute',
    fontWeight: '400',
    top: -8,
  },
  bottomLabelWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  dynamicLabelContainer: {
    position: 'absolute',
    left: 0,
    marginTop: -8,
  },
  highlightTimeText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.primary[500],
  },
  chartColumn: {
    flex: 1,
    position: 'relative',
  },
  expectedBox: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.sub[100],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  dashedLineTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.grayscale[1000],
  },
  dashedLineBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.grayscale[1000],
  },
  actualBox: {
    width: '100%',
    backgroundColor: colors.primary[300],
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  badgeContainerRightYellow: {
    position: 'absolute',
    top: -13,
    right: 9,
    zIndex: 20,
  },
  badgeContainerRightPurple: {
    position: 'absolute',
    right: 9,
    zIndex: 15,
  },
  yellowBadge: {
    backgroundColor: colors.sub[200],
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 20,
  },
  purpleBadge: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTextBlack: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.grayscale[900],
  },
  badgeTextWhite: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.grayscale[100],
  },
});

export default TimeComparisonChart;
