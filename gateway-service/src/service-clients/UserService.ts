import path from "path";
import config from "../config.json";
import { User, UserAuthenticationResponse, UserServiceResponse, UserWithoutPassword } from "../definitions/user";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

export default class UserService {


    private static _instance: UserService;
    private client: any;
    private constructor() {
        this.client = this.createClientFromDefn();
    }


    public async createUser(user: UserWithoutPassword): Promise<UserServiceResponse> {
        return new Promise<UserServiceResponse>((resolve, reject) => {
            this.client.createUser(user, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }

    public async modifyUser(user: UserWithoutPassword): Promise<UserServiceResponse> {
        return new Promise<UserServiceResponse>((resolve, reject) => {
            this.client.modifyUser(user, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }


    private createClientFromDefn(): any {
        const userServiceConfig = config["user-service"]

        let serverIP = process.env.userServerIP || userServiceConfig.serverIP;
        let servicePort = process.env.userServicePort || userServiceConfig.servicePort;


        serverIP = "ipv4:172.30.141.81"
        servicePort = "30600";

        const defnPath = path.join(path.join(__dirname, "../definitions/" + userServiceConfig["protofile"]));
        const packageDefinition = protoLoader.loadSync(
            defnPath,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        const userPkg = grpc.loadPackageDefinition(packageDefinition).user;

        return new userPkg.User(serverIP + ":" + servicePort, grpc.credentials.createInsecure());
    }

    public static get Instance(): UserService {
        if (!this._instance) {
            this._instance = new UserService();
        }
        return this._instance;
    }


}