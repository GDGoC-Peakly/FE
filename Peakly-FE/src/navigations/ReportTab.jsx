import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../styles/colors';
import DayReport from '../screens/reportScreens/DayReport';
import WeekReport from '../screens/reportScreens/WeekReport';
import MonthReport from '../screens/reportScreens/MonthReport';

const Tab = createMaterialTopTabNavigator();

const ReportTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 67,
          paddingTop: 28,
        },
        tabBarStyle: {
          backgroundColor: colors.grayscale[100],
          borderBottomWidth: 1,
          borderBottomColor: colors.grayscale[200],
          height: 65,
          paddingLeft: 23,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.grayscale[1000],
          height: 2,
          marginLeft: 23,
        },
        tabBarLabelStyle: {
          fontFamily: 'Pretendard-Bold',
          fontSize: 14,
        },
        tabBarActiveTintColor: colors.grayscale[1000],
        tabBarInactiveTintColor: colors.grayscale[500],
        tabBarPressColor: 'transparent',
      }}
    >
      <Tab.Screen name="일간" component={DayReport} options={{ tabBarLabel: '일간' }} />
      <Tab.Screen name="주간" component={WeekReport} options={{ tabBarLabel: '주간' }} />
      <Tab.Screen name="월간" component={MonthReport} options={{ tabBarLabel: '월간' }} />
    </Tab.Navigator>
  );
};

export default ReportTab;
