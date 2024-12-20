import {appwriteConfig} from "./appwriteConfig";
import { Client, Account, ID } from "react-native-appwrite";

const client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

const account = new Account(client);

export const registerUser = async (username, email, password) => {

    await account.create(ID.unique(), email, password, username).then(function(response){
        console.log(response);
    }, function(error){
        console.log(error);
    });


}