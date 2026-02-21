import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../../styles/colors';

const PeakTimechart = ({ totalFocusSec = 0, baseDate = "" }) => {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    return `${parseInt(month)}월 ${parseInt(day)}일`;
  };

  const data = [2, 5, 20, 60, 0, 0, 0, 0, 0, 0, 0, 0];
  const MAX_VALUE = 60;
  const CHART_HEIGHT = 80;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{formatDate(baseDate)} 누적 집중 시간</Text>
      
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(totalFocusSec)}</Text>
      </View>

      <View style={styles.chartWrapper}>
        <View style={styles.gridLayer}>
          <View style={styles.horizontalGrid}>
            <View style={[styles.hLine, styles.dashedLine]} />
            <View style={[styles.hLine, styles.solidLine]} />
            <View style={[styles.hLine, styles.baseLine]} />
          </View>
          <View style={styles.verticalGrid}>
            {Array.from({ length: 13 }).map((_, i) => (
              <View key={i} style={styles.vLine} />
            ))}
          </View>
        </View>

        <View style={styles.barsContainer}>
          {data.map((value, index) => (
            <View key={index} style={styles.barWrapper}>
              {value > 0 && (
                <View 
                  style={[
                    styles.bar, 
                    { height: (value / MAX_VALUE) * CHART_HEIGHT }
                  ]} 
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.yAxis}>
          <Text style={styles.axisText}>60분</Text>
          <Text style={styles.axisText}>30분</Text>
          <View style={{ height: 10 }} />
        </View>
      </View>

      <View style={styles.xAxis}>
        <Text style={styles.xAxisText}>오전 5시 ({parseInt(baseDate.split('-')[2])}일)</Text>
        <Text style={styles.xAxisText}>오전 5시</Text>
      </View>
    </View>
  );
};

export default PeakTimechart;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 12,
  },
  timerBox: {
    backgroundColor: '#6371F2',
    borderRadius: 16,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 36,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[100],
    letterSpacing: 2,
  },
  chartWrapper: {
    flexDirection: 'row',
    height: 80,
    position: 'relative',
  },
  gridLayer: {
    ...StyleSheet.absoluteFillObject,
    marginRight: 45,
  },
  horizontalGrid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  verticalGrid: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hLine: {
    width: '100%',
    height: 1,
  },
  vLine: {
    borderWidth: 0.6,
    height: '100%',
    borderColor: colors.grayscale[300],
    borderStyle: 'dashed',
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderColor: colors.grayscale[300],
  },
  solidLine: {
    borderBottomWidth: 1,
    borderColor: colors.grayscale[300],
  },
  baseLine: {
    borderBottomWidth: 1,
    borderColor: colors.grayscale[300],
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginRight: 45,
    zIndex: 1,
  },
  barWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  bar: {
    width: '80%',
    backgroundColor: '#6371F2',
  },
  yAxis: {
    width: 45,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingRight: 45,
  },
  axisText: {
    fontSize: 12,
    color: colors.grayscale[900],
    fontFamily: 'Pretendard-Regular',
  },
  xAxisText: {
    fontSize: 12,
    color: colors.grayscale[900],
    fontFamily: 'Pretendard-Regular',
  },
});