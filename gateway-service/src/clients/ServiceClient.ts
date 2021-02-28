import config from "../config.json";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

export default abstract class ServiceClient {
    abstract serviceName: string;
    
    private createClientFromDefn(): any {
        const authServiceConfig = config[this.serviceName]
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
} 