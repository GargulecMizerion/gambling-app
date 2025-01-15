import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import notificationItem from "@/app/components/notificationItem";
import axios from "axios";
import {StatusBar} from "expo-status-bar";

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    },[])

    return (
        <View className={"bg-primary h-full p-5"}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Text className={"absolute text-2xl font-bold"}>X</Text>
            </TouchableOpacity>
            <Text className={"text-center text-2xl font-bold mb-5"}>Powiadomienia</Text>
            <ScrollView className={"flex flex-col gap-2"}>
                {
                    notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <View key={notification.id}>
                                {notificationItem({dateTime: notification.dateTime, message: notification.message})}
                            </View>
                        ))
                    ) : (<Text>Brak powiaomień</Text>)
                }
            </ScrollView>

        </View>
    )
}
export default NotificationsScreen
