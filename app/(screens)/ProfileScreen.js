import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const balance = 23.41;
    const [profileImage, setProfileImage] = useState(null); // State na zdjęcie profilowe

    // Funkcja do załadowania zapisanego zdjęcia z AsyncStorage
    const loadProfileImage = async () => {
        try {
            const savedImagePath = await AsyncStorage.getItem('profileImage');
            if (savedImagePath) {
                setProfileImage(savedImagePath);
            }
        } catch (error) {
            console.error("Error loading profile image:", error);
        }
    };

    // Użyj useFocusEffect, aby ładować zdjęcie za każdym razem, gdy ekran jest aktywowany
    useFocusEffect(
        useCallback(() => {
            loadProfileImage();
        }, [])
    );

    const handleChangeProfilePicture = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Brak uprawnień", "Aby zmienić zdjęcie profilowe, musisz zezwolić na użycie aparatu.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Zdjęcie w proporcjach 1:1
            quality: 1, // Wysoka jakość
        });

        if (!result.canceled) {
            try {
                // Ścieżka docelowa dla zapisanego zdjęcia
                const newPath = `${FileSystem.documentDirectory}profile.jpg`;

                // Skopiowanie obrazu do lokalnej pamięci
                await FileSystem.copyAsync({
                    from: result.assets[0].uri,
                    to: newPath,
                });

                // Zapisanie ścieżki w AsyncStorage
                await AsyncStorage.setItem('profileImage', newPath);

                // Aktualizacja stanu
                setProfileImage(newPath);
                Alert.alert("Sukces", "Zdjęcie profilowe zostało zmienione!");
            } catch (error) {
                console.error("Error saving profile picture:", error);
                Alert.alert("Błąd", "Nie udało się zapisać zdjęcia profilowego.");
            }
        }
    };

    return (
        <View className={"w-full p-5 bg-primary h-full"}>
            <Image
                source={profileImage ? { uri: profileImage } : require("../../assets/images/unknown.jpg")}
                className={"w-[40px] h-[40px] contain rounded-full"}
            />
            <View className={"relative items-center my-10"}>
                <TouchableOpacity className={"absolute left-0"} onPress={() => navigation.goBack()}>
                    <Text className={"text-2xl font-bold text-white"}>X</Text>
                </TouchableOpacity>

                <Text className={"text-2xl"}>Moje Konto</Text>
            </View>

            <View className={"flex items-center"}>
                <Text className={"text-5xl font-bold text-white"}>$ {balance.toFixed(2)}</Text>
            </View>

            <View className={"flex-row justify-around mb-10 my-10"}>
                <TouchableOpacity
                    className={"bg-black flex-1 py-3 rounded-lg mr-2"}
                    onPress={() => navigation.navigate("Payment")}
                >
                    <Text className={"text-white text-center"}>Wpłać</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={"bg-black flex-1 py-3 rounded-lg ml-2"}
                    onPress={() => navigation.navigate("Deposit")}
                >
                    <Text className={"text-white text-center"}>Wypłać</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity className={"bg-secondaryGray py-4 px-5 rounded-lg mb-5"}>
                    <Text className={"text-lg"}>Dane osobowe</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"bg-secondaryGray py-4 px-5 rounded-lg mb-5"}>
                    <Text className={"text-lg"}>Metody płatności</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={"bg-secondaryGray py-4 px-5 rounded-lg mb-5"}
                    onPress={() => navigation.navigate("Notifications")}
                >
                    <Text className={"text-lg"}>Powiadomienia</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={"bg-secondaryGray py-4 px-5 rounded-lg"}
                    onPress={handleChangeProfilePicture}
                >
                    <Text className={"text-lg"}>Zmień zdjęcie profilowe</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;
