import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const BetButton = ({team, prediction, onPress}) => {
    return (
        <View className={"bg-secondary rounded-lg flex-1 p-1"}>
        <TouchableOpacity onPress={onPress}>

            <Text className={"text-white text-center"}>{team}</Text>

            <Text className={"text-white text-2xl text-center"}>{prediction}</Text>

        </TouchableOpacity>
        </View>
    )
}
export default BetButton
