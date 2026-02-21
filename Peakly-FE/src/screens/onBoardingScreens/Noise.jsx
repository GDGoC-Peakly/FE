import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../styles/colors';
import Onboarding from '../../../assets/img/Onboarding/noiseOnboarding.svg';
import ConditionSlider from '../../components/ConditionSlider';
import Header from './components/Header';
import CustomButton from '../../components/CustomButton';

const Noise = ({ navigation, route }) => {
  const [noise, setNoise] = useState(50);
  const { accumulatedData } = route.params || {};

  const getNoiseText = (val) => {
    if (val <= 0) return '상관 없어요.';
    if (val <= 50) return '보통이에요.';
    return '매우 민감해요.';
  };

  const handleNext = () => {
    let apiValue = 1;

    if (noise <= 0) apiValue = 0;
    else if (noise <= 50) apiValue = 1;
    else apiValue = 2;
    navigation.navigate('Status', {
      accumulatedData: {
        ...accumulatedData,
        noiseSensitivity: apiValue,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header totalStep={7} currentStep={4} onPress={() => navigation.goBack()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>소음 반응도는{'\n'}어떤편인가요?</Text>
      </View>
      <Onboarding />
      <View style={styles.sliderContainer}>
        <ConditionSlider
          value={noise}
          onValueChange={setNoise}
          valueText={getNoiseText(noise)}
          step={50}
          dotCount={3}
        />
      </View>
      <CustomButton text={'다음'} style={styles.button} onPress={handleNext} />
    </View>
  );
};

export default Noise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grayscale[100],
    gap: 60,
    paddingHorizontal: 20,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary[500],
    fontFamily: 'Pretendard-Bold',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: -80,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
});
