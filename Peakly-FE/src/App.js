import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import DayReport from './screens/reportScreens/DayReport';
import WeekReport from './screens/reportScreens/WeekReport';

import TM01 from '../src/TM/TM01'
import TM02 from '../src/TM/TM02'
import TM02_Card from '../src/TM/TM02_Card'
import TM_Modal from '../src/TM/TM_Modal'
import TM_Modal4 from '../src/TM/TM_Modal4'
import TM_05 from './TM/TM_05';

import HM from './HM/HM';
import HM_Modal from './HM/HM_Modal';
import HM_Daily_Checkin01 from './HM/HM_Daily_Checkin01';
import HM_Daily_Checkin02 from './HM/HM_Daily_Checkin02';
import PeakTimeline from './HM/PeakTimeline';
import HM_PeakTimeline from './HM/HM_PeakTimeline';

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

      <HM/>
      {/* <HM_PeakTimeline/> */}
      {/* <HM_Modal/> */}
      
      {/* <HM_Daily_Checkin01/> */}
      {/* <HM_Daily_Checkin02/> */}

      {/* <TM01/> */}
      {/* <TM02/> */}
      {/* <TM02_Card/> */}
      {/* <TM_Modal/> */}
      {/* <TM_Modal4/> */}
      {/* <TM_05/> */}
    </View>
  );
}

export default App;
