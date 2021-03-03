import path from "path";
import config from "../config.json";
import { AuthResult, AuthCrudResult, BasicCreds } from "../definitions/auth";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

export default class AuthService {

    private static _instance: AuthService;
    private constructor() {
        this.client = this.createClientFromDefn();
    }

    private client: any;

    private createClientFromDefn(): any {
        const authServiceConfig = config["auth-service"]
        const defnPath = path.join(path.join(__dirname, "../definitions/" + authServiceConfig["protofile"]));
        const packageDefinition = protoLoader.loadSync(
            defnPath,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        const authPkg = grpc.loadPackageDefinition(packageDefinition).auth;

        return new authPkg.Auth(authServiceConfig["serverIP"] + ":" + authServiceConfig["servicePort"], grpc.credentials.createInsecure());
    }

    public static get Instance(): AuthService {
        if (!this._instance) {
            this._instance = new AuthService();
        }
        return this._instance;
    }

    public async callBasic(user: BasicCreds): Promise<AuthResult> {
        // call the auth service using gRPC 
        return new Promise<any>((resolve, reject) => {
            this.client.basic(user, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }

    public async createUser(user: BasicCreds): Promise<AuthCrudResult> {
        console.log("Printing Input" + JSON.stringify(user));
        return new Promise<AuthCrudResult>((resolve, reject) => {
            this.client.create(user, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }

    public async modifyUser(user: BasicCreds): Promise<AuthCrudResult> {
        return new Promise<AuthCrudResult>((resolve, reject) => {
            this.client.modify(user, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }

}

