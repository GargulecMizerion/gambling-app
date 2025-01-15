import {View, Text} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import HistoryScreen from "@/app/(screens)/HistoryScreen";
import BetScreen from "@/app/(screens)/BetScreen";
import ResultsScreen from "@/app/(screens)/ResultsScreen";
import {Icon} from "react-native-vector-icons";

const Tab = createBottomTabNavigator();



const TabNav = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name={"Bet"} component={BetScreen} />
            <Tab.Screen name={"Results"} component={ResultsScreen} />
        </Tab.Navigator>
    )
}
export default TabNav
