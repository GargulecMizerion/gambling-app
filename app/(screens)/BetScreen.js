import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { Button, Input } from '@rneui/base';
import * as Notifications from 'expo-notifications';
import { tabNavHeader } from '@/app/components/tabNavHeader';
import { UserContext } from "@/context/UserContext";
import { PredictionsContext } from "@/app/(screens)/TabNav";
import { betItem } from "@/app/components/betItem";
import {addNotification, getEvent, signIn, updateHistory} from "@/api/api";
import axios from "axios";

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

    const { user, contextSignIn } = useContext(UserContext);
    const { userPredictions, setUserPredictions } = useContext(PredictionsContext);

    const multiplier = Object.keys(userPredictions).reduce(
        (acc, key) => acc * (userPredictions[key] || 1), 1
    );    const prize = multiplier * amount;

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
    }, );

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


    const deleteItem = (i) => {
        const newEvents = [...events]; // Kopia tablicy
        newEvents.splice(i, 1);
        const newUserPredictions = { ...userPredictions };
        delete newUserPredictions[i];
        console.log(i);
        setEvents(newEvents);
        setUserPredictions(newUserPredictions);
    };

    const handleBet = async () => {
        if (amount <= 0 || isNaN(amount)) {
            alert("Podaj poprawną stawkę!");
            setAmount(0);
            return;
        }

        if (user?.balance < amount) {
            alert("Nie masz wystarczających środków!");
            return;
        }

        try {
            // Sprawdzenie, czy multiplier i prize są liczbami
            const validMultiplier = isNaN(multiplier) ? 1 : multiplier;  // Domyślnie ustawiamy 1 jeśli multiplier jest NaN
            const validPrize = isNaN(prize) ? 0 : prize;  // Ustawiamy 0 jeśli prize jest NaN

            console.log("🔹 Wywołuję addNotification...");
            await addNotification(
                user.id,
                `Nowy kupon z kursem ${validMultiplier.toFixed(2)} został zarejestrowany! Możliwa wygrana to $${validPrize.toFixed(2)}`
            );
            console.log("✅ Powiadomienie dodane!");

            console.log("🔹 Próbuję dodać historię zakładu...", {
                amount: validPrize.toFixed(2),
                odd: validMultiplier.toFixed(2),
                userId: user.id
            });

            await updateHistory({
                amount: validPrize,
                odd: validMultiplier,
                userId: user.id
            });

            console.log("✅ Historia zakładu została zaktualizowana!");



            // Aktualizacja salda użytkownika
            const response = await axios.patch("http://10.0.2.2:3000/users/" + user?.id, {balance: user.balance - amount});
            const result = await signIn(user.email, user.password);
            console.log(result);
            if (result) {
                await contextSignIn(result);
            }

            // Resetowanie stanu po postawieniu zakładu
            setAmount(0);
            setEvents([]);
            setUserPredictions({});
        } catch (error) {
            console.error("❌ Błąd podczas obstawiania zakładu:", error);
        }
    };





    return (
        <View className="w-full bg-primary h-full">
            <View className="p-5">{tabNavHeader({ balance: user?.balance })}</View>
            <ScrollView className={"px-5"}>
                {events.map((match, index) => (
                    betItem({
                        key: index,
                        date: match.date,
                        homeTeam: match.home_team,
                        time: match.time,
                        awayTeam: match.away_team,
                        prediction: userPredictions[match.id],
                        itemId: match.id,
                        deleteItem: deleteItem}
                    )
                ))}
            </ScrollView>

            <View className="absolute bottom-0 w-full bg-gray-800 p-4 flex-row items-center justify-center gap-5">
                <View className="flex-1 items-center justify-center pt-5">
                    <Input
                        value={amount === 0 ? "" : amount.toString()}
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
                        onChangeText={(t) => setAmount(parseFloat(t))}
                    />
                </View>
                <Text className="text-white text-lg font-bold mr-4">
                    x {isNaN(multiplier) ? "1.00" : multiplier.toFixed(2)}
                </Text>
                <Text className="text-white text-lg font-bold">
                    ${isNaN(prize) ? "0.00" : prize.toFixed(2)}
                </Text>
                <Button title="BET" onPress={multiplier > 1 ? handleBet : () => console.log("Zakład nie mozliwy")} />
            </View>
        </View>
    );
};

export default BetScreen;
