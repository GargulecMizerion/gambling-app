import {Text, View} from "react-native";
import React from "react";
import BetButton from "@/app/components/betButton";
import betButton from "@/app/components/betButton";

export  const betItem = ({date, homeTeam, time, awayTeam, prediction, choosenTeam}) => {
    return (
        <View  className={" w-full rounded-xl bg-secondaryGray p-[10px] my-2 text-black"}>
            <View className={"flex-row  justify-between"}>
                <Text>Premier League</Text>
                <Text>{date}</Text>
            </View>
            <Text> asdasdas</Text>
            <View className={"flex-row w-full mt-4"}>
                <Text className={"text-2xl font-bold flex-1 text-center"}>{homeTeam}</Text>

                <Text className={"text-3xl font-bold flex-1 text-center"}>{time}</Text>
                <Text className={"text-2xl   font-bold flex-1 text-center"}>{awayTeam}</Text>
            </View>

        </View>
    )
}