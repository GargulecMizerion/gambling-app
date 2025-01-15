import {View, Text} from 'react-native'
import React from 'react'

export const HistoryItem = ({amount, odd, status, date}) => {

    let color = status == -1 ? "border-red" : status == 0 ? "border-black" : "border-green";

    return (
        <View className={"w-full bg-secondaryGray border-4 rounded-xl p-[10px]" + color}>
            <View  className={"flex-row justify-between"}>
                <View>
                    <Text className={"text-xl"}>{status == -1 ? "PRZEGRANY" : status == 0 ? "OTWARTY" : "WYGRANY"}</Text>
                </View>
                <View>
                <Text  className={"text-xl"}>{date}</Text>
                    </View>
            </View>

            <View className={"flex-row justify-between"}>
                <View className={""}>
                    <Text  className={"text-xl"}>KWOTa: ${amount}</Text>
                    <Text  className={"text-xl"}>KURS: {odd}</Text>
                </View>
                <View className={"flex justify-center"}>
                <Text  className={"text-4xl"}>${amount * odd}</Text>
                </View>
            </View>

        </View>
    )
}
export default HistoryItem
