import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors.js';

// textColor를 props로 받도록 추가합니다.
const TimerBox = ({ time = "00 : 00 : 00", textColor }) => {
  return (
    <View style={styles.timerBox}>
      {/* 이제 외부에서 전달한 textColor가 있으면 그 색이 우선 적용됩니다. */}
      <Text style={[styles.timerText, textColor && { color: textColor }]}>
        {time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerBox: {
    backgroundColor: colors.grayscale[800],
    width: 259,
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 39, // 필요에 따라 유지하거나 제거
  },
  timerText: {
    color: colors.sub[200], // 기본값 (textColor가 없을 때)
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
  },
});

export default TimerBox;