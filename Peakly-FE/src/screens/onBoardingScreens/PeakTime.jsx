import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import { colors } from '../../styles/colors';
import Button from './components/Button';
import InteractiveDonutChart from './components/Chart';
import CustomButton from '../../components/CustomButton';

const PeakTime = ({ navigation, route }) => {
  const [selected, setSelected] = useState('');
  const { accumulatedData } = route.params || {};

  const handleChartSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) {
      Alert.alert('알림', '시간대를 선택해주세요.');
      return;
    }
    let apiValue = '';
    switch (selected) {
      case '새벽':
        apiValue = 'DAWN';
        break;
      case '아침':
        apiValue = 'MORNING';
        break;
      case '낮':
        apiValue = 'AFTERNOON';
        break;
      case '저녁':
        apiValue = 'EVENING';
        break;
      case '밤':
        apiValue = 'NIGHT';
        break;
      default:
        apiValue = 'AFTERNOON';
    }
    navigation.navigate('Caffeine', {
      accumulatedData: {
        ...accumulatedData,
        subjectivePeaktime: apiValue,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header totalStep={7} currentStep={2} onPress={() => navigation.goBack()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>스스로 생각하는 피크타임</Text>
        <Text style={[styles.title, styles.subtitle]}>언제 가장 집중이 잘 되나요?</Text>
      </View>
      <View style={styles.chartContainer}>
        <InteractiveDonutChart onSelect={handleChartSelect} />
      </View>
      <CustomButton style={styles.button} text={'다음'} onPress={handleNext} />
    </View>
  );
};

export default PeakTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grayscale[100],
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 60,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary[500],
  },
  button: {
    width: '100%',
    marginTop: 'auto',
  },
});
