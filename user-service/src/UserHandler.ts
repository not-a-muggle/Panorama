import DatabaseClient from "./DatabaseClient";
import { UserWithoutPassword, UserServiceResponse } from "./definitions/user";

export default class UserHandler {

    private static _instance: UserHandler;
    private constructor() { }

    public static get Instance(): UserHandler {
        if (!this._instance) {
            this._instance = new UserHandler();
        }
        return this._instance;
    }

    public async createUser(user: UserWithoutPassword): Promise<UserServiceResponse> {

        if (!user || !user.email || !user.firstName || !user.lastName || !user.phonenumber || !user.birthday) {
            console.log("Insufficient information to create user");
            return { success: false };
        }

        try {
            await DatabaseClient.Instance.upsertOne("user", user, user);
            return { success: true };
        } catch (ex) {
            console.log("Unable to create user\n", ex);
            return { success: false };
        }
    }

    public async updateUser(user: UserWithoutPassword): Promise<UserServiceResponse> {
        if (!user || !user.email || !user.firstName || !user.lastName || !user.phonenumber || !user.birthday) {
            console.log("Insufficient information to update user");
            return { success: false };
        }
        try {
            await DatabaseClient.Instance.upsertOne("user", { email: user.email }, user);
            return { success: true };
        } catch (ex) {
            console.log("Unable to update user\n", ex);
            return { success: false };
        }
    }

    public async getUser(email: string): Promise<UserWithoutPassword> {
        if (!email) {
            console.log("Email not passed")
            return null;
        }
        try {
            const response = await DatabaseClient.Instance.findOne("user", { email: email }) as UserWithoutPassword;
            return response;
        } catch (ex) {
            console.log("User not found");
            return null;
        }
    }
}