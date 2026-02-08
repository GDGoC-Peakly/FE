import React from 'react';
import { View, Pressable, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import DesignedArrow from '../../../../assets/img/Onboarding/designedArrow';

const Header = ({ totalStep, currentStep }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => {}} style={styles.backButton}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
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
