import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/colors';
import Disturb from '../../../assets/img/TM/disturb.svg';
import DisturbCategories from '../../components/DisturbCategories';
import CustomButton from '../../components/CustomButton';
import { useState, useEffect } from 'react';
import { getDisruptions, postDisruptions } from '../../api/sessions';

const DisturbCheck = ({ navigation, route }) => {
  const { sessionId } = route.params || {};

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disruptions, setDisruptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getDisruptions();
        if (data?.result?.disruptionReasons) {
          setDisruptions(data.result.disruptionReasons);
        }
      } catch (error) {
        Alert.alert('조회 실패', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleNext = async () => {
    if (!sessionId) {
      Alert.alert('오류', '세션 정보를 찾을 수 없습니다.');
      return;
    }

    if (selectedIds.length === 0) {
      navigation.navigate('TimerResult', { sessionId });
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await postDisruptions(sessionId, { disruptionReasonIds: selectedIds });
      navigation.navigate('TimerResult', { sessionId });
    } catch (error) {
      Alert.alert('저장 실패', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.grayscale[100] }]}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

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
          <DisturbCategories
            disruptions={disruptions}
            selectedIds={selectedIds}
            onToggle={toggleSelection}
          />
        </View>
      </View>
      <View style={styles.button}>
        <CustomButton text={isSubmitting ? '처리 중...' : '다음'} onPress={handleNext} />
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
    marginTop: 40,
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
  button: {
    marginBottom: 50,
    paddingHorizontal: 20,
  },
});
