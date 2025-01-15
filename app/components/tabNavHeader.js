import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import {useNavigation} from "@react-navigation/native";



export const tabNavHeader = () => {

    const navigation = useNavigation();

    return (
        <View className="flex-row mb-5 p-2 border-b-2 border-white w-full items-center ">
            <Text className={"text-4xl font-bold text-darkGray flex-1"}>Gambleo.</Text>
            <View className="flex-row items-center gap-5">
                <View  className={"flex-row gap-4 bg-secondaryGray rounded-4xl items-center justify-center p-2 rounded-3xl"}>
                    <TouchableOpacity
                        className={"border-2 border-darkGray rounded-full p-1"}
                        onPress={() => navigation.navigate("Payment")}
                    >
                        <FontAwesome6Icon name={"plus"} size={15} />
                    </TouchableOpacity>
                    <Text className={"text-lg leading-none"}>$25.37</Text>
                </View>
                <TouchableOpacity
                    className={"border-2 border-darkGray rounded-full p-2"}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <FontAwesome6Icon name={"user"} size={15} />
                </TouchableOpacity>
            </View>
        </View>

    )
}
