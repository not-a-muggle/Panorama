import express from "express";
import AuthService from "../service-clients/AuthService";
import Helper from "../util/Helper";
import * as definitions from "../definitions/user";
import UserService from "../service-clients/UserService";
import { AuthCrudResult, BasicCreds } from "../definitions/auth";


const router: express.Router = express.Router();


router.post('/signin', async (req: express.Request, res: express.Response) => {
    // call the auth service with the required details 
    // check the header for basic auth first
    const authHeader: string = req.headers["authorization"] as string;
    if (!authHeader) {
        res.status(400);
        res.send("Authorization header not found");
    }

    const isBasic = authHeader.startsWith("Basic");

    if (!isBasic) {
        res.status(400);
        res.send("Only basic authorization supported right now for login. Basic auth not found.");
    }

    const b64Creds = authHeader.substring(6, authHeader.length);

    const creds = Helper.decodeB64(b64Creds);

    const colonPos = creds.lastIndexOf(':');
    const username = creds.substring(0, colonPos);
    const password = creds.substring(colonPos + 1, creds.length)
    if (!username || !password) {
        res.status(400);
        res.send("Username or password not found in the basic auth request");
    }


    const { success, token } = await AuthService.Instance.callBasic({ username: username, password: password });

    // auth failure
    if (!success || !token || token == "") {
        res.status(401);
        res.send('Username or password is incorrect');
    }

    // authentication successful
    // send back the token
    res.status(200)
    res.send({ token: token });
});


router.post('/signup', async (req: express.Request, res: express.Response) => {

    const user: definitions.UserWithoutPassword = {} as definitions.UserWithoutPassword;

    user.firstName = req.body["firstName"];
    user.lastName = req.body["lastName"];
    user.birthday = req.body["birthday"];
    user.phonenumber = req.body["phonenumber"];
    user.email = req.body["email"];

    const basicDetails: BasicCreds = { username: req.body["email"], password: req.body["password"] }

    try {
        const userCreationResponse = await UserService.Instance.createUser(user);
        const authCreationResponse: AuthCrudResult = await AuthService.Instance.createUser(basicDetails);
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