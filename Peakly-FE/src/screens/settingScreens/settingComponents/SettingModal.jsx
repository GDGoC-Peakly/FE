import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../../styles/colors';
import ModalFooter from '../../../components/ModalFooter';

const SettingModal = ({ visible, onClose, onConfirm, type }) => {
    
  const isWithdraw = type === 'withdraw';
  // const isWithdraw = true;
  const title = isWithdraw ? '탈퇴' : '로그아웃';

  const modalHeight = isWithdraw ? 216 : 165;

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, { height: modalHeight }]}>
              <Text style={styles.title}>{title}</Text>
              
              <View style={styles.messageContainer}>
                {isWithdraw ? (
                  <>
                    <Text style={styles.message}>
                      회원 탈퇴 시 계정 정보가 삭제되어{'\n'}복구가 
                      <Text style={styles.highlight}> 불가능</Text>해요.
                    </Text>
                    <Text style={[styles.message, { marginTop: 12 }]}>
                      정말 탈퇴하시겠어요?
                    </Text>
                  </>
                ) : (
                  <Text style={styles.message}>정말 로그아웃할까요?</Text>
                )}
              </View>

              <ModalFooter 
                onCancel={onClose} 
                onConfirm={onConfirm} 
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.grayscale[100],
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 12,
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    fontSize: 14, 
    fontFamily: 'Pretendard-Medium',
  },
  highlight: {
    color: colors.primary[500],
    fontFamily: 'Pretendard-Bold',
  },
});