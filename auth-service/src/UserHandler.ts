import DatabaseClient from "./DatabaseClient";
import { BasicCreds, AuthCrudResult } from "./definitions/auth";
export default class UserHandler {
    private static _instance: UserHandler;

    private collectionName: string = "login";
    private constructor() { }
    public static get Instance(): UserHandler {
        if (!this._instance) {
            this._instance = new UserHandler();
        }
        return this._instance;
    }

    public async createUser(user: BasicCreds): Promise<AuthCrudResult> {

        if (!user || !user.username || !user.password) {
            console.log("Insufficient information to create user");
            return { success: false };
        }

        // check if the user already exists, in that case, return an error saying that the user cannot be created

        try {
            const response = await DatabaseClient.Instance.findOne(this.collectionName, { username: user.username });
            console.log(response);
            if (response && response["username"] == user.username) {
                console.log("User already exists");
                return { success: false };
            }
        } catch (ex) {
            console.log("Unable to query database \n" + ex);
            return { success: false };
        }

        try {
            await DatabaseClient.Instance.upsertOne(this.collectionName, user, user);
            return { success: true };
        } catch (ex) {
            console.log("Unable to create user\n", ex);
            return { success: false };
        }
    }

    public async updateUser(user: BasicCreds): Promise<AuthCrudResult> {
        if (!user || !user.username || !user.password) {
            console.log("Insufficient information to update user");
            return { success: false };
        }
        try {
            await DatabaseClient.Instance.upsertOne(this.collectionName, { username: user.username }, user);
            return { success: true };
        } catch (ex) {
            console.log("Unable to create user\n", ex);
            return { success: false };
        }
    }
}