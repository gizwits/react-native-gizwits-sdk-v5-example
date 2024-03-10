import {action, makeAutoObservable} from 'mobx';
// import { observer } from "mobx-react"
import {RNGizUserManagerModule} from 'react-native-gizwits-sdk-v5';
import {IUpdateAuthorizeDataParams} from 'react-native-gizwits-sdk-v5/lib/types';
class UserModel {
  uid: string = '';
  token: string = '';
  constructor() {
    makeAutoObservable(this);
  }

  @action
  async getAuthorizeData() {
    const data = await RNGizUserManagerModule.getAuthorizeData();
    console.log('getAuthorizeData', data);
    if (data.success) {
      this.uid = data.data!.uid;
      this.token = data.data!.token;
    }
    return data;
  }
  @action
  async loginByAnonymous() {
    const data = await RNGizUserManagerModule.loginByAnonymous();
    console.log('loginByAnonymous', data);
    this.getAuthorizeData();
    return data;
  }
  @action
  async loginWithAccount(username: string, password: string) {
    const data = await RNGizUserManagerModule.loginWithAccount(username, password);
    console.log('loginWithAccount', data);
    this.getAuthorizeData();
    return data;
  }
  @action
  async registerWithAccount(username: string, password: string) {
    const data = await RNGizUserManagerModule.registerWithAccount(username, password);
    console.log('registerWithAccount', data);
    this.getAuthorizeData();
    return data;
  }
  @action
  async logout() {
    const data = await RNGizUserManagerModule.logout();
    console.log('loginByAnonymous', data);
    this.getAuthorizeData();
    return data;
  }
  @action
  async updateAuthorizeData(params: IUpdateAuthorizeDataParams) {
    const data = await RNGizUserManagerModule.updateAuthorizeData(params);
    console.log('loginByAnonymous', data);
    return data;
  }
}

export default new UserModel();
