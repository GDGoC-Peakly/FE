import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { colors } from '../../styles/colors.js';
import TimerRunningCard from './TimerRunningCard.jsx';
import TimerModal from './timerComponents/TimerModal.jsx';
import { pauseSession, resumeSession, endSession } from '../../api/sessions.js';

const { width, height } = Dimensions.get('window');
const HOUR_HEIGHT = 100;
const peakStartTime = 11;
const peakDuration = 1;

export default function TimerRunning({ navigation, route }) {
  const scrollViewRef = useRef(null);

  const hoursArray = Array.from({ length: 24 }, (_, i) => i);
  const { sessionId, goalDurationSec = 7200 } = route.params || {};
  const [status, setStatus] = useState('RUNNING');
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formatTime = (seconds) => {
    const s = Math.max(0, seconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
  };

  const getCurrentTimeText = () => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} ${ampm}`;
  };

  useEffect(() => {
    let timerInterval = null;
    if (status === 'RUNNING') {
      timerInterval = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [status]);

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

  const handlePause = async () => {
    try {
      await pauseSession(sessionId);
      setStatus('PAUSED');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResume = async () => {
    try {
      const result = await resumeSession(sessionId);
      setElapsedSec(result.result.totalFocusSec);
      setStatus('RUNNING');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEndClick = () => {
    if (elapsedSec < 300) {
      setIsModalVisible(true);
    } else {
      callEndApi(true);
    }
  };

  const callEndApi = async (isRecorded) => {
    try {
      const requestBody = {
        totalFocusTime: elapsedSec,
        isRecorded: isRecorded,
      };

      const response = await endSession(sessionId, requestBody);
      navigation.replace('FocusReview', {
        finalData: response.result,
        sessionId: sessionId,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const formatHourLabel = (hour) => {
    if (hour === 0) return '00 : 00 AM';
    if (hour < 12) return `${hour.toString().padStart(2, '0')} : 00 AM`;
    return `${hour.toString().padStart(2, '0')} : 00 PM`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TimerRunningCard
        currentTime={getCurrentTimeText()}
        accumulatedTime={formatTime(elapsedSec)}
        remainingTime={formatTime(goalDurationSec - elapsedSec)}
        isPaused={status === 'PAUSED'}
        onPausePress={status === 'RUNNING' ? handlePause : handleResume}
        onEndPress={handleEndClick}
      />

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
        <View
          style={[
            styles.peakTimeBox,
            {
              top: peakStartTime * HOUR_HEIGHT + 20,
              height: peakDuration * HOUR_HEIGHT,
            },
          ]}
        >
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
      <TimerModal
        visible={isModalVisible}
        title={'5분 미만 집중은 통계에\n반영되지 않아요.\n그래도 종료할까요?'}
        onClose={() => setIsModalVisible(false)}
        onConfirm={() => {
          setIsModalVisible(false);
          callEndApi(true);
        }}
      />
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
  cardWrapper: {},
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
