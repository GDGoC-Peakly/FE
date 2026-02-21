import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../styles/colors';
import Button from '../../components/Button';
import TimeCard from '../../components/TimeCard';
import Backicon from '../../../assets/img/homeScreens/back_icon.svg';
import { useSleep } from '../../contexts/SleepContext';
import { useCondition } from '../../contexts/ConditionContext';
import { dailyApi } from '../../api/dailycheckin';

const DailyCheckin1 = ({ navigation, route }) => {
  const { sleepData, setSleepData } = useSleep();
  const { conditionData } = useCondition();
  const isEditMode = route?.params?.mode === 'edit';

  const parseToValidDate = (timeStr) => {
    const now = new Date();
    if (!timeStr || typeof timeStr !== 'string') return now;
    const parts = timeStr.split(':');
    now.setHours(parseInt(parts[0], 10) || 0);
    now.setMinutes(parseInt(parts[1], 10) || 0);
    now.setSeconds(0);
    return now;
  };

  const [startTime, setStartTime] = useState(() => parseToValidDate(sleepData?.startTime));
  const [endTime, setEndTime] = useState(() => parseToValidDate(sleepData?.endTime));
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState('start');
  const [tempDate, setTempDate] = useState(new Date());

  const getHHMM = (date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  const durationObj = useMemo(() => {
    let diff = endTime.getTime() - startTime.getTime();
    if (diff < 0) diff += 24 * 60 * 60 * 1000;
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { h, m, total: diff / (1000 * 60 * 60) };
  }, [startTime, endTime]);

  const handleNext = async () => {
    const startStr = getHHMM(startTime);
    const endStr = getHHMM(endTime);

    if (isEditMode) {
      try {
        const now = new Date();
        const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        if (kstDate.getUTCHours() < 5) kstDate.setUTCDate(kstDate.getUTCDate() - 1);
        const targetDate = kstDate.toISOString().split('T')[0];

        const payload = {
          bedTime: startStr,
          wakeTime: endStr,
          sleepScore: parseFloat((conditionData.value / 25) + 1),
        };

        await dailyApi.updateCheckIn(targetDate, payload);

        setSleepData({
          ...sleepData,
          startTime: startStr,
          endTime: endStr,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } catch (error) {
        Alert.alert('오류', '데이터 저장에 실패했습니다.');
      }
    } else {
      setSleepData({
        ...sleepData,
        startTime: startStr,
        endTime: endStr,
      });
      navigation.navigate('DailyCheckin2', { mode: route?.params?.mode });
    }
  };

  const size = 260;
  const strokeWidth = 40; 
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(durationObj.total / 24, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        {isEditMode ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Backicon style={styles.backIconStyle} />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyView} />
        )}
        {isEditMode && <Text style={styles.navTitle}>숙면시간</Text>}
        <View style={styles.emptyView} />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>데일리 체크인</Text>
        <Text style={styles.subTitleText}>전날의 숙면 시간을 알려주세요.</Text>
      </View>

      <View style={styles.timeCardRow}>
        <TimeCard
          label="취침시간"
          time={getHHMM(startTime)}
          onPress={() => {
            setPickerType('start');
            setTempDate(startTime);
            setShowPicker(true);
          }}
        />
        <TimeCard
          label="기상시간"
          time={getHHMM(endTime)}
          onPress={() => {
            setPickerType('end');
            setTempDate(endTime);
            setShowPicker(true);
          }}
        />
      </View>

      <View style={styles.circleGraphSection}>
        <View style={styles.graphWrapper}>
          <Svg width={size} height={size}>
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#2C2C2E" 
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#6366F1"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="none"
              transform={`rotate(-90 ${center} ${center})`}
            />
          </Svg>
          <View style={styles.centerTextContainer}>
            <Text style={styles.centerLabel}>숙면 시간</Text>
            <View style={styles.centerTimeRow}>
              <Text style={styles.timeValue}>{durationObj.h}h</Text>
              <Text style={styles.timeValue}> {durationObj.m}m</Text>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (pickerType === 'start') setStartTime(tempDate);
                  else setEndTime(tempDate);
                  setShowPicker(false);
                }}
              >
                <Text style={styles.confirmText}>확인</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDate}
              mode="time"
              display="spinner"
              is24Hour={true}
              onChange={(e, d) => d && setTempDate(d)}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button
          text={isEditMode ? '저장' : '다음'}
          bgColor={colors.grayscale[1000]}
          textColor={colors.grayscale[100]}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 21,
  },
  backIconStyle: {
    width: 34,
    height: 14,
  },
  navTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
  },
  emptyView: {
    width: 34,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 8,
  },
  subTitleText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.primary[500],
  },
  timeCardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  circleGraphSection: {
    flex: 1,
    marginBottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerLabel: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 4,
  },
  centerTimeRow: {
    flexDirection: 'row',
  },
  timeValue: {
    fontSize: 36,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cancelText: {
    fontSize: 16,
    color: '#999',
  },
  confirmText: {
    fontSize: 16,
    color: colors.primary[500],
    fontWeight: 'bold',
  },
});

export default DailyCheckin1;