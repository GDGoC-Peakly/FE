import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles/colors';
import Disturb from '../../assets/img/TM/disturb.svg';
import DisturbCategories from '../components/DisturbCategories';

const DisturbCheck = () => {
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
          <Text style={styles.title}>집중도 방해 요소 찾기</Text>
          <Text style={styles.description}>
            집중을 하지 못한 이유가 있다면,{'\n'}모두 선택해주세요.
          </Text>
        </View>
        <View style={styles.svg}>
          <Disturb />
        </View>
        <View style={styles.categories}>
          <DisturbCategories />
        </View>
      </View>
    </LinearGradient>
  );
};

export default DisturbCheck;

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
    marginTop: 0,
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
    textAlign: 'center',
  },
  categories: {
    backgroundColor: colors.grayscale[100],
    padding: 20,
    width: '85%',
    borderRadius: 12,
  },
});
