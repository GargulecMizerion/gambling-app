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
                    {historyItem({
                        amount: 20,
                        odd: 3.20,
                        status: 0,
                        date: "26-12-2024"
                    })}


                </ScrollView>
            </View>
        </>
    )
}
export default HistoryScreen
