import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import DayReport from './screens/reportScreens/DayReport';
import WeekReport from './screens/reportScreens/WeekReport';
import TM01 from '../src/TM/TM01'
import TM02 from '../src/TM/TM02'
import TM02_Card from '../src/TM/TM02_Card'

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
      {/* <TM01/> */}
      <TM02/>
      <TM02_Card/>
    </View>
  );
}

export default App;
