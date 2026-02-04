import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/colors';
import Backicon from '../../../../assets/img/homeScreens/back_icon.svg';

const SettingHeader = ({ title, onBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Backicon width={24} height={24} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.emptySpace} />
    </View>
  );
};

export default SettingHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 119,
    backgroundColor: colors.grayscale[100],
  },
  backButton: {
    marginTop: 50,
    zIndex: 1, 
  },
  titleContainer: {
    marginTop: 50,
    position: 'absolute', 
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20, 
    fontFamily: 'Pretendard-Bold',
    color: '#000',
  },
  emptySpace: {
    width: 24, 
  },
});

