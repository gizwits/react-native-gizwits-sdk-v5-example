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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [tab, setTab] = useState(0)

    const getCode = useCallback(async () => {
        if (isValidEmail(username)) {
            const data = await RNGizUserManagerModule.sendEmailForgotPasswordVerifyCode(username)
            console.log('sendEmailForgotPasswordVerifyCode', data)
        } else {
            const data = await RNGizUserManagerModule.sendMobileForgotPasswordVerifyCode('',username)
            console.log('sendMobileForgotPasswordVerifyCode', data)
        }
    }, [username, code])
    const register = useCallback(async() => {
        let data: any;
        if (isValidEmail(username)) {
            data = await RNGizUserManagerModule.forgotWithEmail(username, code, password);
        } else {
            data = await RNGizUserManagerModule.forgotWithMobile("", username,code, password);
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
            <BaseInput placeholderTextColor="#ddd" placeholder='手机或邮箱' value={username} onChangeText={v => setUsername(v)} autoFocus></BaseInput>
           
            <View style={{height: 20}}></View>
            <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                <BaseInput placeholderTextColor="#ddd" placeholder='验证码' value={code} onChangeText={v => setCode(v)}></BaseInput>
                <Button onPress={getCode} style={{width: 80, height: 40, flex: 0}} title="获取"></Button>
            </View>
            <View style={{height: 20}}></View>
            <BaseInput placeholderTextColor="#ddd" placeholder='密码' value={password} onChangeText={v => setPassword(v)}></BaseInput>
            <View style={{paddingHorizontal: 40}}>
                <Button
                    title="忘记密码"
                    style={{marginTop: 30}}
                    onPress={async () => {
                        register()
                    }}
                />
            </View>
        </KeyboardAvoidingView>

    );
});


