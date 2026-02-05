import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import ReportTab from './navigations/ReportTab';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <ReportTab />
    </NavigationContainer>
  );
}

export default App;
