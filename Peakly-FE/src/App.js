import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import DayReport from './screens/reportScreens/DayReport';
import WeekReport from './screens/reportScreens/WeekReport';
import TM01 from './TM/TM01';
import Category from './component/Category'

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <DayReport />
  );
}

export default App;
