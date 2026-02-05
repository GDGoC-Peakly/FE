import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import DayReport from './screens/reportScreens/DayReport';
import WeekReport from './screens/reportScreens/WeekReport';

// TM 스크린
import TimerSetup from './screens/timerScreens/TimerSetup'
import TimerRunning from './screens/timerScreens/TimerRunning'
import TimerModal from './screens/timerScreens/timerComponents/TimerModal'
import TimerStopModal from './screens/timerScreens/timerComponents/TimerStopModal'
import TimerResult from './screens/timerScreens/TimerResult';

// HM 스크린
import Home from './screens/homeScreens/Home';
import HomeModal from './screens/homeScreens/homeComponents/HomeModal';
import DailyCheckin1 from './screens/homeScreens/DailyCheckin1';
import DailyCheckin2 from './screens/homeScreens/DailyCheckin2';
import PeakTimelineScreen from './screens/homeScreens/PeakTimelineScreen';

// ST 스크린
import Setting from './screens/settingScreens/Setting';
import SettingInfo from './screens/settingScreens/SettingInfo';
import SettingTag from './screens/settingScreens/SettingTag';
import SettingModal from './screens/settingScreens/settingComponents/SettingModal';

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />
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

        {/* --- ST 관련 스택 --- */}
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="SettingInfo" component={SettingInfo} />
        <Stack.Screen name="SettingTag" component={SettingTag} />

        {/* --- TM 관련 스택 --- */}
        <Stack.Screen name="TimerSetup" component={TimerSetup} />
        <Stack.Screen name="TimerRunning" component={TimerRunning} />
        <Stack.Screen name="TimerResult" component={TimerResult} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
