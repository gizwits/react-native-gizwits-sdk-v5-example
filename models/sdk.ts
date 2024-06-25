import {makeAutoObservable, runInAction} from 'mobx';
// import { observer } from "mobx-react"
import RNGizSDKManagerModule from 'react-native-gizwits-sdk-v5';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {
  DeviceDataRes,
  DeviceStateRes,
  IDevice,
} from 'react-native-gizwits-sdk-v5/lib/types';
import user from './user';
import deviceData from './deviceData';
import {Platform} from 'react-native';
import { APP_ID, APP_SECRET, productInfos } from '../config/appConfig';

class SDKModel {
  data: IDevice[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async initSDK() {
    let data = await RNGizSDKManagerModule.initSDK({
      appID: APP_ID,
      appSecret: APP_SECRET,
      productInfos: productInfos,
    });
    console.log('initSDK res', data);

    RNGizSDKManagerModule.addDeviceDataListener(this.deviceDataListener);
    RNGizSDKManagerModule.addDeviceListListener(this.deviceListListener);
    RNGizSDKManagerModule.addDeviceStateListener(this.deviceStateListener);

    // 更新一下token 数据
    if (Platform.OS === 'android') {
      console.log('Platform.Version', Platform.Version);
      if (Platform.Version <= 31) {
        await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
      } else {
        await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        ]);
      }
    }

    RNGizSDKManagerModule.startBleScan();
    user.getAuthorizeData();
    return data;
  }

  deviceDataListener = (data: DeviceDataRes) => {
    runInAction(() => {
      console.log('updateDeviceDataupdateDeviceDataupdateDeviceData', data);
      deviceData.updateDeviceData(data);
    });
  };
  deviceListListener = (data: IDevice[]) => {
    data.map(item => {
      // console.log('deviceListListener', item.mqttCapability);
    });
    runInAction(() => {
      this.data = data;
    });
  };
  deviceStateListener = (data: DeviceStateRes) => {
    runInAction(() => {
      const target = this.data.find(item => item.id === data.device.id);
      if (target) {
        switch (data.type) {
          case 'BLE': {
            target.bleCapability.netStatus = data.state;
            console.log(
              'deviceStateListener ble',
              target.bleCapability.netStatus,
            );
            break;
          }
          case 'LAN': {
            target.lanCapability.netStatus = data.state;
            console.log(
              'deviceStateListener lan',
              target.bleCapability.netStatus,
            );
            break;
          }
          case 'MQTT': {
            console.log(
              'deviceStateListener mqtt',
              target.bleCapability.netStatus,
            );
            target.mqttCapability.netStatus = data.state;
            break;
          }
        }
        this.data = [...this.data];
      }
    });
  };

  async getDevices() {
    let devices = await RNGizSDKManagerModule.getDevices();
    runInAction(() => {
      this.data = devices.data || [];
    });
    return this.data;
  }
}

export default new SDKModel();
