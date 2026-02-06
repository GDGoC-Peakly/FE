import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
// import ReportTab from './navigations/ReportTab';
import Stack from './navigations/Stack';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      {/* <ReportTab /> */}
      <Stack/>
    </NavigationContainer>
  );
}

export default App;