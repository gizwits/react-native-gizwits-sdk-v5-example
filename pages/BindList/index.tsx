import {observer} from 'mobx-react';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import sdk from '../../models/sdk';
import {IDevice} from 'react-native-gizwits-sdk-v5/lib/types';
import DeviceBox from '../../components/DeviceBox';

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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

export default observer(({navigation}: any) => {
  const renderItem = (device: IDevice) => {
    return (
      <DeviceBox
        device={device}
        onPress={() => {
          navigation.navigate('设备详情', {id: device.id});
        }}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.flatList}
        data={sdk.data.filter(item => item.isBind)}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
});
