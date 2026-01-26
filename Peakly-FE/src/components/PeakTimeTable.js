import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { colors } from '../styles/colors';

const PeakTimeTable = ({ data = [], actualData = [] }) => {
  const rows = Array.from({ length: 24 }, () => ({ predicted: [], actual: [] }));

  const handlePress = (rowIndex) => {
    const row = rows[rowIndex];
    const predictedTimes = [
      ...new Set(row.predicted.map((p) => `${p.original.startTime}~${p.original.endTime}`)),
    ];
    const actualTimes = [
      ...new Set(row.actual.map((a) => `${a.original.startTime}~${a.original.endTime}`)),
    ];
    let message = '';
    if (predictedTimes.length > 0) {
      message += `AI가 분석한 피크타임: ${predictedTimes.join(', ')}\n`;
    }
    if (actualTimes.length > 0) {
      message += `학습 시간: ${actualTimes.join(', ')}`;
    }
    if (message) {
      Alert.alert(`${rowIndex}시 시간 정보`, message.trim());
    }
  };

  const processEntries = (sourceData, type) => {
    sourceData.forEach((entry) => {
      const [sH, sM] = entry.startTime.split(':').map(Number);
      const [eH, eM] = entry.endTime.split(':').map(Number);
      let startTotal = sH * 60 + sM;
      let endTotal = eH * 60 + eM;
      if (endTotal < startTotal) endTotal += 1440;
      for (let i = 0; i < 24; i++) {
        const rowStart = i * 60;
        const rowEnd = rowStart + 60;
        const overlapStart = Math.max(startTotal, rowStart);
        const overlapEnd = Math.min(endTotal, rowEnd);
        if (overlapStart < overlapEnd) {
          rows[i][type].push({
            duration: overlapEnd - overlapStart,
            offset: overlapStart - rowStart,
            original: entry,
          });
        }
      }
    });
  };

  processEntries(data, 'predicted');
  processEntries(actualData, 'actual');

  return (
    <View style={styles.container}>
      <View style={styles.tableTopBorder} />
      <View style={styles.tableBody}>
        {rows.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.predicted.map((bar, bIdx) => (
              <Pressable
                key={`p-${index}-${bIdx}`}
                onPress={() => handlePress(index)}
                style={({ pressed }) => [
                  styles.bar,
                  {
                    left: (bar.offset / 60) * 212,
                    width: (bar.duration / 60) * 212,
                    backgroundColor: colors.primary[100],
                    opacity: pressed ? 0.6 : 1,
                    zIndex: 2,
                    borderWidth: 1,
                    borderColor: colors.primary[600],
                  },
                ]}
              />
            ))}
            {row.actual.map((bar, bIdx) => (
              <Pressable
                key={`a-${index}-${bIdx}`}
                onPress={() => handlePress(index)}
                style={({ pressed }) => [
                  styles.bar,
                  {
                    left: (bar.offset / 60) * 212,
                    width: (bar.duration / 60) * 212,
                    backgroundColor: colors.primary[600],
                    opacity: pressed ? 0.8 : 1,
                    zIndex: 3,
                  },
                ]}
              />
            ))}
            <View style={[styles.cell, styles.leftBorder, styles.rightBorder]} />
            <View style={[styles.cell, styles.rightBorder]}>
              {index === 0 && <Text style={styles.topTimeLabel}>00시</Text>}
              {index === 23 && (
                <>
                  <Text style={styles.bottomTimeLabel}>24시</Text>
                  <Text style={styles.minuteLabel30}>30분</Text>
                  <Text style={styles.minuteLabel60}>60분</Text>
                </>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableTopBorder: {
    width: 212,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.grayscale[400],
  },
  tableBody: {
    width: 212,
  },
  row: {
    flexDirection: 'row',
    height: 25,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.grayscale[400],
    position: 'relative',
    alignItems: 'center',
  },
  bar: {
    position: 'absolute',
    height: 18,
    borderRadius: 2,
  },
  cell: {
    width: 106,
    height: 25,
    backgroundColor: 'transparent',
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderColor: colors.grayscale[400],
  },
  rightBorder: {
    borderRightWidth: 1,
    borderColor: colors.grayscale[400],
  },
  topTimeLabel: {
    position: 'absolute',
    top: 0,
    left: 115,
    fontSize: 10,
    color: colors.grayscale[700],
    fontFamily: 'Pretendard-Bold',
  },
  bottomTimeLabel: {
    position: 'absolute',
    bottom: 0,
    left: 115,
    fontSize: 10,
    color: colors.grayscale[700],
    fontFamily: 'Pretendard-Bold',
  },
  minuteLabel30: {
    position: 'absolute',
    bottom: -22,
    left: -15,
    fontSize: 10,
    color: colors.grayscale[600],
  },
  minuteLabel60: {
    position: 'absolute',
    bottom: -22,
    right: -15,
    fontSize: 10,
    color: colors.grayscale[600],
  },
});
export default PeakTimeTable;
