import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { colors } from '../../../styles/colors';

const HOUR_WIDTH = 80; 
const START_HOUR = 0;   
const END_HOUR = 24;    
const TOTAL_HOURS = END_HOUR - START_HOUR + 1;
const CONTENT_WIDTH = TOTAL_HOURS * HOUR_WIDTH;

const PeakTimeline = ({ windows = [] }) => {
  const scrollRef = useRef(null); 

  const getHourValue = (dateStr) => {
    const d = new Date(dateStr);
    return d.getHours() + d.getMinutes() / 60;
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    const scrollToX = currentHour * HOUR_WIDTH;
    setTimeout(() => {
      scrollRef.current?.scrollTo({ 
        x: Math.max(0, scrollToX - 20), 
        animated: true 
      });
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollRef} 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ width: CONTENT_WIDTH + 20 }}
      >
        <View style={{ width: CONTENT_WIDTH }}>
          <View style={styles.timeHeaderContainer}>
            <View style={styles.timeHeaderRow}>
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                <View key={i} style={{ width: HOUR_WIDTH }}>
                  <Text style={styles.timeText}>{String(START_HOUR + i).padStart(2, '0')}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.timelineBody}>
            <View style={styles.gridOverlay}>
              {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                <View key={i} style={styles.gridLine} />
              ))}
            </View>

            {windows.map((item, index) => {
              const startVal = getHourValue(item.startedAt);
              const endVal = getHourValue(item.endedAt);
              const left = startVal * HOUR_WIDTH;
              const width = (endVal - startVal) * HOUR_WIDTH;
              
              const startLabel = new Date(item.startedAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
              });
              const endLabel = new Date(item.endedAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
              });

              return (
                <View key={index} style={[styles.peakBlock, { left, width }]}>
                  <Text style={styles.peakLabel}>피크 타임</Text>
                  <Text style={styles.peakTimeText}>{`${startLabel} ~ ${endLabel}`}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.bottomBorderLine} />
        </View>
      </ScrollView>
    </View>
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