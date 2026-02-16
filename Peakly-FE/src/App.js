import { useFonts } from 'expo-font';
import AppNavigator from './navigations/AppNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import CustomTag from './screens/onBoardingScreens/CustomTag';

function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AuthProvider> 
    // <View style={{ flex: 1 }}>
    //   <CustomTag />
    // </View>

  );
}

export default App;
