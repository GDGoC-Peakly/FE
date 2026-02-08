import { Pressable, StyleSheet, Alert, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Camera from '../../assets/img/Onboarding/camera.svg';
import DefautProfile from '../../assets/img/Onboarding/defaultProfile.svg';
import { colors } from '../styles/colors';

const ProfileImagePicker = ({ image, onImageChange }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.imageWrapper}>
      {image ? (
        <Image source={{ uri: image }} style={styles.selectedImage} />
      ) : (
        <DefautProfile width={175} height={175} />
      )}
      <Pressable style={styles.button} onPress={pickImage}>
        <Camera width={35} height={24} />
      </Pressable>
    </View>
  );
};

export default ProfileImagePicker;

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    backgroundColor: colors.grayscale[1000],
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  imageWrapper: {
    width: 175,
    height: 175,
    position: 'relative',
  },
  selectedImage: {
    width: 175,
    height: 175,
    borderRadius: 87.5,
  },
});
