import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

const HOUR_WIDTH = 80; 
const START_HOUR = 0;   
const END_HOUR = 24;    
const TOTAL_HOURS = END_HOUR - START_HOUR + 1;
const CONTENT_WIDTH = TOTAL_HOURS * HOUR_WIDTH;

/**
 * @param {Function} onPress - App.js에서 전달받은 화면 전환 함수
 */
const PeakTimeline = ({ onPress }) => {
  const schedules = [
    { start: 11, end: 12.5, label: '피크 타임' },
    { start: 14, end: 18, label: '피크 타임' },
  ];

  return (
    // 1. 전체 영역을 TouchableOpacity로 감싸 클릭 이벤트를 받습니다.
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={1} // 클릭 시 깜빡임 제거
    >
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ width: CONTENT_WIDTH + 20 }}
      >
        {/* 2. pointerEvents="none"을 주어 내부 요소들이 터치를 방해하지 않고 
            부모인 TouchableOpacity가 클릭을 인식하게 합니다. (가로 스크롤은 유지됨) */}
        <View style={{ width: CONTENT_WIDTH }} pointerEvents="none">
          
          {/* 1. 상단 시간 레이어 (00 01 02 포맷) */}
          <View style={styles.timeHeaderContainer}>
            <View style={styles.timeHeaderRow}>
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => {
                const hour = START_HOUR + i;
                const formattedHour = String(hour).padStart(2, '0');
                
                return (
                  <View key={i} style={{ width: HOUR_WIDTH }}>
                    <Text style={styles.timeText}>{formattedHour}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* 2. 타임라인 메인 영역 */}
          <View style={styles.timelineBody}>
            <View style={styles.gridOverlay}>
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                <View key={i} style={styles.gridLine} />
              ))}
            </View>

            {schedules.map((item, index) => {
              const left = (item.start - START_HOUR) * HOUR_WIDTH;
              const width = (item.end - item.start) * HOUR_WIDTH;
              return (
                <View key={index} style={[styles.peakBlock, { left, width }]}>
                  <Text style={styles.peakLabel}>{item.label}</Text>
                  <Text style={styles.peakTimeText}>
                    {`${Math.floor(item.start)}:00 ~ ${Math.floor(item.end)}:00`}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* 3. 하단 마감 실선 */}
          <View style={styles.bottomBorderLine} />

        </View>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default PeakTimeline;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 165,
  },
  timeHeaderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale[300],
  },
  timeHeaderRow: {
    flexDirection: 'row',
    height: 25,
  },
  timeText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
  },
  timelineBody: {
    height: 100,
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject, 
    flexDirection: 'row',
    zIndex: 0,
  },
  gridLine: {
    width: HOUR_WIDTH,
    height: '100%',
    borderLeftWidth: 1,
    borderColor: colors.grayscale[300],
    borderStyle: 'dashed', 
  },
  peakBlock: {
    position: 'absolute',
    top: 13,
    height: 72,
    backgroundColor: colors.primary[50],
    padding: 12,
    zIndex: 1, 
  },
  peakLabel: {
    fontSize: 14,
    color: colors.primary[500],
    fontFamily: 'Pretendard-Bold',
    marginBottom: 21,
  },
  peakTimeText: {
    fontSize: 12,
    color: colors.primary[500],
    fontFamily: 'Pretendard-Regular',
  },
  bottomBorderLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale[300],
    width: '100%',
  },
});