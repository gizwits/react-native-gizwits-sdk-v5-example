import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RNGizSDKManagerModule from 'react-native-gizwits-sdk-v5';

import sdk from '../../models/sdk';
import productConfig from '../../config/productConfig';
import DeviceCtrl from './DeviceCtrl';
import {
  GizBaseCapability,
  GizCapability,
  GizOTAFirmwareType,
  GizOTAEvent,
  IDevice,
} from 'react-native-gizwits-sdk-v5/lib/types';
import CollapsibleCard from '../../components/CollapsibleCard';
import {RoundButton} from '../../components/Button';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import InfoItem from '../../components/InfoItem';
import WriteItemEnum from '../../components/WriteItemEnum';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default observer(({route}: any) => {
  const {id, type} = route.params as {id: string; type: GizCapability};
  const [config, setConfig] = useState<any>(null);
  const [deviceData, setDeviceData] = useState<any>({});
  const device = sdk.data.find(item => item.id === id);

  useEffect(() => {
    if (device?.productKey) {
      console.log('datadatadata', device.productKey);

      RNGizSDKManagerModule.getProductDataPointConfig(device.productKey).then(
        data => {
          if (data.success) {
            setConfig(JSON.parse(data.data!));
          }
        },
      );
    }
  }, [device?.productKey]);

  const onSend = async (data: any) => {
    let res: any = {};
    switch (type) {
      case 'BLE': {
        res = await device?.bleCapability.sendDp(data);

        break;
      }
      case 'LAN': {
        res = await device?.lanCapability.sendDp(data);
        break;
      }
      case 'MQTT': {
        res = await device?.mqttCapability.sendDp(data);
        break;
      }
    }

    console.log('res', res);
    if (!res?.success) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: res?.error,
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: '发送成功',
      });
    }
  };
  const onGetDp = useCallback(() => {
    let capability: GizBaseCapability;
    switch (type) {
      case 'BLE': {
        capability = device!.bleCapability;
        break;
      }
      case 'LAN': {
        capability = device!.lanCapability;
        break;
      }
      case 'MQTT': {
        capability = device!.mqttCapability;
        break;
      }
    }

    if (capability) {
      capability.getDp().then(data => {
        console.log('getDp', data.data);
        if (data.success) {
          const newData: any = {
            ...deviceData,
            ...data.data?.data,
          };
          setDeviceData(newData);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: '查询成功',
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: data?.error,
          });
        }
      });
    }
  }, [device, setDeviceData, deviceData, type]);
  return (
    <ScrollView style={styles.container}>
      {!!config && !!device && (
        <>
          <DeviceCtrl
            config={config?.ui?.sections[0]?.elements}
            deviceData={deviceData}
            onSend={onSend}
            onGetDp={onGetDp}
          />
          <GetDeviceStatus device={device} type={type} />
          <CheckOta device={device} type={type} />
          <StartOta device={device} type={type} />
        </>
      )}
    </ScrollView>
  );
});
const StartOta = ({device, type}: {device: IDevice; type: GizCapability}) => {
  const [firmwareType, setFirmwareType] =
    useState<GizOTAFirmwareType>('Module');
  const options: GizOTAFirmwareType[] = ['MCU', 'Module'];

  const [state, setState] = useState<GizOTAEvent | -1>(-1);
  const [progress, setProgress] = useState<number>(0);
  return (
    <CollapsibleCard
      right={
        <View style={{flexDirection: 'row', paddingRight: 10}}>
          <RoundButton
            icon="paper-plane"
            onPress={() => {
              switch (type) {
                case 'BLE': {
                  device.bleCapability
                    .startUpgrade(firmwareType, data => {
                      console.log('startUpgrade event', data);
                      setState(data.event);
                      setProgress(data.percentage);
                    })
                    .then(data => {
                      console.log('startUpgrade end', data);
                    });
                  break;
                }
              }
            }}
          />
        </View>
      }
      title="开始更新">
      <WriteItemEnum
        name="类型"
        options={options}
        value={options.findIndex(item => item === firmwareType)}
        dataKey="type"
        onChange={(attr: any) => {
          const valueIndex = attr.type || 0;
          setFirmwareType(options[valueIndex] as any);
        }}
      />
      {state !== -1 && (
        <>
          <Text>进度: {progress}</Text>
          <Text>事件: {state}</Text>
        </>
      )}
    </CollapsibleCard>
  );
};
const CheckOta = ({device, type}: {device: IDevice; type: GizCapability}) => {
  const [firmwareType, setFirmwareType] =
    useState<GizOTAFirmwareType>('Module');
  const [firmwareData, setFirmwareData] = useState<any>({});
  const options: GizOTAFirmwareType[] = ['MCU', 'Module'];
  return (
    <CollapsibleCard
      right={
        <View style={{flexDirection: 'row', paddingRight: 10}}>
          <RoundButton
            icon="paper-plane"
            onPress={() => {
              switch (type) {
                case 'BLE': {
                  device.bleCapability.checkUpdate(firmwareType).then(data => {
                    console.log('checkUpdate', data);
                    if (data.success) {
                      setFirmwareData(data.data);
                    } else {
                    }
                  });
                  break;
                }
              }
            }}
          />
        </View>
      }
      title="检查更新">
      <WriteItemEnum
        name="类型"
        options={options}
        value={options.findIndex(item => item === firmwareType)}
        dataKey="type"
        onChange={(attr: any) => {
          const valueIndex = attr.type || 0;
          setFirmwareType(options[valueIndex] as any);
        }}
      />
      <View style={{height: 10}} />
      {Object.keys(firmwareData).map(item => (
        <InfoItem key={item} name={item} value={firmwareData[item] || '-'} />
      ))}
    </CollapsibleCard>
  );
};
const GetDeviceStatus = ({
  device,
  type,
}: {
  device: IDevice;
  type: GizCapability;
}) => {
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  return (
    <CollapsibleCard
      right={
        <View style={{flexDirection: 'row', paddingRight: 10}}>
          <RoundButton
            icon="paper-plane"
            onPress={() => {
              switch (type) {
                case 'BLE': {
                  device.bleCapability.getDeviceInfo().then(data => {
                    console.log('getDeviceInfo', data);
                    if (data.success) {
                      setDeviceInfo(data.data);
                    }
                  });
                  break;
                }
              }
            }}
          />
        </View>
      }
      title="获取设备信息">
      {Object.keys(deviceInfo).length === 0 && <Text>点击查询</Text>}
      {Object.keys(deviceInfo).map(item => (
        <InfoItem key={item} name={item} value={deviceInfo[item] || '-'} />
      ))}
    </CollapsibleCard>
  );
};
