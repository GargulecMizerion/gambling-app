import {Text, View} from "react-native";
import React from "react";

export  const homeItem = () => {
    return (
        <View className={" w-full rounded-xl bg-secondaryGray p-[10px]"}>
            <View className={"flex-row  justify-between"}>
                <Text>Premier League</Text>
                <Text>30.12.2024</Text>
            </View>
            <View className={"flex-row w-full mt-4"}>
                <Text className={"text-2xl font-bold flex-1 text-center"}>Arsenal</Text>

                <Text className={"text-3xl font-bold flex-1 text-center"}>19:00</Text>
                <Text className={"text-2xl font-bold flex-1 text-center"}>Manchester United</Text>
            </View>
        </View>
    )
}