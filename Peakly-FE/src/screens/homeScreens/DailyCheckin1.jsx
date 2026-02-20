import React, { useState } from 'react';
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
  const mode = route?.params?.mode || 'onboarding';
  const isEditMode = mode === 'edit';

  const [startTime, setStartTime] = useState(new Date(sleepData.startTime));
  const [endTime, setEndTime] = useState(new Date(sleepData.endTime));
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState('start');
  const [tempDate, setTempDate] = useState(new Date());

  const getTimeString = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getKSTDateString = (offsetDays = 0) => {
    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    if (kstDate.getUTCHours() < 5) {
      kstDate.setUTCDate(kstDate.getUTCDate() - 1);
    }
    if (offsetDays !== 0) kstDate.setDate(kstDate.getDate() + offsetDays);
    return kstDate.toISOString().split('T')[0];
  };

  const calculateDuration = () => {
    let diff = endTime.getTime() - startTime.getTime();
    if (diff < 0) diff += 24 * 60 * 60 * 1000;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return {
      hours,
      minutes,
      totalHours: diff / (1000 * 60 * 60)
    };
  };

  const { hours, minutes, totalHours } = calculateDuration();

  const handlePressNext = async () => {
    const duration = calculateDuration();
    const updatedSleep = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      hours: duration.hours,
      minutes: duration.minutes,
      totalHours: duration.totalHours,
    };

    if (isEditMode) {
      const targetStr = getKSTDateString();
      const payload = {
        bedTime: getTimeString(startTime),
        wakeTime: getTimeString(endTime),
        sleepScore: Math.round(conditionData.value / 25 + 1),
      };

      try {
        await dailyApi.updateCheckIn(targetStr, payload);
        setSleepData(updatedSleep);
        navigation.navigate('Home');
      } catch (error) {
        if (error.response && error.response.data?.code === "SLEEP400_004") {
          try {
            const yesterdayStr = getKSTDateString(-1);
            await dailyApi.updateCheckIn(yesterdayStr, payload);
            setSleepData(updatedSleep);
            navigation.navigate('Home');
          } catch (retryError) {
            Alert.alert("저장 실패", "수정 가능한 날짜가 아닙니다.");
          }
        } else {
          Alert.alert("저장 실패", "네트워크 에러가 발생했습니다.");
        }
      }
    } else {
      setSleepData(updatedSleep);
      navigation.navigate('DailyCheckin2', {
        mode: 'onboarding'
      });
    }
  };

  const size = 250;
  const strokeWidth = 45;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalHours / 24;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SafeAreaView style={styles.container}>
      <View style={isEditMode ? styles.navBar : styles.spacer}>
        {isEditMode && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Backicon style={styles.backIconStyle} />
          </TouchableOpacity>
        )}
        {isEditMode && <Text style={styles.navTitle}>숙면시간</Text>}
        {isEditMode && <View style={styles.emptyView} />}
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>데일리 체크인</Text>
        <Text style={styles.subTitleText}>전날의 숙면 시간을 알려주세요.</Text>
      </View>
      <View style={styles.timeCardRow}>
        <TimeCard
          label="취침시간"
          time={startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
          onPress={() => {
            setPickerType('start');
            setTempDate(startTime);
            setShowPicker(true);
          }}
        />
        <TimeCard
          label="기상시간"
          time={endTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
          onPress={() => {
            setPickerType('end');
            setTempDate(endTime);
            setShowPicker(true);
          }}
        />
      </View>
      <View style={styles.circleGraphSection}>
        <View style={styles.graphWrapper}>
          <Svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={colors.grayscale[200]}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={colors.primary[500]}
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
              <Text style={styles.timeValue}>{hours}h</Text>
              <Text style={styles.timeValue}> {minutes}m</Text>
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
              <TouchableOpacity onPress={() => {
                if (pickerType === 'start') setStartTime(tempDate);
                else setEndTime(tempDate);
                setShowPicker(false);
              }}>
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
          text={isEditMode ? "저장" : "다음"}
          bgColor={colors.grayscale[1000]}
          textColor={colors.grayscale[100]}
          onPress={handlePressNext}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100]
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 21,
    marginBottom: 58
  },
  backIconStyle: {
    width: 34,
    height: 14
  },
  navTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000]
  },
  emptyView: {
    width: 34
  },
  spacer: {
    height: 60
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 8
  },
  subTitleText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.primary[500]
  },
  timeCardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12
  },
  circleGraphSection: {
    flex: 1,
    marginTop: 30
  },
  graphWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerTextContainer: {
    position: 'absolute',
    alignItems: 'center'
  },
  centerLabel: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 4
  },
  centerTimeRow: {
    flexDirection: 'row'
  },
  timeValue: {
    fontSize: 36,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500]
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-end'
  },
  pickerSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale[200]
  },
  cancelText: {
    fontSize: 16,
    color: colors.grayscale[500]
  },
  confirmText: {
    fontSize: 16,
    color: colors.primary[500],
    fontFamily: 'Pretendard-Bold'
  },
});

export default DailyCheckin1;