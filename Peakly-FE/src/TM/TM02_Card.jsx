import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors } from '../styles/colors.js';
import TM_Modal4 from './TM_Modal4.jsx'; 

const TM02_Card = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const activeColor = isPaused ? colors.grayscale[500] : colors.primary[600];
  const gradientStart = isPaused ? colors.grayscale[300] : colors.primary[400];
  
  const accumulatedTime = "00 : 38 : 41";

  const handleConfirmExit = () => {
    setIsModalVisible(false);
    console.log("집중모드 종료가 확정되었습니다.");
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.timeTag}>
        <Text style={styles.timeTagText}>11 : 32 AM</Text>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.headerText}>목표시간까지</Text>
        <View style={styles.timerBadge}>
          <Text style={styles.timerBadgeText}>01:21:19</Text>
        </View>
        <Text style={styles.headerText}>남았어요</Text>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.gaugeWrapper}>
          <Svg width="115" height="115" viewBox="0 0 100 100">
            <Defs>
              <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={gradientStart} stopOpacity="0.8" />
                <Stop offset="100%" stopColor={activeColor} stopOpacity="1" />
              </SvgGradient>
            </Defs>
            
            {Array.from({ length: 60 }).map((_, i) => (
              <Circle
                key={i}
                cx="50" cy="50" r="48"
                fill="none"
                stroke="#fff"
                strokeWidth={i % 5 === 0 ? 5 : 1}
                strokeDasharray="1, 314"
                transform={`rotate(${i * 6}, 50, 50)`}
              />
            ))}

            <Path
              d="M 50 10 A 40 40 0 0 1 90 50 L 50 50 Z"
              fill="url(#grad)"
            />
            
            <Circle cx="50" cy="50" r="4" fill="white" />
          </Svg>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsLabel}>누적시간</Text>
          <Text style={[styles.statsValue, isPaused && { color: colors.grayscale[400] }]}>
            {accumulatedTime}
          </Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity 
          style={styles.pauseButton} 
          onPress={() => setIsPaused(!isPaused)}
        >
          <Ionicons 
            name={isPaused ? "play" : "pause"} 
            size={20} 
            color= {colors.primary[600]}
          />
        </TouchableOpacity>
        
        {/* 3. 버튼 클릭 시 모달 열기 */}
        <TouchableOpacity 
          style={styles.exitButton} 
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.exitButtonText}>집중모드 종료</Text>
        </TouchableOpacity>
      </View>

      {/* 4. TM_Modal4 컴포넌트 배치 */}
      <TM_Modal4 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        time={accumulatedTime}
        onConfirm={handleConfirmExit}
      />
    </View>
  );
};

export default TM02_Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: 351,
    height: 244,
    backgroundColor: colors.grayscale[900],
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '40%',
    zIndex: 100,
  },
  timeTag: {
    position: 'absolute',
    top: -15,
    left: 20,
    backgroundColor: colors.primary[100],
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary[600],
    zIndex: 10,
  },
  timeTagText: {
    color: colors.primary[600],
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    color: colors.grayscale[100],
    fontSize: 14,
    fontFamily: 'Pretendard-regular',
  },
  timerBadge: {
    backgroundColor: colors.grayscale[1000],
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  timerBadgeText: {
    color: colors.grayscale[100],
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 35,
    flex: 1,
  },
  gaugeWrapper: {
    width: 115,
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: colors.grayscale[100],
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 6,
  },
  statsValue: {
    color: colors.grayscale[100],
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 19,
  },
  pauseButton: {
    width: 52,
    height: 38,
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButton: {
    flex: 1,
    height: 38,
    backgroundColor: colors.primary[600],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: colors.grayscale[100],
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});