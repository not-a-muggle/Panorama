import config from "./config.json";
import UserHandler, { IUser } from "./UserHandler";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const packageDefn = protoLoader.loadSync(
    __dirname + "/" + config.protofile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});


const userProto: any = grpc.loadPackageDefinition(packageDefn).auth;

function extractUser(input: any): IUser {

    const username: string = input.request.username;
    const email: string = input.request.email;
    const firstname: string = input.request.firstname;
    const lastname: string = input.request.lastname;
    const dob: string = input.request.dob;
    const joindate: string = input.request.joindate;
    const consumption: number = input.request.consumption;
    const logmech: string = input.request.logmech;

    return {
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        dob: new Date(Date.parse(dob)),
        joindate: new Date(Date.parse(joindate)),
        consumption: consumption,
        logmech: logmech
    };

}


async function createUser(input, callback) {

    const user = extractUser(input);
    try {
        const isUserCreated = await UserHandler.Instance.createUser(user);
        if (isUserCreated) {
            callback(null, user);
        }

        if (!isUserCreated) {
            callback("Unable to create user", undefined);
        }
    }
    catch (ex) {
        callback(ex, undefined);
    }

}

async function changeUser(input, callback) {
    const user = extractUser(input);
    try {
        await UserHandler.Instance.changeUser(user);
        callback(null, user);
    } catch (ex) {
        callback(ex, undefined);
    }
}

async function getUser(input, callback) {

    const username: string = input.request.username;

    if (!username) {
        callback("unable to get username", undefined);
    }

    try {
        const user: any = await UserHandler.Instance.getUser(username);

        if (!user) {
            callback("User not found", undefined);
        }
        else {
            user["dob"] = user["dob"]?.toString();
            user["joindate"] = user["joindate"]?.toString();
            callback(null, user);
        }
    } catch (ex) {
        callback(ex, undefined);
    }
}

async function deleteUser(input, callback) {

    const username: string = input.request.username;
    if (!username) {
        callback("Unable to get username", undefined);
    }

    try {
        await UserHandler.Instance.deleteUser(username);
        callback(null, { success: true });
    } catch (ex) {
        callback(ex, { success: false });
    }
}

async function getAllUsers(input, callback) {
    callback("RPC method not implemented", undefined);
}

function main() {
    var server = new grpc.Server();
    server.addService(userProto.User.service,
        {
            createUser: createUser,
            changeUser: changeUser,
            getUser: getUser,
            deleteUser: deleteUser,
            getAllUsers: getAllUsers
        });

    server.bindAsync(config.serverIP + ':' + config.servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log("User service started");
        server.start();
    });
}
main();