import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from "@rneui/base";
import React, {useContext, useState} from 'react';
import {UserContext} from "@/context/UserContext";
import axios from "axios";
import {addNotification, signIn} from "@/api/api";

const DepositScreen = () => {
    const [value, setValue] = useState(0);
    const navigation = useNavigation();
    const { user, contextSignIn } = useContext(UserContext);

    const handlePayment = async () => {
        if (user.balance - value >= 0) {
            const response = await axios.patch("http://10.0.2.2:3000/users/" + user?.id, {balance: user.balance - value});
            console.log(response);
            const result = await signIn(user.email, user.password);
            console.log(result);
            if (result){
                await contextSignIn(result);
                navigation.navigate("HomePage")
            }

            await addNotification(user.id, "Pieniądze wypłacone pomyślnie!")
        }



    }

    return (
        <View className={"w-full p-5 bg-primary h-full"}>

            <View className={"relative items-center my-10"}>
                <TouchableOpacity className={"absolute left-0"} onPress={() => navigation.goBack()}>
                    <Text className={"text-2xl font-bold text-white"}>X</Text>
                </TouchableOpacity>

                <Text className={"text-2xl"}>Depozyt</Text>
            </View>

            <View className={"flex items-center"}>
                <Text className={"text-5xl font-bold text-white"}>$ {user?.balance.toFixed(2).toString()}</Text>
            </View>

            <View className={"my-10"}>
                <Input
                    placeholder={value ?  value.toString() : "Kwota"}
                    onChangeText={(t) => setValue(parseInt(t))}
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
                <TouchableOpacity className={"bg-black flex-1 py-3 rounded-lg"} onPress={handlePayment}>
                    <Text className={"text-white text-center"}>Wypłać</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default DepositScreen;