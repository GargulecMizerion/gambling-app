import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "@/app/(auth)/LoginScreen";
import RegisterScreen from "@/app/(auth)/RegisterScreen";
import TabNav from "@/app/(screens)/TabNav";
// lub TabNav, jeśli jest to Tab Navigation
import "../global.css"
import ProfileScreen from "@/app/(screens)/ProfileScreen";
import DepositScreen from "@/app/(screens)/DepositScreen";
import PaymentScreen from "@/app/(screens)/PaymentScreen";
import NotificationsScreen from "@/app/(screens)/NotificationsScreen";
import {StatusBar} from "expo-status-bar";
import {UserProvider} from "@/context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <UserProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="HomePage" component={TabNav} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Deposit" component={DepositScreen} />
                    <Stack.Screen name="Payment" component={PaymentScreen} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen}/>
                </Stack.Navigator>
                <StatusBar backgroundColor={"#FF7F11"}/>
            </UserProvider>
        </SafeAreaProvider>
    );
}
