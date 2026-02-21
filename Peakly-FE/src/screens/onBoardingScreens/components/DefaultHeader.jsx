import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import DesignedArrow from '../../../../assets/img/Onboarding/designedArrow.svg';
import WhiteArrow from '../../../../assets/img/Onboarding/whiteArrow.svg';
import { Dessert } from 'lucide-react-native';
import { colors } from '../../../styles/colors';

const DefaultHeader = ({ title, onPress, white = false, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.button} onPress={onPress}>
        {white === true ? <WhiteArrow /> : <DesignedArrow />}
      </Pressable>
      <Text style={[white === true ? styles.white : styles.title]}>{title}</Text>
    </View>
  );
};

export default DefaultHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 35 : 70,
  },
  button: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
  },
  white: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.grayscale[100],
  },
});
