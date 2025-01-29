import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import notificationItem from "@/app/components/notificationItem";
import axios from "axios";
import {StatusBar} from "expo-status-bar";
import {UserContext} from "@/context/UserContext";
import {getNotifications} from "@/api/api";

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState([])
    const navigation = useNavigation();
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {

                const response = await getNotifications(user.id);
                setNotifications(response);
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
