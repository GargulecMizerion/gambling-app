import {View, Text} from 'react-native'
import React, {createContext, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import HistoryScreen from "@/app/(screens)/HistoryScreen";
import BetScreen from "@/app/(screens)/BetScreen";
import ResultsScreen from "@/app/(screens)/ResultsScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import {UserProvider} from "@/context/UserContext";

const Tab = createBottomTabNavigator();

export const PredictionsContext = createContext();

const TabNav = () => {

    const [userPredictions, setUserPredictions] = useState({});

    return (
    <PredictionsContext.Provider value={{userPredictions, setUserPredictions}}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'History') {
                        iconName = 'history';
                    } else if (route.name === 'Bet') {
                        iconName = 'dollar';
                    } else if (route.name === 'Results') {
                        iconName = 'list-alt';
                    }

                    return <Icon name={iconName} size={30} color={focused ? 'orange' : "gray"} />;
                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name={"Bet"} component={BetScreen} />
            <Tab.Screen name={"Results"} component={ResultsScreen} />
        </Tab.Navigator>
    </PredictionsContext.Provider>

    )
}
export default TabNav
