# Gateway Service
## Functionalities
The `gateway-service` is the only service that communicates with the UI. The UI would forward user requests to gateway and the gateway acts as a entry point to the micro-service architecture from the UI. The gateway will sequence and trigger all the necessary service requests required to fulfil the user request and collect and return the response to the UI.
The gateway service is written in typescript and uses REST to communicate with the UI and gRPC to communicate with the micro-services.
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
