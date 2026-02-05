import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';

const Input = () => {
  return <TextInput></TextInput>;
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingVertical: 23.5,
  },
});
