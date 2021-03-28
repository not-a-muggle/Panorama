import UserHandler from "./UserHandler";
import config from "./config.json";
import { UserWithoutPassword } from "./definitions/user";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefn = protoLoader.loadSync(
    __dirname + "/definitions/" + config.protofile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefn).user;

async function createUser(input, callback) {
    console.log(JSON.stringify(input))
    const userDetails: UserWithoutPassword = {} as UserWithoutPassword;
    userDetails.email = input.request.email;
    userDetails.firstName = input.request.firstName;
    userDetails.lastName = input.request.lastName;
    userDetails.birthday = input.request.birthday;
    userDetails.phonenumber = input.request.phonenumber;
    try {
        const response = await UserHandler.Instance.createUser(userDetails);
        callback(null, response);
    } catch (ex) {
        callback("user cannot be created", { success: false });
    }
}

async function modifyUser(input, callback) {

    const userDetails: UserWithoutPassword = {} as UserWithoutPassword;
    userDetails.email = input.request.email;
    userDetails.firstName = input.request.firstName;
    userDetails.lastName = input.request.lastName;
    userDetails.birthday = input.request.birthday;
    userDetails.phonenumber = input.request.phonenumber;
    try {
        const response = await UserHandler.Instance.updateUser(userDetails);
        callback(null, response);
    } catch (ex) {
        callback("user cannot be created", { success: false });
    }
}

async function getUser(input, callback) {
    const email = input.request.email;
    try {
        const response: UserWithoutPassword = await UserHandler.Instance.getUser(email);
        callback(null, response);
    } catch (ex) {
        callback("user not found", {});
    }
}


function main() {
    const server = new grpc.Server();
    const serverIP = process.env.userServerIP || config.serverIP;
    const servicePort = process.env.userServicePort || config.servicePort;

    server.addService(userProto.User.service, { createUser: createUser, modifyUser: modifyUser, getUser: getUser });
    server.bindAsync(serverIP + ':' + servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`User service started on IP ${serverIP} Port ${servicePort}`);
        server.start();
    });
}
main();