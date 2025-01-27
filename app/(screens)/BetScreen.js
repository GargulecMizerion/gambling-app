import React, {useContext, useEffect, useState} from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { Button } from '@rneui/base';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { tabNavHeader } from '@/app/components/tabNavHeader';
import {UserContext} from "@/context/UserContext";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const BetScreen = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, []);

    // Rejestracja powiadomień
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

    // Funkcja wysyłająca powiadomienie
    async function sendPushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Zakład został postawiony!',
                body: 'Twój zakład został zarejestrowany. Powodzenia!',
            },
            trigger: null, // Natychmiastowe powiadomienie
        });
    }

    return (
        <View className="w-full bg-primary h-full">
            <View className="p-5">{tabNavHeader({balance: user?.balance})}</View>

            <ScrollView />

            <View className="absolute bottom-0 w-full bg-gray-800 p-4 flex-row items-center">
                <View className="flex-1 bg-white rounded-md p-2 mr-2">
                    <Text className="text-center text-black font-bold">Stawka</Text>
                </View>
                <Text className="text-white text-lg font-bold mr-4">x 3.70</Text>
                <Text className="text-white text-lg font-bold">$0.00</Text>
                <Button title="BET" onPress={sendPushNotification} />
            </View>
        </View>
    );
};

export default BetScreen;
