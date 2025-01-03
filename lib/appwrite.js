import {appwriteConfig} from "./appwriteConfig";
import {Client, Account, ID, Avatars, Databases} from "react-native-appwrite";

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const registerUser = async (username, email, password) => {


    try {
        const newAccount = await account.create(ID.unique(), email, password, username)

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl
        });

        return newUser;
    } catch (error){
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error){
        console.log(error);
        throw new Error(error);
    }
}