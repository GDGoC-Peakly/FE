import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TimeComparisonChart from '../../components/TimeComparisonChart';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/colors';
import Focus from '../../../assets/img/TM/focus.svg';
import CustomButton from '../../components/CustomButton';

const FocusRateCheck = () => {
  const mockApiResult = {
    baseDate: '2026-01-26',
    windows: [
      {
        startAt: '2026-01-26T11:30:00',
        endAt: '2026-01-26T15:30:00',
        score: 2.4,
      },
    ],
  };

  const mySessionData = {
    startAt: '2026-01-26T11:00',
    endAt: '2026-01-26T14:00:00',
  };

  return (
    <LinearGradient
      colors={[colors.grayscale[100], colors.primary[50]]}
      locations={[0.0, 1.0]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>오늘의 PeakTime</Text>
          <Text style={styles.description}>PeakTime 동안 집중했어요.</Text>
        </View>
        <View style={styles.svg}>
          <Focus />
        </View>
        <View>
          <TimeComparisonChart actualSession={mySessionData} apiResult={mockApiResult} />
        </View>
        <View style={styles.button}>
          <CustomButton text="다음" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default FocusRateCheck;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    marginTop: -100,
  },
  textWrapper: {
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 108,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
  },
  description: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
  },
});
