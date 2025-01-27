import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import React, {useContext, useState} from 'react'
import {tabNavHeader} from "@/app/components/tabNavHeader";
import {homeItem} from "@/app/components/homeItem";
import historyItem from "@/app/components/historyItem";
import {UserContext} from "@/context/UserContext";

const HistoryScreen = () => {
    const {user} = useContext(UserContext);
    return (
        <>
            <View className={"w-full p-5 bg-primary h-full"}>
                {tabNavHeader({balance: user?.balance})}
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
