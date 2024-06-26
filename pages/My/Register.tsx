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
const options = [{label: '账号注册', value: 0}, {label: '手机邮箱注册', value: 1}]


export default observer(({navigation}: any) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [tab, setTab] = useState(0)

    const getCode = useCallback(async () => {
        if (isValidEmail(username)) {
            const data = await RNGizUserManagerModule.sendEmailRegisterVerifyCode(username)
            console.log('sendEmailRegisterVerifyCode', data)
        } else {
            const data = await RNGizUserManagerModule.sendMobileRegisterVerifyCode('',username)
            console.log('sendMobileRegisterVerifyCode', data)
        }
    }, [username, code])
    const register = useCallback(async() => {
        let data: any;
        if (tab === 0) {
            data = await user.registerWithAccount(username, password);
            
        } else {
            if (isValidEmail(username)) {
                data = await user.registerWithEmail(username, password, code);
            } else {
                data = await user.registerWithMobile("", username, password, code);
            }
        }
        if (data.success) {
            // 返回
            navigation.goBack();
        } else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: data.error,
            });
        }
        
    }, [
        username, code, password, tab
    ])
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position': undefined} style={{
            flex: 1, 
            paddingHorizontal: 30, 
            width: '100%', 
            justifyContent: 'center',
        }}>
            <View style={{justifyContent: 'center', marginBottom: 20, alignItems: 'center'}}>
                <ButtonGroup value={tab} onChange={(v: number) => {
                    setTab(v)
                }} options={options}
                />
            </View>
            <BaseInput placeholderTextColor="#ddd" placeholder='手机或邮箱' value={username} onChangeText={v => setUsername(v)} autoFocus></BaseInput>
           
            {
                tab === 1 && (
                    <>
                        <View style={{height: 20}}></View>
                        <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                            <BaseInput placeholderTextColor="#ddd" placeholder='验证码' value={code} onChangeText={v => setCode(v)}></BaseInput>
                            <Button onPress={getCode} style={{width: 80, height: 40, flex: 0}} title="获取"></Button>
                        </View>
                    </>
                )
            }
            <View style={{height: 20}}></View>
            <BaseInput placeholderTextColor="#ddd" placeholder='密码' value={password} onChangeText={v => setPassword(v)}></BaseInput>
            <View style={{paddingHorizontal: 40}}>
                <Button
                    title="注册"
                    style={{marginTop: 30}}
                    onPress={async () => {
                        register()
                    }}
                />
            </View>
        </KeyboardAvoidingView>

    );
});


