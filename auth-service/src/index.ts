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

const authProto: any = grpc.loadPackageDefinition(packageDefn).auth;

async function basic(input, callback) {
    console.log("Called Basic auth for " + JSON.stringify(input.request));
    const basicAuthResponse: AuthResult = await LoginHandler.Instance.verifyBasicAuth(input.request.username, input.request.password);
    if (!basicAuthResponse.token) {
        basicAuthResponse.token = "";
    }
    callback(null, basicAuthResponse);
}

async function createUser(input, callback) {
    console.log("Called create user for " + JSON.stringify(input.request));
    const user: BasicCreds = { username: input.request.username, password: input.request.password };
    try {
        const userCreationResponse: AuthCrudResult = await UserHandler.Instance.createUser(user);
        console.log("User Creation Response -- " + JSON.stringify(userCreationResponse));
        callback(null, userCreationResponse);
    } catch (ex) {
        console.log(ex);
        callback(ex, { success: false });
    }
}

async function updateUser(input, callback) {
    console.log("Called update user for " + JSON.stringify(input.request));
    const user: BasicCreds = { username: input.request.username, password: input.request.password };
    try {
        const usercreationResponse: AuthCrudResult = await UserHandler.Instance.updateUser(user);
        console.log("User Update Response -- " + JSON.stringify(usercreationResponse));
        callback(null, usercreationResponse);
    } catch (ex) {
        callback(ex, { success: false });
    }
}

function main() {
    const serverIP = config.serverIP;
    const servicePort = 30100; //process.env.authServicePort ? process.env.authServicePort : config.servicePort;
    var server = new grpc.Server();
    server.addService(authProto.Auth.service, { basic: basic, create: createUser, modify: updateUser });
    server.bindAsync(serverIP + ':' + servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Auth service started on IP ${serverIP} Port ${servicePort}`);
        server.start();
    });
}

main();