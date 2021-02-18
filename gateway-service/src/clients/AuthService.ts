import config from "../config.json";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

export default class AuthService {

    private static _instance: AuthService;
    private constructor() { }

    private client: any;

    private createClientFromDefn(): any {
        const authServiceConfig = config["auth-service"]
        const packageDefinition = protoLoader.loadSync(
            __dirname + "/definitions/" + authServiceConfig["protofile"],
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

    public async callBasic(username: string, password: string): Promise<{ authenticated: boolean, token: string }> {

        if (!this.client) {
            this.client = this.createClientFromDefn();
        }

        // call the auth service using gRPC 
        return new Promise<any>((resolve, reject) => {
            this.client.basic({ username: username, password: password }, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve({ authenticated: response.success, token: response.token });
            });
        });
    }

}