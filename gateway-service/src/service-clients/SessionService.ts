import path from "path";
import config from "../config.json";
import { Token, Username, UsernameAndToken, VerificationResult } from "../definitions/session";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

export default class SessionService {
    private static _instance: SessionService;

    private client: any;
    private constructor() {
        this.client = this.createClientFromDefn();

    }

    private createClientFromDefn(): any {
        const sessionServiceConfig = config["session-service"]

        let serverIP = process.env.sessionServerIP || sessionServiceConfig.serverIP;
        let servicePort = process.env.sessionServicePort || sessionServiceConfig.servicePort;

        serverIP = "session-service"
        servicePort = "30500";


        const defnPath = path.join(path.join(__dirname, "../definitions/" + sessionServiceConfig["protofile"]));
        const packageDefinition = protoLoader.loadSync(
            defnPath,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        const sessPkg = grpc.loadPackageDefinition(packageDefinition).sess;

        return new sessPkg.Session(serverIP + ":" + servicePort, grpc.credentials.createInsecure());
    }

    public static get Instance(): SessionService {
        if (!this._instance) {
            this._instance = new SessionService();
        }
        return this._instance;
    }

    public async verifyToken(usernameToken: UsernameAndToken): Promise<VerificationResult> {


        return new Promise<any>((resolve, reject) => {
            this.client.verifyToken(usernameToken, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }

    public async getToken(username: Username): Promise<Token> {
        return new Promise<any>((resolve, reject) => {
            this.client.getToken(username, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });

    }
}

// async function test() {
//     const tokenObject = await SessionService.Instance.getToken({ username: "Vishesh" });
//     const tokenVerification = await SessionService.Instance.verifyToken({ token: tokenObject.token, username: "Vishesh" });
//     console.log(JSON.stringify(tokenVerification));

//     console.log("token fetched " + JSON.stringify(tokenObject));
// }
// test();