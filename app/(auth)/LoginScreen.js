import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Input, Button} from "@rneui/base";
import {useNavigation} from "expo-router";

const LoginScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View className="flex justify-center w-full h-full bg-primary gap-8">
                <Text className={"text-center text-secondary text-6xl font-extrabold"}>Gambleo.</Text>
                <View className="px-5  w-full">
                <Input placeholder={"Username"} leftIcon={{type: "font-awesome", name: "user"}}       inputStyle={{
                    color: 'black', // Kolor tekstu użytkownika
                }} inputContainerStyle={{
                    borderBottomWidth: 0, // Usunięcie linii
                    backgroundColor: "#F1FAEE",
                    borderRadius: 5,
                    padding: 5,
                    paddingLeft: 15,
                }}   placeholderTextColor={"black"} cursorColor={"black"}/>

                <Input placeholder={"Password"} leftIcon={{type: "font-awesome", name: "lock"}}       inputStyle={{
                    color: 'black', // Kolor tekstu użytkownika
                }} inputContainerStyle={{
                    borderBottomWidth: 0, // Usunięcie linii
                    backgroundColor: "#F1FAEE",
                    borderRadius: 5,
                    padding: 5,
                    paddingLeft: 15,
                }}   placeholderTextColor={"black"}  cursorColor={"black"} secureTextEntry={true} />
                    <Button title="Login" onPress={() => navigation.navigate("Register")} containerStyle={{paddingHorizontal: 10, borderRadius: 0}} color={"#262626"} style={{paddingHorizontal: 10, borderRadius: 50}} />
            </View>
            </View>

        </SafeAreaView>
    )
}
export default LoginScreen
