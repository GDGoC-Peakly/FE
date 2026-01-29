import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { BlurView } from 'expo-blur'; 
import { colors } from '../styles/colors.js';
import timer_icon from '../../assets/img/TM/timer_icon.png';

const CustomBottomModal = ({ visible, onClose, title, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide" 
      onRequestClose={onClose}
    >
      <BlurView
        intensity={10} 
        tint="dark"    
        style={StyleSheet.absoluteFill}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />
            
            <View style={styles.iconContainer}>
              <Image 
                source={timer_icon} 
                style={styles.icon}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.mainText}>집중 시간이 5분 미만이에요</Text>
              <Text style={styles.mainText}>기록할까요?</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>아니요</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.confirmButton]} 
                onPress={onConfirm}
              >
                <Text style={styles.confirmButtonText}>네, 할게요</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: colors.grayscale[1000], // 배경색이 너무 불투명하면 블러가 안 보일 수 있으니 확인!
    width: '100%',
    height: 440,
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    paddingHorizontal: 24, 
    paddingTop: 12,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#3A3A3C',
    borderRadius: 2,
    marginBottom: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    marginTop: 40,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 12, 
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.grayscale[100],
  },
  confirmButton: {
    backgroundColor: colors.primary[600],
  },
  cancelButtonText: {
    color: colors.primary[600],
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: colors.grayscale[100],
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CustomBottomModal;