import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import CheckBox from '../../components/CheckBox';
import { colors } from '../../styles/colors';
import ArrowRight from '../../../assets/img/Onboarding/arrowRight.svg';
import CustomButton from '../../components/CustomButton';
import DefaultHeader from './components/DefaultHeader';

const Terms = ({ navigation }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [age14, setAge14] = useState(false);
  const [serviceTerms, setServiceTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [dataUsage, setDataUsage] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleAllCheck = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setAge14(newValue);
    setServiceTerms(newValue);
    setPrivacy(newValue);
    setDataUsage(newValue);
    setMarketing(newValue);
  };

  const handleIndividualCheck = (setter) => {
    setter((prev) => !prev);
  };

  const handleStart = () => {
    if (!age14 || !serviceTerms || !privacy || !dataUsage) {
      Alert.alert('필수 약관 동의', '필수 약관에 모두 동의해주세요.');
      return;
    }
    navigation.navigate('SignUp');
  };

  // 모든 항목이 체크되면 전체 동의도 자동으로 체크
  useEffect(() => {
    if (age14 && serviceTerms && privacy && dataUsage && marketing) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [age14, serviceTerms, privacy, dataUsage, marketing]);

  return (
    <View style={styles.container}>
      <DefaultHeader title={'이용약관'} onPress={() => navigation.goBack()} />
      <View style={styles.termsAllBox}>
        <CheckBox checked={allChecked} onPress={handleAllCheck} />
        <Text style={styles.allAllow}>약관 전체 동의</Text>
      </View>
      <View style={styles.termsContainer}>
        <View style={styles.termsBox}>
          <CheckBox checked={age14} onPress={() => handleIndividualCheck(setAge14)} />
          <Text style={styles.termsDescription}>[필수] 만 14세 이상이며, 이를 동의합니다.</Text>
        </View>
        <View style={styles.termsBox}>
          <CheckBox checked={serviceTerms} onPress={() => handleIndividualCheck(setServiceTerms)} />
          <Text style={styles.termsDescription}>[필수] 서비스 이용약관 동의</Text>
          <Pressable style={styles.svg} onPress={() => navigation.navigate('ServiceTerms')}>
            <ArrowRight />
          </Pressable>
        </View>
        <View style={styles.termsBox}>
          <CheckBox checked={privacy} onPress={() => handleIndividualCheck(setPrivacy)} />
          <Text style={styles.termsDescription}>[필수] 개인정보 처리방침 동의</Text>
          <Pressable style={styles.svg} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <ArrowRight />
          </Pressable>
        </View>
        <View style={styles.termsBox}>
          <CheckBox checked={dataUsage} onPress={() => handleIndividualCheck(setDataUsage)} />
          <Text style={styles.termsDescription}>[필수] 데이터 분석 및 AI 학습 활용 동의</Text>
          <Pressable style={styles.svg} onPress={() => navigation.navigate('AIDataConsent')}>
            <ArrowRight />
          </Pressable>
        </View>
        <View style={styles.termsBox}>
          <CheckBox checked={marketing} onPress={() => handleIndividualCheck(setMarketing)} />
          <Text style={styles.termsDescription}>[선택] 마케팅 정보 수신 동의</Text>
          <Pressable style={styles.svg} onPress={() => navigation.navigate('MarketingConsent')}>
            <ArrowRight />
          </Pressable>
        </View>
      </View>
      <CustomButton style={styles.button} text={'시작'} onPress={handleStart} />
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grayscale[100],
    paddingHorizontal: 20,
  },
  termsAllBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingLeft: 20,
    gap: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grayscale[300],
    width: '85%',
    marginBottom: 30,
    marginTop: 320,
  },
  allAllow: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  termsDescription: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  termsBox: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  termsContainer: {
    gap: 16,
  },
  svg: {
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: colors.primary[500],
    position: 'absolute',
    bottom: 50,
  },
});
