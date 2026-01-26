import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../styles/colors';

const ReportTab = () => {
  const [activeTab, setActiveTab] = useState('일간');
  const tabs = ['일간', '주간', '월간'];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[styles.dateText, activeTab === tab && styles.activeDateText]}>{tab}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ReportTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: colors.grayscale[100],
    gap: 20,
    paddingLeft: 23,
  },
  tabButton: {
    justifyContent: 'center',
    paddingTop: 28.5,
    paddingBottom: 8,
    width: 70,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: colors.grayscale[1000],
    marginBottom: 1,
    borderBottomWidth: 2,
  },
  dateText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.grayscale[600],
  },
  activeDateText: {
    color: colors.grayscale[1000],
  },
});
