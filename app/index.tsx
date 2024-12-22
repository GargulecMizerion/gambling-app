import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "@/app/(auth)/LoginScreen";
import RegisterScreen from "@/app/(auth)/RegisterScreen";
import TabNav from "@/app/(screens)/TabNav";
// lub TabNav, jeśli jest to Tab Navigation
import "../global.css"
import ProfileScreen from "@/app/(screens)/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="HomePage" component={TabNav} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Navigator>
        </SafeAreaProvider>
    );
}
