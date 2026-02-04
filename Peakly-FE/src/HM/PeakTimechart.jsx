import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { colors } from '../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PeakTimechart = () => {
  // 2시간 단위 데이터 (총 12개)
  const data = [10, 25, 15, 30, 60, 40, 20, 0, 0, 0, 10, 5];
  const MAX_VALUE = 60; 
  const CHART_HEIGHT = 100;
  const VERTICAL_LINES = 12; // 24시간 / 2시간 단위 = 12칸

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        
        {/* 1. 배경 격자 레이어 (가로선 3개 + 세로선) */}
        <View style={styles.gridLayer}>
          {/* 가로선 - 60분, 30분, 바닥선 총 3개 */}
          <View style={styles.horizontalGrid}>
            <View style={[styles.hLine, styles.dashedLine]} /> {/* 상단 (60분) */}
            <View style={[styles.hLine, styles.solidLine]} />  {/* 중단 (30분) */}
            <View style={[styles.hLine, styles.baseLine]} />   {/* 하단 (바닥) */}
          </View>

          {/* 세로선 */}
          <View style={styles.verticalGrid}>
            {Array.from({ length: VERTICAL_LINES + 1 }).map((_, i) => (
              <View key={i} style={styles.vLine} />
            ))}
          </View>
        </View>

        {/* 2. 막대 그래프 영역 */}
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

        {/* 3. 우측 Y축 라벨 (00분 제거) */}
        <View style={styles.yAxis}>
          <Text style={styles.axisText}>60분</Text>
          <Text style={styles.axisText}>30분</Text>
          {/* 00분 텍스트 제거를 위해 빈 View로 높이만 유지하거나 텍스트 삭제 */}
          <View style={{ height: 12 }} /> 
        </View>
      </View>

      {/* 4. 하단 X축 라벨 */}
      <View style={styles.xAxis}>
        <Text style={styles.xAxisText}>오전 5시 (23일)</Text>
        <Text style={styles.xAxisText}>오전 5시</Text>
      </View>
    </View>
  );
};

export default PeakTimechart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chartWrapper: {
    flexDirection: 'row',
    height: 100,
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
    borderColor: colors.grayscale[300]
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
    backgroundColor: colors.primary[500],
  },
  yAxis: {
    width: 45,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 10,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
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