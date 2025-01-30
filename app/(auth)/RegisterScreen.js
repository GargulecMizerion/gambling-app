import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {Input, Button, Dialog} from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import {registerUser} from "@/lib/appwrite";
import {DialogButton} from "@rneui/base/dist/Dialog/Dialog.Button";

const RegisterScreen = () => {
    const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!registerData.username || !registerData.password || !registerData.email) {
            setDialogVisibility(true);
        }
        setIsSubmitting(true);
        console.log(registerData);
        await registerUser(registerData.username ,registerData.email, registerData.password);
        setRegisterData({ username: "", email: "", password: "" })
    }

    return (
        <SafeAreaView>
            <View className="flex justify-center w-full h-full bg-primary gap-8">
                <Text className={"text-center text-secondary text-6xl font-extrabold"}>Gambleo.</Text>
                <View className="px-5 w-full">
                    <Input
                        placeholder={"Username"}
                        leftIcon={{ type: "font-awesome", name: "user" }}
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
                        onChangeText={(e) => setRegisterData({ ...registerData, username: e })}
                    />

                    <Input
                        placeholder={"Email"}
                        leftIcon={{ type: "font-awesome", name: "at" }}
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
                        onChangeText={(e) => setRegisterData({ ...registerData, email: e })}
                    />

                    <Input
                        placeholder={"Password"}
                        leftIcon={{ type: "font-awesome", name: "lock" }}
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
                        secureTextEntry={true}
                        onChangeText={(e) => setRegisterData({ ...registerData, password: e })}
                    />

                    <Button
                        title={<Text style={{ color: "white", fontSize: 16 }}>Register</Text>}
                        onPress={handleRegister}
                        containerStyle={{ paddingHorizontal: 10, borderRadius: 0 }}
                        color={"#262626"}
                    />

                    <View className={"flex-row justify-center pt-5 gap-2"}>
                        <Text className={"text-lg text-gray-100"}>
                            Do you have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text className={"text-lg"}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Dialog isVisible={dialogVisibility} onBackdropPress={() => setDialogVisibility(false)} overlayStyle={{backgroundColor: "white", borderRadius: 5}}  >
                    <Dialog.Title title={"Błąd"} />
                    <Text>Sprawdź poprawność uzupełnienia formularza</Text>
                    <DialogButton title={"OK"} onPress={() => setDialogVisibility(false)} />
                </Dialog>

                <StatusBar backgroundColor={"#FF7F11"} translucent={false} style="light" />
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
