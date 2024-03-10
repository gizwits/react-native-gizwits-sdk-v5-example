import React from 'react';
import {Text, View} from 'react-native';
import {GizCapability} from 'react-native-gizwits-sdk-v5//lib/types';
import Button from '../../components/Button';

export default ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '10%',
      }}>
      <Button
        title="AP 配网"
        onPress={async () => {
          navigation.navigate('输入Wi-Fi', {type: 'LAN'});
        }}
      />
      <View style={{height: 20}} />
      <Button
        title="BLE 配网"
        onPress={async () => {
          navigation.navigate('输入Wi-Fi', {type: 'BLE'});
        }}
      />
    </View>
  );
};
