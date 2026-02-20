import { StyleSheet, Text, View, Alert } from 'react-native';
import { colors } from '../../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Review from './timerComponents/Review';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';

import { feedbackSession } from '../../api/sessions';

const FocusReview = ({ navigation, route }) => {
  const { sessionId } = route.params || {};

  const RATING_TEXTS = {
    0: '별을 눌러 점수를 선택해주세요',
    1: '집중이 안됐어요.',
    2: '평소보다 집중이 안됐어요.',
    3: '보통이었어요.',
    4: '평소보다 집중이 잘됐어요.',
    5: '집중이 아주 잘됐어요!',
  };

  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (score === 0) {
      Alert.alert('알림', '별을 눌러 점수를 선택해주세요.');
      return;
    }

    if (!sessionId) {
      Alert.alert('오류', '세션 정보를 찾을 수 없습니다.');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      await feedbackSession(sessionId, { focusScore: score });

      navigation.navigate('FocusRateCheck');
    } catch (error) {
      Alert.alert('평가 실패', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.grayscale[100], colors.primary[50]]}
      locations={[0.6731, 1.0]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>집중도 평가</Text>
          <Text style={styles.description}>스스로 생각하기에 집중도는 어땠나요?</Text>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.reviewTextWrapper}>
            <Text style={styles.reviewText}>{RATING_TEXTS[score]}</Text>
          </View>
          <Review score={score} onRate={setScore} />
        </View>
        <View style={styles.button}>
          <CustomButton
            text={isLoading ? '처리 중...' : '다음'}
            onPress={handleSubmit}
            // disabled={isLoading} // CustomButton 컴포넌트가 disabled prop을 지원한다면 주석을 해제하세요.
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default FocusReview;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 108,
  },
  gradient: {
    flex: 1,
  },
  textWrapper: {
    gap: 8,
    alignItems: 'center',
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
  reviewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewTextWrapper: {
    width: 190,
    paddingVertical: 6.5,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  reviewText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.primary[500],
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
  },
});
