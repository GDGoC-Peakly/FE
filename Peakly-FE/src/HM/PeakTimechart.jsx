import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { colors } from '../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PeakTimechart = () => {
  // 2시간 단위 데이터 (총 12개)
  const data = [10, 25, 15, 30, 60, 40, 20, 0, 0, 0, 10, 5];
  const MAX_VALUE = 60; 
  const CHART_HEIGHT = 100;
  const VERTICAL_LINES = 12; 

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        
        <View style={styles.gridLayer}>
          <View style={styles.horizontalGrid}>
            <View style={[styles.hLine, styles.dashedLine]} /> 
            <View style={[styles.hLine, styles.solidLine]} />  
            <View style={[styles.hLine, styles.baseLine]} />  
          </View>

          <View style={styles.verticalGrid}>
            {Array.from({ length: VERTICAL_LINES + 1 }).map((_, i) => (
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
          <View style={{ height: 12 }} /> 
        </View>
      </View>

      <View style={styles.xAxis}>
        <Text style={styles.xAxisText}>오전 5시 (23일)</Text>
        <Text style={styles.xAxisText}>오후 5시</Text>
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