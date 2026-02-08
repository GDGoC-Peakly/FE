import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/colors';
import Backicon from '../../../../assets/img/homeScreens/back_icon.svg';
import { useNavigation } from '@react-navigation/native';

const SettingHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
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
    paddingTop: 50, 
  },
  backButton: {
    width: 40, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18, 
    fontFamily: 'Pretendard-Bold',
    color: '#000',
    textAlign: 'center',
  },
  emptySpace: {
    width: 40, 
  },
});