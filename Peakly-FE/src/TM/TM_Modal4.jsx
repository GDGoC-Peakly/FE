import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur'; 
import { colors } from '../styles/colors.js';
import ModalFooter from '../component/ModalFooter.jsx'; 
import TimerBox from '../component/TimerBox.jsx'; 

const TM_Modal4 = ({ visible, onClose, time, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide" 
      onRequestClose={onClose}
    >
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />
            
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>집중을 시작한 지</Text>
              
              <TimerBox time={time || "00 : 38 : 41"} />

              <Text style={styles.subTitleText}>집중모드를 종료하시겠어요?</Text>
            </View>

            <ModalFooter 
              onCancel={onClose} 
              onConfirm={onConfirm} 
              cancelText="아니요" 
              confirmText="네" 
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
    height: 353, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    paddingHorizontal: 24, 
    paddingTop: 47, 
    paddingBottom: 40,
  },

  contentContainer: {
    marginLeft: 10, 
    marginBottom: 40,
  },
  titleText: {
    color: colors.grayscale[100],
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  subTitleText: {
    color: colors.grayscale[100],
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'left',
  },
});

export default TM_Modal4;