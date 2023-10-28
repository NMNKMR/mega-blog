//Database and Storage(Bucket) Service
import conf from "../conf/env.config";
import { Client, Databases, Storage, ID} from "appwrite";

export class DBService {
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) // API Endpoint
        .setProject(conf.appwriteProjectId); // project ID
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    //Databases Services
    async createPost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            //console.log("Appwrite Service :: CreatePost Error :: " + error);
            return null;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            //console.log("Appwrite Service :: UpdatePost Error :: " + error);
            return null;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            //console.log("Appwrite Service :: DeletePost Error :: " + error);
            return false;
        }
    }

    async getAllPost(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            )
        } catch (error) {
            //console.log("Appwrite Service :: GetAllPost Error :: " + error);
            return null;
        }
    }

    //File Upload Services
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: UploadFile Error :: " + error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: DeleteFile Error :: " + error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const dbService = new DBService();
export default dbService;