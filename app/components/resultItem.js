import {Text, View} from "react-native";
import React from "react";

export  const resultItem = ({date, homeTeam, time, awayTeam, result}) => {
    return (
        <View className={" w-full rounded-xl bg-secondaryGray p-[10px] my-2"}>
            <View className={"flex-row  justify-between"}>
                <Text>Premier League</Text>
                <Text>{date}</Text>
            </View>
            <View className={"flex-row w-full mt-4"}>
                <Text className={"text-2xl font-bold flex-1 text-center"}>{homeTeam}</Text>
                <Text className={"text-3xl font-bold flex-1 text-center"}>{time}</Text>
                <Text className={"text-2xl font-bold flex-1 text-center"}>{awayTeam}</Text>
            </View>
            <View className={"flex-row justify-center items-center mt-4"}>
                <Text className={"text-4xl font-bold text-center"}>{result.home}</Text>
                <Text className={"text-4xl font-bold text-center"}> - </Text>
                <Text className={"text-4xl font-bold text-center"}>{result.away}</Text>
            </View>
        </View>
    )
}