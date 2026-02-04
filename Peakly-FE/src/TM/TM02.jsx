import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Dimensions,} from 'react-native';
import { colors } from '../styles/colors.js';

const { width, height } = Dimensions.get('window');
const HOUR_HEIGHT = 100;

export default function CleanTimelineScreen() {
  const scrollViewRef = useRef(null);

  const peakStartTime = 11; // 11:00 AM
  const peakDuration = 1;  // n시간동안

  const hoursArray = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    const scrollToCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const position = (hours + minutes / 60) * HOUR_HEIGHT;

      scrollViewRef.current?.scrollTo({
        y: position - height / 3,
        animated: true,
      });
    };

    const timer = setTimeout(scrollToCurrentTime, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatHourLabel = (hour) => {
    if (hour === 0) return "00 : 00 AM";
    if (hour < 12) return `${hour.toString().padStart(2, '0')} : 00 AM`;
    return `${hour.toString().padStart(2, '0')} : 00 PM`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.statusChip}>
          <Text style={styles.statusTextWhite}>지금은</Text>
          <View style={styles.subjectChip}>
            <Text style={styles.subjectText}>논리·사고</Text>
          </View>
          <Text style={styles.statusTextWhite}>공부 중</Text>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.peakTimeBox, 
          { 
            top: peakStartTime * HOUR_HEIGHT + 20, 
            height: peakDuration * HOUR_HEIGHT 
          }
        ]}>
          <View style={styles.peakBadge}>
            <Text style={styles.peakBadgeText}>오늘의 예상 PeakTime</Text>
          </View>
        </View>

        {hoursArray.map((hour) => (
          <View key={hour} style={styles.hourRow}>
            <View style={styles.timeLabelContainer}>
              <Text style={styles.hourLabel}>{formatHourLabel(hour)}</Text>
            </View>
            <View style={styles.dashedLine} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[1000],
  },
  fixedHeader: {
    paddingTop: 20,
    paddingBottom: 15,
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.grayscale[1000],
    zIndex: 20,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayscale[900],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusTextWhite: {
    color: colors.grayscale[100],
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    marginHorizontal: 14,
  },
  subjectChip: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 26,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subjectText: {
    color: colors.grayscale[100],
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: height / 2, 
  },
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HOUR_HEIGHT,
    paddingHorizontal: 20,
    zIndex: 2, 
  },
  timeLabelContainer: {
    width: 90,
  },
  hourLabel: {
    color: colors.grayscale[100], 
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: colors.grayscale[100],
    borderStyle: 'dashed',
  },

  peakTimeBox: {
    position: 'absolute',
    left: 110,
    right: 20,
    backgroundColor: colors.grayscale[800], 
    zIndex: 1,
  },
  peakBadge: {
    position: 'absolute',
    top: -12, 
    right: 10,
    backgroundColor: colors.grayscale[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  peakBadgeText: {
    color: colors.primary[600],
    fontSize: 10,
    fontFamily: 'Pretendard-Bold',
  },
});