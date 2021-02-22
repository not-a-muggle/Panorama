# Gateway Service

## Functionalities

The `session-service` is responsible for maintaining session related information about the system.

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

The service is implemented in typescript and uses gRPC to expose functionalities to other services.

The service provides token creation and token verification capabilities associated with each user. The configuration of the port and other details are maintained in the `src/config.json` file which requires the module to be re-compiled in case of changes.

A sample test case is provided under `src/test.ts`.
