import path from "path";
import config from "../config.json";
import { Activity, ActivityInfo, LogResult, SessionInfo } from "../definitions/session-log";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");


export default class SessionLogService {
    private static _instance: SessionLogService;

    private client: any;
    private constructor() {
        this.client = this.createClientFromDefn();

    }

    private createClientFromDefn(): any {
        const sessionServiceConfig = config["session-log-service"]
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

        return new sessPkg.LogService(sessionServiceConfig["serverIP"] + ":" + sessionServiceConfig["servicePort"], grpc.credentials.createInsecure());
    }

    public static get Instance(): SessionLogService {
        if (!this._instance) {
            this._instance = new SessionLogService();
        }
        return this._instance;
    }

    public async logActivity(activity: Activity): Promise<LogResult> {
        // return new Promise<any>((resolve, reject) => {
        //     this.client.logActivity(activity, (err: any, response: any) => {
        //         if (err) {
        //             reject(err);
        //         }
        //         resolve(response);
        //     });
        // });
        return { logged: true }
    }

}