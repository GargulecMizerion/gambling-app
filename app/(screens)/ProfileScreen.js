import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const balance = 27.41;

    return (
        <View className={"w-full p-5 bg-primary h-full"}>

            <View className={"relative items-center my-10"}>
                <TouchableOpacity className={"absolute left-0"} onPress={() => navigation.goBack()}>
                    <Text className={"text-2xl font-bold text-white"}>X</Text>
                </TouchableOpacity>

                <Text className={"text-2xl"}>Moje Konto</Text>
            </View>

            <View className={"flex items-center"}>
                <Text className={"text-5xl font-bold text-white"}>$ {balance.toFixed(2)}</Text>
            </View>

            <View className={"flex-row justify-around mb-10 my-10"}>
                <TouchableOpacity className={"bg-black flex-1 py-3 rounded-lg mr-2"}>
                    <Text className={"text-white text-center"}>Wypłać</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"bg-black flex-1 py-3 rounded-lg ml-2"}>
                    <Text className={"text-white text-center"}>Wpłać</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity className={"bg-secondaryGray py-4 px-5 rounded-lg mb-5"}>
                    <Text className={"text-lg"}>Dane osobowe</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"bg-secondaryGray py-4 px-5 rounded-lg mb-5"}>
                    <Text className={"text-lg"}>Metody płatności</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"bg-secondaryGray py-4 px-5 rounded-lg"}>
                    <Text className={"text-lg"}>Powiadomienia</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;