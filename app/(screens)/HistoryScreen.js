import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {tabNavHeader} from "@/app/components/tabNavHeader";
import {homeItem} from "@/app/components/homeItem";
import historyItem from "@/app/components/historyItem";
import {UserContext} from "@/context/UserContext";
import {getHistory} from "@/api/api";

const HistoryScreen = () => {
    const [history, setHistory] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const result = await getHistory(user?.id);
                setHistory(result);
            } catch (error) {
                console.error("Błąd pobierania histrii:", error);
            }
        };

        fetchHistory();
    }, );

    return (
        <>
            <View className={"w-full px-5 bg-primary h-full"}>
                {tabNavHeader({balance: user?.balance})}
                <ScrollView>
                    {history.length > 0 ? history.map((item, index) => (
                        <View className={"mb-2"} key={index}>
                            {historyItem({
                                amount: item.amount,
                                odd: item.odd,
                                status: item.status,
                                date: item.date
                            })}
                        </View>
                    )) : <Text className={"font-extrabold text-center text-2xl"}>Brak wydarzeń w historii</Text>}
                </ScrollView>
            </View>
        </>
    )
}
export default HistoryScreen
