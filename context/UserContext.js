import React, { createContext, useState, useEffect } from 'react';
import {useNavigation} from "@react-navigation/native";

// Tworzymy kontekst
export const UserContext = createContext();

// Tworzymy dostawcę kontekstu (Provider)
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Przechowujemy dane zalogowanego użytkownika
    const [loading, setLoading] = useState(false); // Zarządzanie stanem ładowania


    // Funkcja logowania
     const contextSignIn = (u) => {
         //console.log(user);
         setUser(u);
     }

    // Funkcja wylogowania
    const signOut = () => {
        setUser(null); // Czyszczenie danych użytkownika
    };

    return (
        <UserContext.Provider value={{ user, loading, contextSignIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};
