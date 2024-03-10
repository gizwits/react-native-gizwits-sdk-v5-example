import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {THEME_COLOR} from '../config/color';

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLOR,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  text: {
    color: '#fff',
  },
  roundButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 28,
    backgroundColor: '#f3f3f3',
  },
});
export default ({title, onPress, style}: any) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const RoundButton = ({icon, onPress}: any) => {
  return (
    <TouchableOpacity style={styles.roundButton} onPress={onPress}>
      <Icon name={icon} color={THEME_COLOR} size={15} />
    </TouchableOpacity>
  );
};

export {RoundButton};
