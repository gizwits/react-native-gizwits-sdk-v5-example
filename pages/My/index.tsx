import React, {useEffect} from 'react';

import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button';
import user from '../../models/user';
import {observer} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  userInfoText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
});
export default observer(({navigation}: any) => {
  const {token} = user;
  return (
    <View style={{flex: 1, }}>
      <UserInfo navigation={navigation}></UserInfo>
      <View style={{flex: 1,}}></View>
      <View style={{paddingHorizontal: 30,paddingBottom: 20}}>
        {token && (
          <Button
            title="退出登录"
            onPress={async () => {
              const data = await user.logout();
              console.log('logout', data);
            }}
          />
        )}
      </View>
    </View>
  );
});

const UserInfo = observer(({navigation}: any) => {
  const {token} = user;

  return (
    <TouchableOpacity style={styles.userInfoContainer} onPress={() => {
      if (!token) {
        navigation.navigate('登录');
      } else {
        navigation.navigate('用户详情');
      }
    }}>
      <Icon name="user"></Icon>
      <Text style={styles.userInfoText}>{token ? '用户名': '去登录'}</Text>
    </TouchableOpacity>
  )
})