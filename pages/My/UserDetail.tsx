import React, {useEffect} from 'react';

import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button';
import user from '../../models/user';
import {observer} from 'mobx-react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import ListItem from '../../components/ListItem';

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
    <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 10}}>
      <ListItem onPress={() => {
        navigation.navigate('修改密码')
      }}>
        修改密码
      </ListItem>
    </View>
  );
});
