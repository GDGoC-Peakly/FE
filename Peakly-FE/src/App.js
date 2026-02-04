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

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      {/* <DayReport /> */}

      {/* HT 스크린 */}
      {/* <Home/> */}
      {/* <HomeModal/> */}
      {/* <PeakTimelineScreen/> */}
      {/* <DailyCheckin1/> */}
      {/* <DailyCheckin2/> */}

      {/* TM 스크린 */}
      {/* <TimerSetup/> */}
      {/* <TimerRunning/> */}
      {/* <TimerModal/> */}
      {/* <TimerStopModal/> */}
      {/* <TimerResult/> */}

      {/* ST 스크린 */}
      <Setting/>
      {/* <SettingInfo/> */}
      {/* <SettingTag/> */}
      {/* <SettingModal/> */}

    </View>
  );
}

export default App;
