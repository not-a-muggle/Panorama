import LoginHandler from "./LoginHandler";
import UserHandler from "./UserHandler";
import config from "./config.json";
import { AuthCrudResult, AuthResult, BasicCreds } from "./definitions/auth";
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

const packageDefn = protoLoader.loadSync(
    __dirname + "/definitions/" + config.protofile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefn).auth;

async function basic(input, callback) {
    const basicAuthResponse: AuthResult = await LoginHandler.Instance.verifyBasicAuth(input.request.username, input.request.password);
    if (!basicAuthResponse.token) {
        basicAuthResponse.token = "";
    }
    callback(null, basicAuthResponse);
}

async function createUser(input, callback) {
    const user: BasicCreds = { username: input.request.username, password: input.request.password };
    try {
        const usercreationResponse: AuthCrudResult = await UserHandler.Instance.createUser(user);
        callback(null, usercreationResponse);
    } catch (ex) {
        callback(ex, { success: false });
    }
}

async function updateUser(input, callback) {
    const user: BasicCreds = { username: input.request.username, password: input.request.password };
    try {
        const usercreationResponse: AuthCrudResult = await UserHandler.Instance.updateUser(user);
        callback(null, usercreationResponse);
    } catch (ex) {
        callback(ex, { success: false });
    }
}

function main() {
    var server = new grpc.Server();
    server.addService(userProto.Auth.service, { basic: basic, create: createUser, modify: updateUser });
    server.bindAsync(config.serverIP + ':' + config.servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Auth service started on IP ${config.serverIP} Port ${config.servicePort}`);
        server.start();
    });
}

main();