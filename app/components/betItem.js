import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export  const betItem = ({date, homeTeam, time, awayTeam, itemId,deleteItem}) => {
    return (
        <View  className={" w-full rounded-xl bg-secondaryGray p-[10px] my-2 text-black"}>
            <View className={"flex-row  justify-between"}>
                <Text>{date}</Text>
                <TouchableOpacity onPress={() => {deleteItem(itemId)}}>
                    <Icon name={'trash'} size={20} />;
                </TouchableOpacity>
            </View>
            <View className={"flex-row w-full mt-4"}>
                <Text className={"text-2xl font-bold flex-1 text-center"}>{homeTeam}</Text>
                <Text className={"text-3xl font-bold flex-1 text-center"}>{time}</Text>
                <Text className={"text-2xl   font-bold flex-1 text-center"}>{awayTeam}</Text>
            </View>
        </View>
    )
}