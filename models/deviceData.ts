import {action, makeAutoObservable} from 'mobx';
// import { observer } from "mobx-react"
import {DeviceDataRes} from 'react-native-gizwits-sdk-v5/lib/types';
class DeviceData {
  deviceData: Map<string, any> = new Map();
  constructor() {
    makeAutoObservable(this);
  }

  @action
  updateDeviceData = (data: DeviceDataRes) => {
    const currentData = this.deviceData.get(data.device.id) || {};
    this.deviceData.set(data.device.id, {
      ...currentData,
      ...(data.data.data || {}),
    });
  };
}

export default new DeviceData();
