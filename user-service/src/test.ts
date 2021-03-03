import { UserWithoutPassword } from "./definitions/user";

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    __dirname + "/definitions/user.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });


var user = grpc.loadPackageDefinition(packageDefinition).user;

let client = new user.User("0.0.0.0:50053", grpc.credentials.createInsecure());

// client.basic({ username: "vishesh", password: "dembla" }, (err, respons) => {
//     console.log("Mesage:" + JSON.stringify(respons));
//     console.log(err)
// })

// const userDetails: UserWithoutPassword = {
//     firstName: "Vishesh",
//     lastName: "Dembla",
//     email: "visheshdembla@hotmail.com",
//     birthday: "11-15-1995",
//     phonenumber: "8408865738"
// };

// client.createUser(userDetails, (err, response) => {
//     console.log(response);
//     console.log(err);
// });

// userDetails.lastName += userDetails.lastName;

// client.modifyUser(userDetails, (err, response) => {
//     console.log(response);
//     console.log(err);
// })

client.getUser({ email: "visheshdembla@hotmail.com" }, (err, response) => {
    console.log(response);
    console.log(err);
})


// DatabaseClient.Instance.upsertOne("user", {username: "sameer2"}, {username: "sameer2", password: "dem11"}).then(console.log);