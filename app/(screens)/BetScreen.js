import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { Button, Input } from '@rneui/base';
import * as Notifications from 'expo-notifications';
import { tabNavHeader } from '@/app/components/tabNavHeader';
import { UserContext } from "@/context/UserContext";
import { PredictionsContext } from "@/app/(screens)/TabNav";
import { betItem } from "@/app/components/betItem";
import { getEvent } from "@/api/api";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const BetScreen = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [events, setEvents] = useState([]);
    const [amount, setAmount] = useState(0);

    const { user } = useContext(UserContext);
    const { userPredictions } = useContext(PredictionsContext);

    const multiplier = Object.keys(userPredictions).reduce((acc, key) => acc * userPredictions[key], 1);
    const prize = multiplier * amount;

    useEffect(() => {
        const fetchItems = async () => {
            const matches = await Promise.all(
                Object.keys(userPredictions).map(async (item) => {
                    return await getEvent(item);
                })
            );
            setEvents(matches);
        };

        fetchItems();
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, [userPredictions]);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Nie uzyskano zgody na powiadomienia!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;

        console.log('Token powiadomień:', token);
        return token;
    }

    async function sendPushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Zakład został postawiony!',
                body: `Twój zakład z kursem ${multiplier.toFixed(2)} został zarejestrowany. Powodzenia!`,
            },
            trigger: null,
        });
    }

    return (
        <View className="w-full bg-primary h-full">
            <View className="p-5">{tabNavHeader({ balance: user?.balance })}</View>

            <ScrollView>
                {events.map((match, index) => (
                    betItem({
                        key: index,
                        date: match.date,
                        homeTeam: match.home_team,
                        time: match.time,
                        awayTeam: match.away_team,
                        prediction: userPredictions[match.id]})

                ))}
            </ScrollView>

            <View className="absolute bottom-0 w-full bg-gray-800 p-4 flex-row items-center justify-center gap-5">
                <View className="flex-1 items-center justify-center pt-5">
                    <Input
                        placeholder={"Stawka"}
                        keyboardType="numeric"
                        leftIcon={{ type: "font-awesome", name: "dollar" }}
                        inputStyle={{ color: 'black', fontSize: 16, lineHeight: 20 }}
                        inputContainerStyle={{
                            height: 40,
                            borderBottomWidth: 0,
                            backgroundColor: "#F1FAEE",
                            borderRadius: 5,
                            padding: 5,
                            paddingLeft: 15,
                            justifyContent: "center",
                        }}
                        placeholderTextColor={"black"}
                        cursorColor={"black"}
                        onChangeText={(t) => setAmount(parseFloat(t) || 0)}
                    />
                </View>
                <Text className="text-white text-lg font-bold mr-4">x {multiplier.toFixed(2)}</Text>
                <Text className="text-white text-lg font-bold">${prize.toFixed(2)}</Text>
                <Button title="BET" onPress={multiplier > 1 ? sendPushNotification : () => console.log("Zakład nie mozliwy")} />
            </View>
        </View>
    );
};

export default BetScreen;
