import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { colors } from '../../styles/colors';
import Button from '../../components/Button';
import Backicon from '../../../assets/img/homeScreens/back_icon.svg';
import Character0 from '../../../assets/img/homeScreens/character.svg';
import Character1 from '../../../assets/img/homeScreens/character1.svg';
import Character2 from '../../../assets/img/homeScreens/character2.svg';
import Character3 from '../../../assets/img/homeScreens/character3.svg';
import Character4 from '../../../assets/img/homeScreens/character4.svg';
import { useCondition } from '../../contexts/ConditionContext';
import { useSleep } from '../../contexts/SleepContext';
import { dailyApi } from '../../api/dailycheckin';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DailyCheckin2 = ({ navigation, route }) => {
  const mode = route?.params?.mode || 'onboarding';
  const isEditMode = mode === 'edit';

  const { sleepData } = useSleep();
  const { conditionData, setConditionData } = useCondition();
  const [value, setValue] = useState(conditionData.value || 100);

  const conditions = [
    '최악이에요',
    '별로예요',
    '보통이에요',
    '좋아요',
    '최고예요!',
  ];
  const characterImages = [
    Character4,
    Character3,
    Character2,
    Character1,
    Character0,
  ];
  const currentIndex = Math.round(value / 25);
  const ActiveCharacter = characterImages[currentIndex];

  const getKSTDateString = (offsetDays = 0) => {
    const now = new Date();
    if (offsetDays !== 0) now.setDate(now.getDate() + offsetDays);

    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul',
    }).format(now);
  };

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const todayStr = getKSTDateString();
        const response = await dailyApi.getCheckIn(todayStr);
        if (response.data.isSuccess && response.data.result) {
          setValue((response.data.result.sleepScore - 1) * 25);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (isEditMode) fetchExistingData();
  }, [isEditMode]);

  const getTimeString = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '00:00';
    return `${String(d.getHours()).padStart(2, '0')}:${String(
      d.getMinutes(),
    ).padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    const todayStr = getKSTDateString();
    const payload = {
      bedTime: getTimeString(sleepData.startTime),
      wakeTime: getTimeString(sleepData.endTime),
      sleepScore: Number(currentIndex + 1),
    };

    try {
      if (isEditMode) {
        await dailyApi.updateCheckIn(todayStr, payload);
      } else {
        try {
          await dailyApi.createCheckIn(payload);
        } catch (postError) {
          const errCode = postError.response?.data?.code;
          if (
            errCode === 'SLEEP409_001' ||
            postError.response?.status === 409
          ) {
            await dailyApi.updateCheckIn(todayStr, payload);
          } else {
            throw postError;
          }
        }
      }
      await finishCheckin(todayStr);
    } catch (error) {
      const errData = error.response?.data;
      if (errData?.code === 'SLEEP400_004') {
        try {
          const yesterdayStr = getKSTDateString(-1);
          await dailyApi.updateCheckIn(yesterdayStr, payload);
          await finishCheckin(todayStr);
          return;
        } catch (retryError) {
          console.error(retryError.response?.data);
        }
      }
      Alert.alert('저장 실패', errData?.message || '정보 저장에 실패했습니다.');
    }
  };

  const finishCheckin = async (dateStr) => {
    await AsyncStorage.setItem('LAST_CHECKIN_DATE', dateStr);
    setConditionData({
      text: conditions[currentIndex],
      image: characterImages[currentIndex],
      value: value,
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const thumbLeft = (value / 100) * (SCREEN_WIDTH - 88);

  return (
    <SafeAreaView style={styles.container}>
      <View style={isEditMode ? styles.navBar : styles.spacer}>
        {isEditMode && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Backicon style={styles.backIconStyle} />
          </TouchableOpacity>
        )}
        {isEditMode && <Text style={styles.navTitle}>컨디션</Text>}
        {isEditMode && <View style={styles.emptyView} />}
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>데일리 체크인</Text>
          <Text style={styles.subTitleText}>오늘의 컨디션은 어땠나요?</Text>
        </View>
        <View style={styles.characterSection}>
          <ActiveCharacter
            width={220}
            height={280}
          />
        </View>
        <View style={styles.whiteCard}>
          <View style={styles.sliderWrapper}>
            <View
              style={styles.sliderBackgroundLine}
              pointerEvents="none"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={styles.sliderDot}
                />
              ))}
            </View>
            <View
              style={[styles.customThumbContainer, { left: thumbLeft }]}
              pointerEvents="none"
            >
              <View style={styles.customThumbOuter}>
                <View style={styles.customThumbInner} />
              </View>
            </View>
            <Slider
              style={styles.actualSlider}
              minimumValue={0}
              maximumValue={100}
              step={25}
              value={value}
              onValueChange={setValue}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="transparent"
            />
          </View>
          <Text style={styles.conditionText}>{conditions[currentIndex]}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text={isEditMode ? '저장' : '완료'}
          bgColor={colors.grayscale[1000]}
          textColor={colors.grayscale[100]}
          onPress={handleComplete}
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 21,
    marginBottom: 58,
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
  spacer: {
    height: 60,
  },
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    marginBottom: 8,
  },
  subTitleText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary[500],
  },
  characterSection: {
    alignItems: 'center',
    height: 280,
    justifyContent: 'center',
  },
  whiteCard: {
    backgroundColor: colors.grayscale[100],
    borderRadius: 20,
    padding: 20,
  },
  sliderWrapper: {
    height: 50,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderBackgroundLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.grayscale[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.grayscale[200],
  },
  actualSlider: {
    width: '100%',
    height: 50,
    zIndex: 10,
  },
  customThumbContainer: {
    position: 'absolute',
    zIndex: 5,
    width: 24,
    height: 24,
    marginLeft: -12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customThumbOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  customThumbInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary[50],
  },
  conditionText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.primary[600],
    fontFamily: 'Pretendard-Bold',
    marginTop: 10,
  },
});

export default DailyCheckin2;