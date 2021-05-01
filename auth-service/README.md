
# Auth Service


## Functionalities

Auth Service is used for `login` and `signup` of user. For every successful login, it will return a valid JWT token to the `gateway-service` that will be used across every request the user makes for accessing the application.

When a new user is created, the user is added to the database.
Auth service has the username and password of a user, while all the other information about the user is stored in the `user-service`.

## Installation

### Software Requirements

* Node 14.15.5
* Typescript

### Install required modules

Navigate to the auth service directory and execute the following command:

> npm install

## Compile TS Code

> npm run compile

### Execution

After this all you need to do is start the gRPC server. A script is provided for the same in the package file. This is the command to start the server.

> npm run start

