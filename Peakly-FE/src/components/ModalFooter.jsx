import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/colors.js'; 

const ModalFooter = ({ onCancel, onConfirm, cancelText = "아니요", confirmText = "네" }) => {
  return (
    <View style={footerStyles.buttonContainer}>
      <TouchableOpacity 
        style={[footerStyles.button, footerStyles.cancelButton]} 
        onPress={onCancel}
      >
        <Text style={footerStyles.cancelButtonText}>{cancelText}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[footerStyles.button, footerStyles.confirmButton]} 
        onPress={onConfirm}
      >
        <Text style={footerStyles.confirmButtonText}>{confirmText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const footerStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.grayscale[200],
  },
  confirmButton: {
    backgroundColor: colors.primary[500],
  },
  cancelButtonText: {
    color: colors.primary[900],
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  confirmButtonText: {
    color: colors.grayscale[100],
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});

export default ModalFooter;