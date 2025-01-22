import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { homeItem } from "@/app/components/homeItem";
import { tabNavHeader } from "@/app/components/tabNavHeader";
import { getEvents } from "@/api/api";
import { UserContext } from "@/context/UserContext";

const HomeScreen = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true); // Dodano stan ładowania
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isMounted = true; // Flaga do kontroli unmountowania komponentu

        const fetchMatches = async () => {
            try {
                const result = await getEvents();
                if (isMounted) {
                    setMatches(result);
                }
            } catch (error) {
                console.error("Błąd pobierania danych:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchMatches();

        return () => {
            isMounted = false; // Zmieniamy flagę na false podczas unmountu
        };
    }, []);

    return (
        <View className={"w-full p-5 bg-primary h-full"}>
            {tabNavHeader({balance: user?.balance})} {/* Przykładowe użycie user.balance */}

            <ScrollView>
                {loading ? (
                    <View className={"w-full flex h-full justify-center align-middle"}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                ) : matches.length > 0 ? (
                    matches.map((item, index) => (
                        <View key={index}>
                            {homeItem({
                                date: item.date,
                                homeTeam: item.home_team,
                                time: item.time,
                                awayTeam: item.away_team,
                                predictions: item.predictions,
                            })}
                        </View>
                    ))
                ) : (
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
                        Brak dostępnych meczów
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
