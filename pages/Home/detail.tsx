import {observer} from 'mobx-react';
import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import sdk from '../../models/sdk';
import {
  GizBaseCapability,
  GizCapability,
} from 'react-native-gizwits-sdk-v5/lib/types';
import DeviceBox from '../../components/DeviceBox';
import {THEME_COLOR} from '../../config/color';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 10,
    paddingHorizontal: 20,
    flex: 1,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Item = ({name, onPress, active}: any) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text>{name}</Text>
      <Icon name="dot-circle" color={active ? THEME_COLOR : '#999'} />
    </TouchableOpacity>
  );
};

export default observer(({route, navigation}: any) => {
  const {id} = route.params as any;
  const device = sdk.data.find(item => item.id === id);

  const [spinner, setSpinner] = useState(false);
  const goToNext = useCallback(
    (type: GizCapability) => {
      navigation.navigate('设备控制', {id: device?.id, type});
    },
    [device?.id, navigation],
  );
  const onCapabilityNext = useCallback(
    (type: GizCapability) => {
      let capability: GizBaseCapability | undefined;
      switch (type) {
        case 'BLE': {
          capability = device?.bleCapability;
          break;
        }
        case 'LAN': {
          capability = device?.lanCapability;

          break;
        }
        case 'MQTT': {
          capability = device?.mqttCapability;
          break;
        }
      }
      console.log('device?.bleCapability', device?.bleCapability);
      if (capability?.netStatus === 2) {
        goToNext(type);
        return;
      }
      if (capability?.netStatus === 1) {
        // 连接设备
        setSpinner(true);
        capability.connect().then(data => {
          setSpinner(false);
          if (data.success) {
            // 跳转
            goToNext(type);
          } else {
            // 提示错误
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: data.message + ':' + data.error,
            });
          }
        });
      }
    },
    [
      device?.bleCapability,
      device?.lanCapability,
      device?.mqttCapability,
      goToNext,
      setSpinner,
    ],
  );

  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      {!!device && <DeviceBox device={device} />}

      <View style={{height: 12}} />
      <View style={{flexDirection: 'row'}}>
        <Item
          name={'注册设备'}
          active={false}
          onPress={async () => {
            const res = await device?.register();
            console.log('register:', res);
            if (res?.success) {
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: '注册成功',
              });
            } else {
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: res?.message + ':' + res?.error,
              });
            }
          }}
        />
        <View style={{width: 10}} />
        <Item
          name={device?.isBind ? '解除绑定' : '绑定'}
          active={device?.isBind}
          onPress={async () => {
            const res = device?.isBind
              ? await device?.unBind()
              : await device?.bind();
            if (res?.success) {
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: '操作成功',
              });
            } else {
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: res?.message + ':' + res?.error,
              });
            }
          }}
        />
      </View>
      <Item
        name="局域网通道"
        onPress={() => onCapabilityNext('LAN')}
        active={device?.lanCapability.netStatus === 2}
      />
      <Item
        name="蓝牙通道"
        onPress={() => onCapabilityNext('BLE')}
        active={device?.bleCapability.netStatus === 2}
      />
      <Item
        name="MQTT通道"
        onPress={() => onCapabilityNext('MQTT')}
        active={device?.mqttCapability.netStatus === 2}
      />
    </ScrollView>
  );
});
