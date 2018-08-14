import React from 'react'
import { Text, TouchableOpacity } from 'react-native'


export default function ({ onClick, text }) {
    return (
        <TouchableOpacity
            onPress={onClick}>
            <Text >{text}</Text>
        </TouchableOpacity>
    )
}
