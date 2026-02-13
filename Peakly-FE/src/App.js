import { useFonts } from 'expo-font';
import AppNavigator from './navigations/AppNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';

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
  );
}

export default App;
