import { View, Text, ScrollView } from 'react-native'
import { tabNavHeader } from "@/app/components/tabNavHeader";
import React from 'react'

const BetScreen = () => {
    return (
        <View className={"w-full bg-primary h-full"}>
            <View className={"p-5"}>
                {tabNavHeader()}
                <ScrollView>

                </ScrollView>
            </View>

            <View className={"absolute bottom-0 w-full bg-gray-800 p-4 flex-row items-center"}>
                <View className={"flex-1 bg-white rounded-md p-2 mr-2"}>
                    <Text className={"text-center text-black font-bold"}>Stawka</Text>
                </View>
                <Text className={"text-white text-lg font-bold mr-4"}>x 3.70</Text>
                <Text className={"text-white text-lg font-bold"}>$0.00</Text>
            </View>

        </View>
    )
}
export default BetScreen
