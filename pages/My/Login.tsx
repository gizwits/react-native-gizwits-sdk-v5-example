import {observer} from 'mobx-react';
import React, { useCallback, useState } from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import sdk from '../../models/sdk';
import BaseInput from '../../components/BaseInput';
import Button from '../../components/Button';
import user from '../../models/user';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import ButtonGroup from '../../components/ButtonGroup';
import { RNGizUserManagerModule } from 'react-native-gizwits-sdk-v5';
import LicensePopView from '../../components/LicensePopView';

const styles = StyleSheet.create({
  box: {
  }
});

const options = [{label: '账号密码登录', value: 0}, {label: '验证码登录', value: 1}]

export function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


export default observer(({navigation}: any) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [tab, setTab] = useState(0)
    console.log('tab', tab)

    const getCode = useCallback(async () => {
        if (isValidEmail(username)) {
            const data = await RNGizUserManagerModule.sendEmailLoginVerifyCode(username)
            console.log('sendEmailLoginVerifyCode', data)
        } else {
            const data = await RNGizUserManagerModule.sendMobileLoginVerifyCode('',username)
            console.log('sendMobileLoginVerifyCode', data)
        }
    }, [username, code])

    const login = useCallback(async () => {
        let data: any;
        if (tab === 0) {
            data = await user.loginWithAccount(username, password);
            
        } else {
            if (isValidEmail(username)) {
                data = await user.loginWithEmail(username, code);
            } else {
                data = await user.loginWithMobile("", username, code);
            }
        }
        console.log('onLogin', data)
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
        username, password, code, tab
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
                tab === 0 && (
                    <>
                    <View style={{height: 20}}></View>
                    <BaseInput placeholderTextColor="#ddd" placeholder='密码' value={password} onChangeText={v => setPassword(v)}></BaseInput>
                    </>
                )
            }
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                <TextButton onPress={() => {
                    navigation.navigate('注册');
                }}>注册</TextButton>
                <TextButton onPress={() => {
                    navigation.navigate('忘记密码');
                }}>忘记密码</TextButton>
            </View>
            <View style={{paddingHorizontal: 40, marginTop: 20, flexDirection: 'row', width: '100%'}}>
                
                <Button
                    title="登录"
                    onPress={async () => {
                        login()
                        
                    }}
                />
            </View>
        </KeyboardAvoidingView>

    );
});


const TextButton = ({children, onPress}: any) => {
    return (
        <TouchableOpacity hitSlop={{left: 20,top: 20,bottom:20,right: 20}} onPress={onPress}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}