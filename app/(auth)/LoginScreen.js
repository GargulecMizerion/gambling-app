import {View, Text, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Input, Button} from "@rneui/base";
import {StatusBar} from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const [loginData, setLoginData] = useState({username: "", password: ""});
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
                }}   placeholderTextColor={"black"}
                       cursorColor={"black"}
                       onChangeText={(e) => setLoginData({...loginData, username: e})} />

                <Input placeholder={"Password"} leftIcon={{type: "font-awesome", name: "lock"}}       inputStyle={{
                    color: 'black', // Kolor tekstu użytkownika
                }} inputContainerStyle={{
                    borderBottomWidth: 0, // Usunięcie linii
                    backgroundColor: "#F1FAEE",
                    borderRadius: 5,
                    padding: 5,
                    paddingLeft: 15,
                }}   placeholderTextColor={"black"}
                       cursorColor={"black"}
                       secureTextEntry={true}
                       onChangeText={(e) => setLoginData({...loginData, password: e})} />

                    <Button title="Login" onPress={() => navigation.navigate("HomePage")} containerStyle={{paddingHorizontal: 10, borderRadius: 0}} color={"#262626"} style={{paddingHorizontal: 10, borderRadius: 50}} />
                    <View className={"flex-row justify-center pt-5 gap-2"}>
                        <Text className={"text-lg text-gray-100"}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text  className={"text-lg"}>Register</Text>
                        </TouchableOpacity>

                    </View>
            </View>

            </View>
            <StatusBar backgroundColor={"#FF7F11"} translucent={false} style="light" />
        </SafeAreaView>
    )
}
export default LoginScreen
