import {observer} from 'mobx-react';
import React, { useState } from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import sdk from '../../models/sdk';
import BaseInput from '../../components/BaseInput';
import Button from '../../components/Button';
import user from '../../models/user';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


const styles = StyleSheet.create({
  box: {
  }
});

export default observer(({navigation}: any) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position': undefined} style={{
            flex: 1, 
            paddingHorizontal: 30, 
            width: '100%', 
            justifyContent: 'center',
        }}>
            <BaseInput placeholderTextColor="#ddd" placeholder='账号' value={username} onChangeText={v => setUsername(v)} autoFocus></BaseInput>
            <BaseInput placeholderTextColor="#ddd" placeholder='密码' value={password} onChangeText={v => setPassword(v)} style={{marginTop: 20}}></BaseInput>
            <View style={{paddingHorizontal: 40}}>
                <Button
                    title="注册"
                    style={{marginTop: 30}}
                    onPress={async () => {
                        const data = await user.registerWithAccount(username, password);
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
                    }}
                />
            </View>
        </KeyboardAvoidingView>

    );
});


