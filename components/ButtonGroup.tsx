import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { THEME_COLOR } from "../config/color";

export default ({options, value, onChange}: any) => {
    return (
        <View style={{flexDirection: 'row', borderRadius: 10, overflow: 'hidden'}}>
            {
                options.map((item: any) => {
                    const active = item.value === value
                    return (<Button active={active} onPress={() => {
                        onChange(item.value)
                    }}>{item.label}</Button>)
                })
            }
        </View>
    )
}

const Button = ({onPress, children, active}: any) => {
    const color = active ? '#fff' : '#000'
    return (
        <TouchableOpacity style={{
            paddingHorizontal: 20,
            paddingVertical: 14, 
            backgroundColor: active ? THEME_COLOR : '#fff',
            }} onPress={onPress}>
            <View>
                {
                    typeof children === 'string' ? <Text style={{color}}>{children}</Text>: children
                }
            </View>
        </TouchableOpacity>
    )
}