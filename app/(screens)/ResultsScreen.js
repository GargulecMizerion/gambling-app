import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import { resultItem } from "@/app/components/resultItem";
import { tabNavHeader } from "@/app/components/tabNavHeader";
import axios from 'axios';
import {UserContext} from "@/context/UserContext";

const ResultsScreen = () => {
    const [results, setResults] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/results'); // Android Emulator
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, []);

    return (
        <>
                <View className={"w-full p-5 bg-primary h-full"}>
                    {tabNavHeader({balance: user?.balance})}
                    <ScrollView>
                    {results.length > 0 ? ( // Poprawiono warunek na operator trójargumentowy
                        results.map((item, index) => (
                            <View key={index}>
                                {resultItem({
                                    date: item.date,
                                    homeTeam: item.home_team,
                                    time: item.time,
                                    awayTeam: item.away_team,
                                    result: item.result
                                })}
                            </View>
                        ))
                    ) : (
                        <View className={"w-full flex h-full justify-center align-middle"}>
                            <ActivityIndicator size="large" color="#FFFFFF" />
                        </View>
                    )}

                    </ScrollView>
                </View>
                </>
    )
}
export default ResultsScreen
