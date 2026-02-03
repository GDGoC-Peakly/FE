import { StyleSheet, Text, View, Image, Modal, Pressable } from 'react-native'
import React from 'react'
import modalicon from '../../assets/img/HM/modalicon.png'
import { colors } from '../styles/colors'
import ModalFooter from '../component/ModalFooter'

const HM_Modal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      animationType="slide" 
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.outsideClose} onPress={onCancel} />

        <View style={styles.bottomSheetContainer}>
          <View style={styles.content}>
            <View style={styles.textSection}>
              <Text style={styles.titleText}>PeakTime 제공용</Text>
              <Text style={styles.titleText}>푸시 알림 수신 동의</Text>
              <Text style={styles.subTitleText}>
                피크타임이 되면 푸시 알림으로 알려드릴게요!
              </Text>
            </View>

            <View style={styles.iconContainer}>
              <Image 
                source={modalicon} 
                style={styles.mainIcon} 
                resizeMode="contain" 
              />
            </View>

            <ModalFooter 
              onCancel={onCancel} 
              onConfirm={onConfirm} 
              cancelText="아니요" 
              confirmText="네, 받을게요" 
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default HM_Modal

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-end', 
  },
  outsideClose: {
    flex: 1, 
  },
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: colors.grayscale[100],
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 33,
    paddingTop: 32,
    paddingBottom: 44, 
  },
  textSection: {
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[1000],
  },
  subTitleText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: colors.grayscale[500],
    marginTop: 12,
  },
  iconContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  mainIcon: {
    width: '100%',
    height: '100%',
  },
})