import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import ReportTab from './navigations/ReportTab';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <ReportTab />
    </NavigationContainer>
  );
}

export default App;
