import {appwriteConfig} from "./appwriteConfig";
import {Client, Account, ID, Avatars, Databases} from "react-native-appwrite";
import axios from "axios";

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const registerUser = async (username, email, password) => {
    try {
        // Tworzenie konta w Appwrite
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error("Account creation failed");

        // Generowanie linku do avatara
        const avatarUrl = avatars.getInitials(username);

        // Automatyczne logowanie po rejestracji
        // await signIn(email, password);

        // Tworzenie dokumentu w bazie Appwrite
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        // Dodanie użytkownika do JSON Server
        const dbUser = {
            id: newAccount.$id, // Appwrite ID jako unikalny identyfikator
            username: username,
            email: email,
            password: password,
            balance: 100.0 // Początkowe saldo
        };

        const response = await axios.post('http://10.0.2.2:3000/users', dbUser, { // nie na localhoscie bo emulator
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error){
        console.log(error);
        throw new Error(error);
    }
}