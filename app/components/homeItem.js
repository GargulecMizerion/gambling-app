import {Text, View} from "react-native";
import React from "react";
import BetButton from "@/app/components/betButton";
import betButton from "@/app/components/betButton";

export  const homeItem = ({date, homeTeam, time, awayTeam, predictions}) => {
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
            <View className={"flex-row justify-between gap-2 mt-4"}>
                {betButton({team: homeTeam, prediction: predictions.home})}
                {betButton({team: "Remis", prediction: predictions.draw})}
                {betButton({team: awayTeam, prediction: predictions.away})}
            </View>
        </View>
    )
}