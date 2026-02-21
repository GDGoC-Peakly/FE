import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../styles/colors.js';
import Timer from '../../../../assets/img/timerScreens/timer_icon.svg';
import ModalFooter from '../../../components/ModalFooter.jsx';

const TimerModal = ({ visible, onClose, title, onConfirm }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onClose}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <LinearGradient
            colors={[colors.grayscale[900], colors.grayscale[1000]]}
            style={styles.bottomSheet}
          >
            <Pressable style={{ flex: 1 }} onPress={(e) => e.stopPropagation()}>
              <View style={styles.handle} />

              <View style={styles.iconContainer}>
                <Timer width={106} height={134} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.mainText}>{title}</Text>
              </View>

              <ModalFooter
                onCancel={onClose}
                onConfirm={onConfirm}
                cancelText="아니요"
                confirmText="네, 할게요"
              />
            </Pressable>
          </LinearGradient>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    width: '100%',
    height: 440,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 40,
    overflow: 'hidden',
  },
  iconContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 32,
  },
  icon: {
    width: 110,
    height: 138,
  },
  textContainer: {
    marginBottom: 45,
    alignItems: 'flex-start',
  },
  mainText: {
    color: colors.grayscale[100],
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'left',
  },
});

export default TimerModal;
