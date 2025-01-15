import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import React from 'react'
import {tabNavHeader} from "@/app/components/tabNavHeader";
import {homeItem} from "@/app/components/homeItem";
import historyItem from "@/app/components/historyItem";

const HistoryScreen = () => {
    return (
        <>
            <View className={"w-full p-5 bg-primary h-full"}>
                {tabNavHeader()}
                <ScrollView>
                <View>
                   {historyItem({
                       amount: 20,
                       odd: 3.20,
                       status: 0,
                       date: "12-12-2024"
                   })}
                </View>


                </ScrollView>
            </View>
        </>
    )
}
export default HistoryScreen
