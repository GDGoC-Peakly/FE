import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import { colors } from '../../styles/colors';
import OnBording from '../../../assets/img/Onboarding/onboarding1.svg';
import Button from './components/Button';

const ChronoType = () => {
  const [selected, setSelected] = useState('');

  const handlePress = (type) => {
    setSelected(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>크로노타입</Text>
        <Text style={[styles.title, styles.subtitle]}>
          가장 활발하게 활동하는 시간은 언제인가요?
        </Text>
      </View>
      <OnBording />
      <View style={styles.buttonContainer}>
        <Button
          title={'아침형'}
          variant={selected !== '아침형'}
          onPress={() => handlePress('아침형')}
        />
        <Button
          title={'중간형'}
          variant={selected !== '중간형'}
          onPress={() => handlePress('중간형')}
        />
        <Button
          title={'저녁형'}
          variant={selected !== '저녁형'}
          onPress={() => handlePress('저녁형')}
        />
      </View>
    </View>
  );
};

export default ChronoType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayscale[100],
    gap: 60,
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
});
