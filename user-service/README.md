# User Service
## Functionalities
The `user-service` is responsible for maintaining user related in the system.
## Installation
### Software Requirements
* Node 14.15.5
* All node modules listed in `package.json`
### Install required modules
Navigate to the auth service directory and execute the following command:
> npm install

This will install all the necessary modules under the folder node_modules/
### Execution
After this all you need to do is start the gRPC server. A script is provided for the same in the package file. This is the command to start the server.
> npm run start

## Implementation Details
The service has been implemented using Express and uses MongoDB as backend server.
The service is exposed using REST.