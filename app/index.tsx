import { Text, View } from "react-native";
import "../global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/app/(auth)/LoginScreen";
import RegisterScreen from "@/app/(auth)/RegisterScreen";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
        <StatusBar backgroundColor={"#FF7F11"} />
    </SafeAreaProvider>

  );
}
