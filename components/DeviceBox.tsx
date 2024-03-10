import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {IDevice} from 'react-native-gizwits-sdk-v5/lib/types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {THEME_COLOR} from '../config/color';
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  flatList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 14,
    paddingLeft: 6,
    color: '#999',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  mainIcon: {
    marginRight: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
  },
  subIcon: {
    marginHorizontal: 6,
    fontSize: 16,
  },
});
const Item = ({label, value}: any) => {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
const DeviceBox = ({
  device,
  onPress = () => {},
}: {
  device: IDevice;
  onPress?: any;
}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <View style={styles.item}>
        <Icon style={styles.mainIcon} name="server" />
        <Text style={styles.title}>{device.name || device.mac}</Text>
      </View>
      <Item label="PK:" value={device.productKey} />
      <Item label="MAC:" value={device.mac} />

      <View style={styles.icons}>
        <Icon
          style={styles.subIcon}
          color={device.lanCapability.netStatus > 0 ? THEME_COLOR : '#999'}
          name="home"
        />
        <Icon
          style={styles.subIcon}
          color={device.bleCapability.netStatus > 0 ? THEME_COLOR : '#999'}
          name="bluetooth"
        />
        <Icon
          style={styles.subIcon}
          color={device.mqttCapability.netStatus > 0 ? THEME_COLOR : '#999'}
          name="wifi"
        />
      </View>
    </TouchableOpacity>
  );
};

const SimpleDeviceBox = ({
  device,
  onPress = () => {},
}: {
  device: IDevice;
  onPress?: any;
}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <View style={styles.item}>
        <Icon style={styles.mainIcon} name="server" />
        <Text style={styles.title}>{device.name || device.mac}</Text>
      </View>
      <Item label="PK:" value={device.productKey} />
      <Item label="MAC:" value={device.mac} />
    </TouchableOpacity>
  );
};
export {SimpleDeviceBox};
export default DeviceBox;
