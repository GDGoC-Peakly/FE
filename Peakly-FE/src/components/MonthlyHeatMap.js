import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

const MonthlyHeatMap = ({ apiData = [] }) => {
  const getCellColor = (score) => {
    if (!score || score === 0) return colors.primary[50];
    if (score <= 1) return colors.primary[100];
    if (score <= 3) return colors.primary[400];
    return colors.primary[500];
  };

  const gridData = Array.from({ length: 28 }, (_, i) => {
    const targetDate = i + 1;
    const dayInfo = apiData.find((d) => new Date(d.date).getDate() === targetDate);
    return dayInfo ? dayInfo.focusScore : 0;
  });

  const weekLabels = ['1주', '', '', '4주'];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.mainContent}>
        <View style={styles.weekLabelColumn}>
          {weekLabels.map((label, i) => (
            <View key={i} style={styles.labelCell}>
              <Text style={styles.labelText}>{label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.gridContainer}>
          {Array.from({ length: 4 }).map((_, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {Array.from({ length: 7 }).map((_, colIdx) => {
                const index = rowIdx * 7 + colIdx;
                const score = gridData[index];
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
      <View style={styles.dayLabelRow}>
        <Text style={styles.labelText}>월</Text>
        <Text style={styles.labelText}>일</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 20,
    backgroundColor: colors.grayscale[100],
    borderRadius: 20,
  },
  mainContent: {
    flexDirection: 'row',
  },
  gridContainer: {
    flex: 1,
  },
  weekLabelColumn: {
    marginRight: 12,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    width: 32,
    height: 32,
  },
  labelCell: {
    height: 15,
    justifyContent: 'center',
    marginBottom: 8,
  },
  dayLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
  },
  labelText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.grayscale[1000],
  },
});

export default MonthlyHeatMap;
