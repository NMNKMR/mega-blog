import conf from "../conf/env.config";
import {Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client()
    account

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) // API Endpoint
        .setProject(conf.appwriteProjectId); // project ID
        this.account = new Account(this.client);
    }

    async register({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return await this.login({email, password}) //Call Login Method
            } 
            else return userAccount;
        } catch (error) {
            throw error
            //console.log("Appwrite Service :: Register Error :: " + error);
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
            //console.log("Appwrite Service :: Login Error :: " + error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            //console.log("Appwrite Service :: GetUser Error :: " + error);
            return null;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            //console.log("Appwrite Service :: Logout Error :: " + error);
            return null;
        }
    }
}

const authService = new AuthService();
export default authService;