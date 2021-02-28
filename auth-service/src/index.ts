import LoginHandler from "./LoginHandler";
import IBasicResponse from "./IBasicResponse";
import path from "path";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const config = require(path.join(__dirname, "../../config.json"));
const pJson = require(path.join(__dirname, "../package.json"));
const serviceName = pJson["name"];

const packageDefn = protoLoader.loadSync(
    __dirname + "../../proto/" + config.protofile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefn).auth;

async function basic(input, callback) {
    const basicAuthResponse: IBasicResponse = await LoginHandler.Instance.verifyBasicAuth(input.request.username, input.request.password);
    if (!basicAuthResponse.token) {
        basicAuthResponse.token = "";
    }
    basicAuthResponse["success"] = basicAuthResponse["authenticated"]
    delete basicAuthResponse["authenticated"];
    callback(null, basicAuthResponse);
}

function main() {
    var server = new grpc.Server();
    server.addService(userProto.Auth.service, { basic: basic });
    server.bindAsync(config[serviceName].serverIP + ':' + config[serviceName].servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Auth service started on IP ${config[serviceName].serverIP} Port ${config[serviceName].servicePort}`);
        server.start();
    });
}

main();