
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export default ({style, ...other}: TextInputProps) => {
    return (
        <TextInput style={[{
            borderRadius: 10,
            backgroundColor: '#fff',
            flex: 1,
            fontSize: 17,
            minHeight: 50,
            paddingHorizontal: 14,
            paddingVertical: 12,
        }, style]} {...other}></TextInput>
    )
}