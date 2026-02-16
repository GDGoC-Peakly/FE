import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../styles/colors';
import Onboarding from '../../../assets/img/Onboarding/onboarding2.svg';
import ConditionSlider from '../../components/ConditionSlider';
import CustomButton from '../../components/CustomButton';
import Header from './components/Header';

const Caffeine = ({ navigation, route }) => {
  const [caffeine, setCaffeine] = useState(50);
  const { accumulatedData } = route.params || {};

  const getCaffeineText = (val) => {
    if (val <= 0) return '상관없어요.';
    if (val <= 50) return '보통이에요.';
    return '매우 민감해요.';
  };

  const handleNext = () => {
    let apiValue = 1;

    if (caffeine === 0) apiValue = 0;
    else if (caffeine === 50) apiValue = 1;
    else if (caffeine >= 100) apiValue = 2;
    navigation.navigate('Noise', {
      accumulatedData: {
        ...accumulatedData,
        caffeineResponsiveness: apiValue,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header totalStep={7} currentStep={3} onPress={() => navigation.goBack()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>카페인 반응도는{'\n'}어떤편인가요?</Text>
        <Text style={[styles.title, styles.subtitle]}>언제 가장 집중이 잘 되나요?</Text>
      </View>
      <Onboarding />
      <View style={styles.sliderContainer}>
        <ConditionSlider
          value={caffeine}
          onValueChange={setCaffeine}
          valueText={getCaffeineText(caffeine)}
          step={50}
          dotCount={3}
        />
      </View>
      <CustomButton style={styles.button} text={'다음'} onPress={handleNext} />
    </View>
  );
};

export default Caffeine;

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
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
});
