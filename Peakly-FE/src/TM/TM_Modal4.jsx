import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur'; 
import { LinearGradient } from 'expo-linear-gradient'; // 1. 임포트 추가
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
          {/* 2. 기존 View인 bottomSheet를 LinearGradient로 교체 */}
          <LinearGradient
            colors={[colors.grayscale[900], colors.grayscale[1000]]} // 위 900, 아래 1000
            style={styles.bottomSheet}
          >
            <Pressable style={{ flex: 1 }} onPress={(e) => e.stopPropagation()}>
              <View style={styles.handle} />
              
              <View style={styles.contentContainer}>
                <Text style={styles.titleText}>집중을 시작한 지</Text>
                
                {/* TimerBox 글자색을 sub[200]이나 primary[600] 중 원하는 것으로 넘겨주세요 */}
                <TimerBox 
                  time={time || "00 : 38 : 41"} 
                  textColor={colors.sub[200]} 
                />

                <Text style={styles.subTitleText}>집중모드를 종료하시겠어요?</Text>
              </View>

              <ModalFooter 
                onCancel={onClose} 
                onConfirm={onConfirm} 
                cancelText="아니요" 
                confirmText="네" 
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
    height: 353, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    paddingHorizontal: 24, 
    paddingTop: 47, 
    paddingBottom: 40,
    overflow: 'hidden', 
  },
  contentContainer: {
    marginLeft: 10, 
    marginBottom: 40,
  },
  titleText: {
    color: colors.grayscale[100],
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  subTitleText: {
    color: colors.grayscale[100],
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'left',
    marginTop: 24,
  },
});

export default TM_Modal4;