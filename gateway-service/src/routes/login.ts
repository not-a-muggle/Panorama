import express from "express";
import AuthService from "../clients/AuthService";
import Helper from "../util/Helper";

const router: express.Router = express.Router();


router.post('/login', async (req: express.Request, res: express.Response) => {
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


    const { authenticated, token } = await AuthService.Instance.callBasic(username, password);

    // auth failure
    if (!authenticated || !token || token == "") {
        res.status(401);
        res.send('Username or password is incorrect');
    }

    // authentication successful
    // send back the token
    res.status(200)
    res.send({ token: token });
});

router.post('/signup', async (req: express.Request, res: express.Response) => {
    
    const firstName = req.body["firstName"];
    const lastName = req.body["lastName"];
    const dob = req.body["dob"];
    const phone = req.body["phone"];
    const email = req.body["email"];
    const password = req.body["password"];

    if(!firstName || !lastName || !dob || !phone || !email || !password) {
        console.log("data incomplete");
        res.status(400);
        res.send({error: "Incomplete signup data"});
    }

    
    
});

module.exports = router;