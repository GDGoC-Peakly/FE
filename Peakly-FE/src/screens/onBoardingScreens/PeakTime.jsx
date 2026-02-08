import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import { colors } from '../../styles/colors';
import OnBording from '../../../assets/img/Onboarding/onboarding1.svg';
import Button from './components/Button';
import InteractiveDonutChart from './components/Chart';
import CustomButton from '../../components/CustomButton';
const PeakTime = () => {
  const [selected, setSelected] = useState('');

  const handlePress = (type) => {
    setSelected(type);
  };

  return (
    <View style={styles.container}>
      <Header totalStep={7} currentStep={2} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>스스로 생각하는 피크타임</Text>
        <Text style={[styles.title, styles.subtitle]}>언제 가장 집중이 잘 되나요?</Text>
      </View>
      <InteractiveDonutChart />
      <CustomButton style={styles.button} text={'다음'} />
    </View>
  );
};

export default PeakTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grayscale[100],
    gap: 60,
    paddingHorizontal: 20,
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
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
});
