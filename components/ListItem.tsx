import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default ({children, onPress}: any) => {
    return (
        <TouchableOpacity style={{backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 20,
            paddingVertical: 20

        }} onPress={onPress}>
            {
                typeof children === 'string' ? <Text>{children}</Text>: children
            }
        </TouchableOpacity>
    )
}