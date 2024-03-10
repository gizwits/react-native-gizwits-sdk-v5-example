/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../components/Button';
import {GizCapability} from 'react-native-gizwits-sdk-v5/lib/types';
import {PERMISSIONS, request} from 'react-native-permissions';
import WifiManager from 'react-native-wifi-reborn';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    marginVertical: 10,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
export default ({navigation, route}: any) => {
  const {type} = route.params as {type: GizCapability};
  const [ssid, setSsid] = useState('QA-24G');
  const [password, setPassword] = useState('');

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(data => {
      console.log('requestMultiple', data);
      if (Platform.OS === 'android') {
        if (data === 'granted') {
          WifiManager.getCurrentWifiSSID().then(
            ssid => {
              setSsid(ssid);
            },
            () => {},
          );
        }
      } else {
        WifiManager.getCurrentWifiSSID().then(
          ssid => {
            setSsid(ssid);
          },
          () => {},
        );
      }
    });
  }, [setSsid]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '10%',
      }}>
      <TextInput
        style={styles.input}
        value={ssid}
        onChangeText={v => setSsid(v)}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={v => setPassword(v)}
      />
      <View style={{height: 20}} />
      <Button
        title="下一步"
        onPress={async () => {
          navigation.navigate('选择设备', {type, ssid, password});
        }}
      />
    </View>
  );
};
