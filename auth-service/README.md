# Auth Service

## Functionalities

Auth Service is used for `login` and `signup` of user. For every successful login, it will return a valid JWT token to the `gateway-service` that will be used across every request the user makes for accessing the application.

When a new user is created, the user is added to the database.
Auth service has the username and password of a user, while all the other information about the user is stored in the `user-service`.

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


## Implementation Status

The service is implemented using gRPC to expose the functionalities. The implementation of the login using basic authentication is done. The service will be extended to provide OAuth based sign-in capabilities for Google, GitHub and IU later.

The sign-up is still pending and will be completed soon.

The auth-service is dependent on the `session-service` to retrieve the token for the login functionality.

We need to make sure that the auth and the session service are running on different ports.

The service also needs an instance of mongoDB running on the system.

The URL for this is customizable and provided under src/config.json. In case the URL is changed, the source code needs to be re-compiled.

The file also has reference to the session-service as it depends on the session service.

Basic testing code of the service is present in `src/test.ts`







