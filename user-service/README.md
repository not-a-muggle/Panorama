# User Service

## Functionalities

The `user-service` is responsible for maintaining user related information about the system.

## Installation

### Software Requirements

* Node 14.15.5
* typescript
* All node modules listed in `package.json`

### Install required modules

Navigate to the auth service directory and execute the following command:

> npm install

This will install all the necessary modules under the folder node_modules/

Next, you would need to compile all the typescript files to create the javascript code.

You can do this using the script provided with the `package.json` which is executed as follows:

> npm run compile


### Execution

After this all you need to do is start the gRPC server. A script is provided for the same in the package file. This is the command to start the server.

> npm run start


## Implementation Details

The service is responsible for three functions; creating a user, modifying a user and getting the user info. The service does not store the password for the user, instead which is stored in the `auth-service`. The details of the user are stored in `user` which is a collection in MongoDB 
