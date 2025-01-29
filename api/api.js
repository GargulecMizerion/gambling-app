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

export const getEvent = async (id) => {
    try {
        const response = await axios.get(`http://10.0.2.2:3000/matches/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching matches:', error);
        return null;
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

export const addNotification = async (userId, message) => {

    const now = new Date();

    // Pobranie godzin i minut z zerowaniem (np. 09 zamiast 9)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Pobranie dnia, miesiąca i roku
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
    const year = now.getFullYear();

    // Formatowanie wyniku
    const dateTime = `${hours}:${minutes} ${day}.${month}.${year}`;


    const newNotification = {userId: userId, dateTime: dateTime, message: message};

    try {
        const response = await axios.post('http://10.0.2.2:3000/notifications', newNotification, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getNotifications = async (userId) => {
    try {
        const response = await axios.get(`http://10.0.2.2:3000/notifications`, {params: { userId: userId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications', error);
    }
}