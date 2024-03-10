import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/Button';
import {
  GizCapability,
  GizProvideWiFiCredentialsCallback,
  GizWiFiActivatorEvent,
} from 'react-native-gizwits-sdk-v5/lib/types';
import sdk from '../../models/sdk';

export default ({route}: any) => {
  const [state, setState] = useState(['配置中']);
  const {type, ssid, password, id} = route.params as {
    type: GizCapability;
    ssid: string;
    password: string;
    id: string;
  };

  const devcieRef = useRef(sdk.data.find(item => item.id === id));
  const progressHandler: GizProvideWiFiCredentialsCallback = useCallback(
    event => {
      switch (event.data) {
        case 'GIZ_CONFIG_RECV_SUCCESS': {
          state.push('设备收到配置包');
          break;
        }
        case 'GIZ_CONFIG_SEND_SUCCESS': {
          state.push('发送配置包成功');
          break;
        }
        case 'GIZ_CONFIG_SUCCESS': {
          state.push('配网成功');
          break;
        }
        case 'GIZ_CONNECT_SUCCESS': {
          state.push('连接设备成功');
          break;
        }
      }
      setState([...state]);
    },
    [state, setState],
  );

  useEffect(() => {
    switch (type) {
      case 'BLE': {
        
        devcieRef.current?.bleCapability.provideWiFiCredentials(
          ssid,
          password,
          60 * 1000,
          progressHandler,
        );
        break;
      }
      case 'LAN': {
        devcieRef.current?.lanCapability.provideWiFiCredentials(
          ssid,
          password,
          60 * 1000,
          progressHandler,
        ).then(data => {
        });
        break;
      }
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '10%',
        flexDirection: 'column',
      }}>
      {state.map(item => {
        return <Text>{item}</Text>;
      })}
    </View>
  );
};
