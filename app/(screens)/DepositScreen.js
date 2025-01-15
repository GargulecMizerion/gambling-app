import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from "@rneui/base";
import React from 'react';

const DepositScreen = () => {
    const navigation = useNavigation();
    const balance = 27.41;

    return (
        <View className={"w-full p-5 bg-primary h-full"}>

            <View className={"relative items-center my-10"}>
                <TouchableOpacity className={"absolute left-0"} onPress={() => navigation.goBack()}>
                    <Text className={"text-2xl font-bold text-white"}>X</Text>
                </TouchableOpacity>

                <Text className={"text-2xl"}>Depozyt</Text>
            </View>

            <View className={"flex items-center"}>
                <Text className={"text-5xl font-bold text-white"}>$ {balance.toFixed(2)}</Text>
            </View>

            <View className={"my-10"}>
                <Input
                    placeholder={"Kwota"}
                    keyboardType="numeric"
                    leftIcon={{type: "font-awesome", name: "dollar"}}
                    inputStyle={{
                        color: 'black',
                    }}
                    inputContainerStyle={{
                        borderBottomWidth: 0,
                        backgroundColor: "#F1FAEE",
                        borderRadius: 5,
                        padding: 5,
                        paddingLeft: 15,
                    }}
                    placeholderTextColor={"black"}
                    cursorColor={"black"}
                />
            </View>

            <View className={"flex-row"}>
                <TouchableOpacity className={"bg-black flex-1 py-3 rounded-lg"}>
                    <Text className={"text-white text-center"}>Depozyt</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default DepositScreen;