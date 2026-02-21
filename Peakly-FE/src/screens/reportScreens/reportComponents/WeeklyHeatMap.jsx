import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../../styles/colors';

const WeeklyHeatMap = ({ focusLawn }) => {
  const getCellColor = (score) => {
    if (!score || score === 0) return colors.primary[50];
    if (score <= 1) return colors.primary[100];
    if (score <= 3) return colors.primary[400];
    return colors.primary[500];
  };

  const gridData = Array.from({ length: 168 }, (_, i) => {
    const dayIdx = Math.floor(i / 24);
    const hourIdx = i % 24;

    if (!focusLawn || dayIdx >= focusLawn.days.length) return 0;

    const dayData = focusLawn.days[dayIdx];
    const bucket = dayData.buckets.find((b) => b.index === hourIdx);

    return bucket ? bucket.focusScore : 0;
  });

  const get2HourScore = (dayIdx, slot2h) => {
    const hour1 = slot2h * 2;
    const hour2 = slot2h * 2 + 1;
    const score1 = gridData[dayIdx * 24 + hour1];
    const score2 = gridData[dayIdx * 24 + hour2];
    return Math.max(score1, score2);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.mainContent}>
        <View style={styles.dayLabelColumn}>
          <Text style={styles.labelText}>월</Text>
          <Text style={styles.labelText}>일</Text>
        </View>
        <View style={styles.gridContainer}>
          {Array.from({ length: 7 }).map((_, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {Array.from({ length: 12 }).map((_, colIdx) => {
                const score = get2HourScore(rowIdx, colIdx);
                return (
                  <View
                    key={colIdx}
                    style={[styles.cell, { backgroundColor: getCellColor(score) }]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.bottomLabelRow}>
        <Text style={styles.labelText}>0시</Text>
        <Text style={styles.labelText}>24시</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 24,
    marginTop: 12,
    backgroundColor: colors.grayscale[100],
    borderRadius: 20,
  },
  mainContent: {
    flexDirection: 'row',
  },
  gridContainer: {
    flex: 1,
  },
  dayLabelColumn: {
    marginRight: 12,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cell: {
    width: 17,
    height: 17,
    borderRadius: 2,
  },
  bottomLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginLeft: 20,
  },
  labelText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: colors.grayscale[700],
  },
});

export default WeeklyHeatMap;
