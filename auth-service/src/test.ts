var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    __dirname + "/definitions/auth.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

// import DatabaseClient from "./DatabaseClient";

var auth = grpc.loadPackageDefinition(packageDefinition).auth;

let client = new auth.Auth("0.0.0.0:50051", grpc.credentials.createInsecure());

// client.basic({ username: "vishesh", password: "dembla" }, (err, respons) => {
//     console.log("Mesage:" + JSON.stringify(respons));
//     console.log(err)
// })

client.create({username: "Kaustubh", password: "Mane" }, (err, response) => {
    console.log(response);
    console.log(err);
})

// DatabaseClient.Instance.upsertOne("user", {username: "sameer2"}, {username: "sameer2", password: "dem11"}).then(console.log);