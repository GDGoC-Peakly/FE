import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_HORIZONTAL = 20;
const SLIDER_CONTAINER_PADDING = 20;

const ConditionSlider = ({
  label,
  subLabel,
  value,
  onValueChange,
  valueText,
  isLast,
  step,
  dotCount,
}) => {
  const dots = Array.from({ length: dotCount }, (_, i) => (100 / (dotCount - 1)) * i);
  const availableWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2 - SLIDER_CONTAINER_PADDING * 2;
  const thumbSize = 24;
  const left = (value / 100) * availableWidth;

  return (
    <View style={[styles.conditionItem, isLast && { marginBottom: 0 }]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>

      <View style={styles.sliderWrapper}>
        <View style={styles.sliderBackgroundLine}>
          {dots.map((_, idx) => (
            <View key={idx} style={styles.sliderDot} />
          ))}
        </View>

        <View
          style={[styles.customThumbContainer, { left: left - thumbSize / 2 }]}
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
          step={step}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="transparent"
        />
      </View>

      <Text style={styles.valueText}>{valueText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  conditionItem: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[900],
  },
  subLabel: {
    fontFamily: 'Pretendard-regular',
    color: colors.grayscale[500],
    fontSize: 14,
  },
  sliderWrapper: {
    height: 40,
    justifyContent: 'center',
    marginVertical: 9,
  },
  sliderBackgroundLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
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
    height: 40,
    zIndex: 2,
  },
  customThumbContainer: {
    position: 'absolute',
    zIndex: 3,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customThumbOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  customThumbInner: {
    width: 14,
    height: 14,
    borderRadius: 6,
    backgroundColor: colors.primary[50],
  },
  valueText: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.primary[600],
    fontFamily: 'Pretendard-Bold',
    marginTop: -4,
  },
});

export default ConditionSlider;
