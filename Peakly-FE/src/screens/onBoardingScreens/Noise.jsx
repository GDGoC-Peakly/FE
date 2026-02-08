import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../styles/colors';
import Onboarding from '../../../assets/img/Onboarding/noiseOnboarding.svg';
import ConditionSlider from '../../components/ConditionSlider';

const Noise = () => {
  const [noise, setNoise] = useState(50);

  const getNoiseText = (val) => {
    if (val <= 0) return '반응이 없는 편이에요.';
    if (val <= 50) return '보통이에요.';
    return '매우 민감해요.';
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Noise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayscale[100],
    gap: 60,
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
    paddingHorizontal: 40,
    marginTop: -80,
  },
});
