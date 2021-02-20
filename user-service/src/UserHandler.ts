import mongoose from "mongoose";
const User = require('./models/user');

export interface IUser {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  dob: Date;
  joindate: Date;
  consumption: number;
  logmech: string;
}

export default class UserHandler {

  private static _instance: UserHandler;
  private constructor() { }

  public static get Instance(): UserHandler {
    if (!this._instance) {
      this._instance = new UserHandler();
    }
    return this._instance;
  }

  public async getAllUsers(): Promise<IUser[]> {
    try {
      const users = User.find().exec();
      return users;
    } catch (ex) {
      console.log("Unable to fetch all users\n" + ex)
      return [];
    }
  }

  public async createUser(user: IUser): Promise<boolean> {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      dob: user.dob,
      joindate: user.joindate,
      consumption: user.consumption,
      logmech: user.logmech
    });

    try {
      const result = await newUser.save();
      console.log(result);
      return true;
    } catch (ex) {
      console.log("Unable to create user\n" + ex);
      return false;
    }

  }

  public async getUser(username: string): Promise<IUser> {
    try {
      const user = await User.findOne({ username: username });
      return user;
    } catch (ex) {
      console.log("Unable to view user " + username + "\n" + ex);
      return undefined;
    }
  }

  public async changeUser(user: IUser): Promise<void> {

    const username = user.username;
    try {
      const result = await User.updateOne({ username: username }, user);
    } catch (ex) {
      console.log("Unable to update the user " + username + "\n" + ex);
    }
  }


  public async deleteUser(username: string): Promise<void> {

    try {
      await User.deleteOne({ username: username });
    } catch (ex) {
      console.log("Unable to update the user " + username + "\n" + ex);
    }
  }


}