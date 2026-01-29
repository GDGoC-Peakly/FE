import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { BlurView } from 'expo-blur'; 
import { colors } from '../styles/colors.js';
import timer_icon from '../../assets/img/TM/timer_icon.png';
import ModalFooter from '../component/ModalFooter.jsx';

const CustomBottomModal = ({ visible, onClose, title, onConfirm }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onClose}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />
            
            <View style={styles.iconContainer}>
              <Image source={timer_icon} style={styles.icon} resizeMode="contain" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.mainText}>집중 시간이 5분 미만이에요</Text>
              <Text style={styles.mainText}>기록할까요?</Text>
            </View>

            <ModalFooter 
              onCancel={onClose} 
              onConfirm={onConfirm} 
              cancelText="아니요" 
              confirmText="네, 할게요" 
            />
          </Pressable>
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
    backgroundColor: colors.grayscale[1000], 
    width: '100%',
    height: 440,
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    paddingHorizontal: 24, 
    paddingTop: 12,
    paddingBottom: 40,
  },
  iconContainer: {
    marginTop: 20,
    marginLeft: 10, 
    marginBottom: 25,
  },
  icon: {
    width: 110, 
    height: 138, 
  },
  textContainer: {
    marginLeft: 10, 
    marginBottom: 45,
    alignItems: 'flex-start', 
  },
  mainText: {
    color: colors.grayscale[100],
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left', 
    lineHeight: 32,
  },
});

export default CustomBottomModal;
