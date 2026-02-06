import { StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';
import { colors } from '../../styles/colors';
import EmailDropdown from './components/EmailDropdown';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';

const SignUp = () => {
  const [emailDomain, setEmailDomain] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [pwStatus, setPwStatus] = useState(null);
  const [password, setPassword] = useState('');
  const [isSame, setIsSame] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const existingEmails = ['admin@gmail.com', 'test@naver.com'];

  const isReady = emailId.trim().length > 0 && emailDomain.trim().length > 0;

  const onIdChange = (text) => {
    setEmailId(text);
    setEmailStatus(null);
  };

  const onDomainChange = (value) => {
    setEmailDomain(value);
    setEmailStatus(null);
  };

  const handleEmailCheck = () => {
    const fullEmail = emailId + emailDomain;
    if (existingEmails.includes(fullEmail)) {
      setEmailStatus('already');
    } else {
      setEmailStatus('possible');

      console.log('검증된 이메일:', fullEmail);
    }
  };

  const handlePasswordCheck = (text) => {
    setPassword(text);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    if (passwordRegex.test(text)) {
      setPwStatus('ready');
    } else {
      setPwStatus('already');
    }
  };

  const handlePasswordConfirm = (text) => {
    setPasswordConfirm(text);

    if (text.length === 0) {
      setIsSame(null);
      return;
    }

    if (password === text) {
      setIsSame('same');
    } else {
      setIsSame('diffirent');
    }
  };

  const inputProps = {
    mode: 'outlined',
    outlineColor: colors.grayscale[300],
    activeOutlineColor: colors.grayscale[300],
    theme: { roundness: 12 },
    cursorColor: colors.grayscale[1000],
    secureTextEntry: false,
  };

  const pwInputProps = {
    mode: 'outlined',
    outlineColor: colors.grayscale[300],
    activeOutlineColor: colors.grayscale[300],
    theme: { roundness: 12 },
    cursorColor: colors.grayscale[1000],
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>아이디(이메일)</Text>
        {emailStatus === 'already' && (
          <Text style={styles.alreadyEmail}>이미 가입된 아이디입니다.</Text>
        )}
        {emailStatus === 'possible' && (
          <Text style={styles.possibleEmail}>사용 가능한 아이디입니다.</Text>
        )}
        <View style={styles.inputWrapper}>
          <Input
            props={inputProps}
            style={styles.input}
            value={emailId}
            onChangeText={onIdChange}
          />
          <EmailDropdown
            value={emailDomain}
            onValueChange={onDomainChange}
            style={{ marginLeft: 12 }}
          />
        </View>
        <CustomButton
          text={'인증'}
          style={[!isReady ? styles.disabledButton : styles.activeButton]}
          disabled={!isReady}
          onPress={handleEmailCheck}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>비밀번호</Text>
        {pwStatus === 'ready' && <Text style={styles.samePw}>사용 가능한 비밀번호입니다.</Text>}
        {pwStatus === 'already' && (
          <Text style={styles.pwDescript}>영문, 숫자를 포함해 8자~20자로 입력해주세요.</Text>
        )}
        <Input
          inputType="password"
          props={pwInputProps}
          style={styles.password}
          right={'a'}
          onChangeText={handlePasswordCheck}
          value={password}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>비밀번호 확인</Text>
        {isSame === 'same' && <Text style={styles.samePw}>비밀번호가 일치합니다.</Text>}
        {isSame === 'diffirent' && (
          <Text style={styles.diffirentPw}>비밀번호가 일치하지 않습니다.</Text>
        )}
        <Input
          inputType="password"
          props={pwInputProps}
          style={styles.password}
          value={passwordConfirm}
          onChangeText={handlePasswordConfirm}
        />
      </View>
      <CustomButton text={'다음'} style={styles.nextButton} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 20,
    gap: 36,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  input: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
    height: 54,
  },
  password: {
    width: '100%',
    backgroundColor: colors.grayscale[100],
    height: 54,
  },
  disabledButton: {
    backgroundColor: colors.grayscale[300],
  },
  activeButton: {
    backgroundColor: colors.primary[500],
  },
  contentWrapper: {
    gap: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pwDescript: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    position: 'absolute',
    bottom: 66,
    right: 0,
    color: colors.grayscale[500],
  },
  nextButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  alreadyEmail: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: colors.grayscale[1000],
    position: 'absolute',
    right: 0,
    bottom: 130,
  },
  possibleEmail: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: colors.primary[500],
    position: 'absolute',
    right: 0,
    bottom: 130,
  },
  diffirentPw: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: colors.grayscale[1000],
    position: 'absolute',
    right: 0,
    bottom: 66,
  },
  samePw: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: colors.primary[500],
    position: 'absolute',
    right: 0,
    bottom: 66,
  },
});
