import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import SelectLogin from './screens/onBoardingScreens/SelectLogin';
import EmailLogin from './screens/onBoardingScreens/EmailLogin';
import EmptyScreen from './screens/onBoardingScreens/EmptyScreen';
import SignUp from './screens/onBoardingScreens/SignUp';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <SignUp />
    </View>
  );
}

export default App;
