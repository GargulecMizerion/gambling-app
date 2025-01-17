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
            <View className={"relative items-center my-10"}>
                <TouchableOpacity className={"absolute left-0"} onPress={() => navigation.goBack()}>
                    <Text className={"text-2xl font-bold text-white"}>X</Text>
                </TouchableOpacity>

                <Text className={"text-2xl"}>Powiadomienia</Text>
            </View>

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
