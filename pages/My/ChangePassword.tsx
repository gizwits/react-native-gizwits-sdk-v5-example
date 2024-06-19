import {observer} from 'mobx-react';
import React, { useCallback, useState } from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import sdk from '../../models/sdk';
import BaseInput from '../../components/BaseInput';
import Button from '../../components/Button';
import user from '../../models/user';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import ButtonGroup from '../../components/ButtonGroup';
import { isValidEmail } from './Login';
import { RNGizUserManagerModule } from 'react-native-gizwits-sdk-v5';


const styles = StyleSheet.create({
  box: {
  }
});


export default observer(({navigation}: any) => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const edit = useCallback(async() => {
        const data = await RNGizUserManagerModule.changePasswordWithOldPassword(oldPassword, password)
        console.log('changePasswordWithOldPassword', data)
        if (data.success) {
            navigation.goBack()
        }
    }, [
        oldPassword, password
    ])
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position': undefined} style={{
            flex: 1, 
            paddingHorizontal: 30, 
            width: '100%', 
            justifyContent: 'center',
        }}>
            <BaseInput placeholderTextColor="#ddd" placeholder='旧密码' value={oldPassword} onChangeText={v => setOldPassword(v)} autoFocus></BaseInput>
            <View style={{height: 20}}></View>
            <BaseInput placeholderTextColor="#ddd" placeholder='新密码' value={password} onChangeText={v => setPassword(v)}></BaseInput>
           
            <View style={{paddingHorizontal: 40}}>
                <Button
                    title="修改"
                    style={{marginTop: 30}}
                    onPress={async () => {
                        edit()
                    }}
                />
            </View>
        </KeyboardAvoidingView>

    );
});


