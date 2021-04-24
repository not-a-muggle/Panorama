import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: '*', credentials: true, methods: 'GET,PUT,POST,OPTIONS' }));

const port = 30900;


// functionalities to be provided as part of this service

// take userId as input and imageId as input and toShareWithId as input
// if userId has access to imageId, share the image with toShareWithId

// similarly provide functionalities to unshare


// list of all images shared by a particular user with other user

// list of all images share to a user by all other users

// this needs to be also made in the image-service as the image service would return the image Ids to be displayed

// otherwise we make the call to this service via RabbitMQ from the Gateway Service
// share service calls the notification service, which is done using RabbitMQ which would notify the user in case there is a new image shared with him

app.listen(port, () => {
    console.log(`listening on port ${[port]}`);
});
