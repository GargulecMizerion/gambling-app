import axios from "axios";

export const getEvents = async () => {
    try {
        const response = await axios.get('http://10.0.2.2:3000/matches'); // Android Emulator
        return response.data;
    } catch (error) {
        console.error('Error fetching matches:', error);
        return [];
    }
}

export const signIn = async (email, password) => {
    try {
        const response = await axios.get('http://10.0.2.2:3000/users', {
            params: { email, password }, // Dodajemy oba parametry jako obiekt
        });

        // Jeśli użytkownik istnieje, zwróć pierwszego z listy (json-server zwraca tablicę)
        return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
        console.error('Error fetching user by email and password:', error);
        return null;
    }
};