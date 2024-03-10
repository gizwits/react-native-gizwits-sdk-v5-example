import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {GizCapability} from 'react-native-gizwits-sdk-v5/lib/types';
import sdk from '../../models/sdk';
import {SimpleDeviceBox} from '../../components/DeviceBox';

export default observer(({navigation, route}: any) => {
  const devices = sdk.data;
  const {type, ssid, password} = route.params as {
    type: GizCapability;
    ssid: string;
    password: string;
  };
  const filterDevices = devices.filter(item => {
    switch (type) {
      case 'BLE': {
        return (
          item.bleCapability.netStatus >= 1 &&
          item.bleCapability.profile.configured === false
        );
      }
      case 'LAN': {
        return item.lanCapability.netStatus >= 1;
      }
    }
    return false;
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      {filterDevices.map(item => {
        console.log(item.bleCapability.profile);
        return (
          <SimpleDeviceBox
            device={item}
            onPress={() => {
              navigation.navigate('配置设备', {
                type,
                id: item.id,
                ssid,
                password,
              });
            }}
          />
        );
      })}
    </ScrollView>
  );
});
