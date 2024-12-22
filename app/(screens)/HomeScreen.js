import {View, Text} from 'react-native'
import React from 'react'
import {homeItem} from "@/app/components/homeItem";
import {tabNavHeader} from "@/app/components/tabNavHeader";


const HomeScreen = () => {



    return (
        <View className={"w-full p-5 bg-primary h-full"}>
            {tabNavHeader()}
            {homeItem()}
        </View>
    )
}
export default HomeScreen
