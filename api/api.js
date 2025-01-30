import axios from "axios";

const getDate = () => {
    const now = new Date();

    // Pobranie godzin i minut z zerowaniem (np. 09 zamiast 9)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Pobranie dnia, miesiąca i roku
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
    const year = now.getFullYear();

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

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

    const dateTime = getDate();
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

export const deleteNotification = async (id) => {
    try{
        const response = await axios.delete(`http://10.0.2.2:3000/notifications/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting notification', error);
        return false;
    }
}

export const updateHistory = async ({amount, odd, userId}) => {
    const dateTime = getDate();

    const newItem = {
        amount: amount.toFixed(2),
        odd: odd.toFixed(2),
        date: dateTime,
        status: 0,
        userId: userId,
    }

    try {
        const response = await axios.post('http://10.0.2.2:3000/history', newItem, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("dziala");
        return newItem;
    } catch (error) {
        console.error('Error puttiing history', error);
        return false;
    }

}


export const getHistory = async (userId) => {
    try {
        const response = await axios.get(`http://10.0.2.2:3000/history`, {params: { userId: userId } });
        return response.data;
    } catch (error){
        console.error('Error fetching history', error);
        return false
    }
}
