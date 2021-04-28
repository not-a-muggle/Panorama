import express from "express";
import AuthService from "../service-clients/AuthService";
import Helper from "../util/Helper";
import * as definitions from "../definitions/user";
import UserService from "../service-clients/UserService";
import { AuthCrudResult, BasicCreds } from "../definitions/auth";
import { LogResult } from "../definitions/session-log";
import SessionLogService from "../service-clients/SessionLogService";


const router: express.Router = express.Router();

router.post('/signin', async (req: express.Request, res: express.Response) => {
    // call the auth service with the required details 
    // check the header for basic auth first
    // console.log("Hello Headers" + JSON.stringify(req));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');


    const authHeader: string = req.header("Authorization") as string;
    console.log("auth:" + authHeader);
    if (!authHeader) {
        res.sendStatus(400);
        console.log("Authorization header not found");
        return;
    }

    const isBasic = authHeader.startsWith("Basic");

    if (!isBasic) {
        res.sendStatus(400);
        console.log("Only basic authorization supported right now for login. Basic auth not found.");
        return;
    }


    const b64Creds = authHeader.substring(6, authHeader.length);

    const creds = Helper.decodeB64(b64Creds);

    console.log("creds " + creds);

    const colonPos = creds.lastIndexOf(':');
    const username = creds.substring(0, colonPos);
    const password = creds.substring(colonPos + 1, creds.length)
    if (!username || !password) {
        res.sendStatus(400);
        console.log("Username or password not found in the basic auth request");
        return;
    }


    const { success, token } = await AuthService.Instance.callBasic({ username: username, password: password });

    // auth failure
    if (!success || !token || token == "") {
        res.sendStatus(401);
        console.log('Username or password is incorrect');
        return;
    }

    // authentication successful
    // send back the token

    try {
        const logResult: LogResult = await SessionLogService.Instance.logActivity(
            {
                userId: username,
                sessionId: token,
                activityDesc: `${username} logged in`, time: Date.now().toString()
            });

        if (logResult.logged) {
            console.log("logged to session log service");
        }
        else {
            console.log("logging failed by the log service");
        }
    } catch (ex) {
        console.log("Could not log data to session log service\n", ex);
    }
    res.status(200);
    res.send({ token: token, username: username });
    return;
});


router.post('/signup', async (req: express.Request, res: express.Response) => {

    const user: definitions.UserWithoutPassword = {} as definitions.UserWithoutPassword;

    user.firstName = req.body["firstName"];
    user.lastName = req.body["lastName"];
    user.birthday = req.body["birthday"];
    user.phonenumber = req.body["phonenumber"];
    user.email = req.body["email"];

    const basicDetails: BasicCreds = { username: req.body["email"], password: req.body["password"] }

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    let userCreationResponse;
    let authCreationResponse: AuthCrudResult
    try {
        userCreationResponse = await UserService.Instance.createUser(user);
    } catch (ex) {
        console.log("User Creation Failed\n Call to User Service Failed" + ex);
        return res.sendStatus(400)//.send({ error: "User could not be created" });
    }
    try {
        authCreationResponse = await AuthService.Instance.createUser(basicDetails);
    } catch (ex) {
        console.log("User Creation Failed\n Call to Auth Service Failed" + ex);
        return res.sendStatus(400)//.send({ error: "User could not be created" });
    }
    try {
        console.log(authCreationResponse.success);
        console.log(userCreationResponse.success);
        if (!userCreationResponse.success || !authCreationResponse.success) {
            console.log("User creation failed due to failure of "
                + userCreationResponse.success ? "" : "\n-User Service "
                    + authCreationResponse.success ? "" : "\n-Auth Service");

            return res.sendStatus(400)//.send({ error: "User could not be created" });
        }

        return res.sendStatus(201)//.send({ success: true });
    } catch (ex) {
        console.log("User Creation Failed\n" + ex);
        return res.sendStatus(400)//.send({ error: "User could not be created" });
    }

});

module.exports = router;