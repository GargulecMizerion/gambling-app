import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import { homeItem } from "@/app/components/homeItem";
import { tabNavHeader } from "@/app/components/tabNavHeader";
import axios from 'axios';

const HomeScreen = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/matches'); // Android Emulator
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    return (
        <>
        <View className={"w-full p-5 bg-primary h-full"}>
            {tabNavHeader()}
            <ScrollView>
            {matches.length > 0 ? ( // Poprawiono warunek na operator trójargumentowy
                matches.map((item, index) => (
                    <View key={index}>
                        {homeItem({
                            date: item.date,
                            homeTeam: item.home_team,
                            time: item.time,
                            awayTeam: item.away_team,
                            predictions: item.predictions
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
    );
};

export default HomeScreen;
