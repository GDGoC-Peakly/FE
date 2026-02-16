import React from 'react';
import { View, Pressable, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import DesignedArrow from '../../../../assets/img/Onboarding/designedArrow';

const Header = ({ totalStep, currentStep, onPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={onPress} style={styles.backButton}>
        <DesignedArrow />
      </Pressable>
      <View style={styles.progressContainer}>
        {Array.from({ length: totalStep }).map((_, index) => {
          const isActive = index < currentStep;
          return (
            <View
              key={index}
              style={[
                styles.stepSegment,
                isActive ? styles.activeStep : styles.inactiveStep,
                index === 0 && { borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
                index === totalStep - 1 && {
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            />
          );
        })}
      </View>
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 35 : 70,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 40,
  },
  stepSegment: {
    width: 28,
    height: 4,
    borderRadius: 3,
  },
  activeStep: {
    backgroundColor: '#6C5CE7',
  },
  inactiveStep: {
    backgroundColor: '#E6E6E6',
  },
  rightSpacer: {
    width: 32,
  },
});

export default Header;
