import {View, Text, TouchableOpacity} from 'react-native'
import React, {useContext, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Input, Button, Dialog} from "@rneui/base";
import {StatusBar} from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import {DialogActions} from "@rneui/base/dist/Dialog/Dialog.Actions";
import {DialogButton} from "@rneui/base/dist/Dialog/Dialog.Button";
import {signIn} from "@/api/api";
import {UserContext} from "@/context/UserContext";



const LoginScreen = () => {
    const [loginData, setLoginData] = useState({email: "", password: ""});
    const navigation = useNavigation();
    const [dialogMessage, setDialogMessage] = useState({isVisible: false, message: ""});
    const {contextSignIn} = useContext(UserContext);
    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            setDialogMessage({isVisible: true, message: "Uzupełnij wszystkie dane"});
            return;
        }
        try {
            const result = await signIn(loginData.email, loginData.password);
            console.log(result);
            if (result){
                contextSignIn(result);
                navigation.navigate("HomePage")
            }
        }catch (error){
            setDialogMessage({isVisible: true, message: error.message});
        } finally {
            setLoginData({email: "", password: ""})
        }
    }

    return (
        <SafeAreaView>
            <View className="flex justify-center w-full h-full bg-primary gap-8">
                <Text className={"text-center text-secondary text-6xl font-extrabold"}>Gambleo.</Text>
                <View className="px-5  w-full">
                <Input placeholder={"Email"} leftIcon={{type: "font-awesome", name: "at"}}       inputStyle={{
                    color: 'black', // Kolor tekstu użytkownika
                }} inputContainerStyle={{
                    borderBottomWidth: 0, // Usunięcie linii
                    backgroundColor: "#F1FAEE",
                    borderRadius: 5,
                    padding: 5,
                    paddingLeft: 15,
                }}   placeholderTextColor={"black"}
                       cursorColor={"black"}
                       onChangeText={(e) => setLoginData({...loginData, email: e})} />

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

                                           {/*onPress={() => handleLogin()}*/}
                    <Button title="Login" onPress={() => handleLogin()} containerStyle={{paddingHorizontal: 10, borderRadius: 0}} color={"#262626"} style={{paddingHorizontal: 10, borderRadius: 50}} />
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
            <Dialog isVisible={dialogMessage.isVisible} overlayStyle={{backgroundColor: "white", borderRadius: 10}} >
                <Dialog.Title title={"Błąd"}/>
                <Text>{dialogMessage.message}</Text>
                <DialogActions>
                    <DialogButton title={"OK"} onPress={() => setDialogMessage({...dialogMessage, isVisible: false})} />
                </DialogActions>
            </Dialog>
        </SafeAreaView>
    )
}
export default LoginScreen
