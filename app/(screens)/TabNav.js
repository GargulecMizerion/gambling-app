import {View, Text} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import HistoryScreen from "@/app/(screens)/HistoryScreen";

const Tab = createBottomTabNavigator();



const TabNav = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name={"History"} component={HistoryScreen} />
        </Tab.Navigator>
    )
}
export default TabNav
