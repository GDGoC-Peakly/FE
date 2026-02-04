import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import backIcon from '../../assets/img/HM/back_icon.png'

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HOUR_WIDTH = 80; 
const START_HOUR = 0;   
const END_HOUR = 24;    
const TOTAL_HOURS = END_HOUR - START_HOUR + 1;
const CONTENT_WIDTH = TOTAL_HOURS * HOUR_WIDTH;

const HM_PeakTimeline = ({ onBack }) => {

  const schedules = [
    { start: 10, end: 12, label: '피크 타임' },
    { start: 14, end: 18, label: '피크 타임' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>피크타임</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ width: CONTENT_WIDTH + 40, paddingHorizontal: 20 }}>
          {/* 상단 시간 눈금 */}
          <View style={styles.timeHeaderContainer}>
            <View style={styles.timeHeaderRow}>
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                <View key={i} style={{ width: HOUR_WIDTH }}>
                  <Text style={styles.timeText}>{String(START_HOUR + i).padStart(2, '0')}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 타임라인 메인 (세로로 김) */}
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
                    {`${String(item.start).padStart(2, '0')}:00 ~ ${String(item.end).padStart(2, '0')}:00`}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.bottomBorderLine} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HM_PeakTimeline;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.grayscale[100] },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 21, height: 60, marginTop: 59},
  backIcon: { width: 24, height: 24 },
  headerTitle: { fontSize: 24, fontFamily: 'Pretendard-Bold'},
  timeHeaderContainer: { borderBottomWidth: 1, borderBottomColor: colors.grayscale[300], marginTop: 43, paddingBottom: 6},
  timeHeaderRow: { flexDirection: 'row' },
  timeText: { fontSize: 12, fontFamily: 'Pretendard-Regular'},
  timelineBody: { height: SCREEN_HEIGHT * 0.7, position: 'relative' },
  gridOverlay: { ...StyleSheet.absoluteFillObject, flexDirection: 'row' },
  gridLine: { width: HOUR_WIDTH, height: '100%', borderLeftWidth: 1, borderColor: colors.grayscale[300], borderStyle: 'dashed' },
  peakBlock: { position: 'absolute', top: 13, height: 225, backgroundColor: colors.primary[50], padding: 12, zIndex: 1 },
  peakLabel: { fontSize: 14, color: colors.primary[500], fontFamily: 'Pretendard-Bold' },
  peakTimeText: { position: 'absolute', bottom: 12, left: 12, fontSize: 12, fontFamily: 'Pretendard-Regualar', color: colors.primary[500] },
  bottomBorderLine: { borderTopWidth: 1, borderTopColor: colors.grayscale[300], width: '100%' },
});
