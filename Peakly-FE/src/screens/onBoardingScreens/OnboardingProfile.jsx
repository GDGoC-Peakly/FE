import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';
import DefaultProfile from '../../../assets/img/Onboarding/defaultProfile.svg';
import ProfileImagePicker from '../../components/ProfileImagePicker';
import { useState } from 'react';
import Input from '../../components/Input';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';

const OnboardingProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const MAX_LENGTH = 10;

  const inputProps = {
    mode: 'outlined',
    outlineColor: colors.grayscale[300],
    activeOutlineColor: colors.grayscale[300],
    theme: { roundness: 12 },
    cursorColor: colors.grayscale[1000],
    secureTextEntry: false,
    contentStyle: styles.text,
    right: (
      <TextInput.Icon
        forceTextInputFocus={false}
        icon={() => (
          <View style={styles.countContainer}>
            <Text style={styles.currentCount}>{nickname.length}</Text>
            <Text style={styles.totalCount}>/{MAX_LENGTH}</Text>
          </View>
        )}
      />
    ),
  };

  return (
    <View style={styles.container}>
      <ProfileImagePicker image={profileImage} onImageChange={setProfileImage} />
      <Input
        style={styles.input}
        value={nickname}
        onChangeText={(text) => {
          if (text.length <= MAX_LENGTH) {
            setNickname(text);
          }
        }}
        props={inputProps}
        {...inputProps}
      />
      <CustomButton text={'완료'} style={styles.button} />
    </View>
  );
};

export default OnboardingProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 200,
  },
  image: {
    marginTop: 200,
  },
  input: {
    backgroundColor: colors.grayscale[100],
    marginTop: 95,
    marginBottom: 261,
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 20,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  currentCount: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.primary[500],
  },
  totalCount: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: colors.primary[500],
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
