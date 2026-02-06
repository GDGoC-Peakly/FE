import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ConditionProvider } from '../contexts/ConditionContext'; 

{/* --- HM 스크린--- */}
import Home from '../screens/homeScreens/Home';
import PeakTimelineScreen from '../screens/homeScreens/PeakTimelineScreen';
import DailyCheckin1 from '../screens/homeScreens/DailyCheckin1';
import DailyCheckin2 from '../screens/homeScreens/DailyCheckin2';

{/* --- TM 스크린--- */}
import TimerSetup from '../screens/timerScreens/TimerSetup';
import TimerRunning from '../screens/timerScreens/TimerRunning';
import TimerResult from '../screens/timerScreens/TimerResult';

{/* --- ST 스크린--- */}
import Setting from '../screens/settingScreens/Setting';
import SettingInfo from '../screens/settingScreens/SettingInfo';
import SettingTag from '../screens/settingScreens/SettingTag';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <ConditionProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* --- HM 관련 스택 --- */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PeakTimeline" component={PeakTimelineScreen} />
        <Stack.Screen name="DailyCheckin1" component={DailyCheckin1} />
        <Stack.Screen name="DailyCheckin2" component={DailyCheckin2} />

        {/* --- TM 관련 스택 --- */}
        <Stack.Screen name="TimerSetup" component={TimerSetup} />
        <Stack.Screen name="TimerRunning" component={TimerRunning} />
        <Stack.Screen name="TimerResult" component={TimerResult} />

        {/* --- ST 관련 스택 --- */}
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="SettingInfo" component={SettingInfo} />
        <Stack.Screen name="SettingTag" component={SettingTag} />
      </Stack.Navigator>
    </ConditionProvider>
  );
};

export default StackNavigator;