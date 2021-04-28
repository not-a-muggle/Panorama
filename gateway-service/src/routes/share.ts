import axios from "axios";
import express from "express";
import { LogResult } from "../definitions/session-log";
import SessionLogService from "../service-clients/SessionLogService";
import SessionService from "../service-clients/SessionService";



const router: express.Router = express.Router();


router.post('/share', async (req: express.Request, res: express.Response) => {
    /*
        body structure => {
            // id of person to be shared with
            shareeId:
            //id of person sharing
            sharerId:

            // image ids
            imageIds: []
        }
    */

    // setting the required response headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    const username = req.query["username"] as string;

    const sharerId: string = req.body["sharerId"];
    const shareeId: string = req.body["shareeId"];
    const imageIds: string[] = req.body["imageIds"];
    let token;


    // check if the user has a valid session
    try {

        const authHeader: string = req.header("Authorization") as string;
        const isBearer = authHeader.startsWith("Bearer");

        if (!isBearer) {
            res.sendStatus(401);
            console.log("Bearer token not found with the request");
            return;
        }

        token = authHeader.substring(7, authHeader.length);

        const isVerified = await SessionService.Instance.verifyToken({ username: username, token: token });

        if (!isVerified.verified) {
            res.sendStatus(401);
            console.log("JWT token verification failed\n" + JSON.stringify(isVerified));
            return;
        }

    }
    catch (e) {
        res.sendStatus(401);
        console.log("call to session service failed")
        return;
    }



    if (!username || !shareeId || !sharerId || !imageIds) {
        res.sendStatus(400);
        console.log("Insufficient information in the request body");
        return;
    }

    if (imageIds.length == 0) {
        res.sendStatus(200);
        console.log("/POST share - No imageIds to share");
        return;
    }

    try {
        const response = await axios.post("http://share-service:30900/share", { sharerId: sharerId, shareeId: shareeId, imageIds: imageIds });
        res.sendStatus(response.status);
        if (response.status !== 200) {
            console.log('Response Status -> ' + response.status);
        }

    } catch (ex) {
        res.sendStatus(500);
        console.log("Could not share images due to the following error " + ex);
    }

    try {
        const logResult: LogResult = await SessionLogService.Instance.logActivity(
            {
                userId: username,
                sessionId: token,
                activityDesc: `Sharing Images ${JSON.stringify(imageIds)} by ${sharerId} with ${shareeId}`, time: Date.now().toString()
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
});

router.post('/unshare', async (req: express.Request, res: express.Response) => {
        /*
        body structure => {
            // id of person to be shared with
            shareeId:
            //id of person sharing
            sharerId:

            // image ids
            imageIds: []
        }
    */

    // setting the required response headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    const username = req.query["username"] as string;

    const sharerId: string = req.body["sharerId"];
    const shareeId: string = req.body["shareeId"];
    const imageIds: string[] = req.body["imageIds"];
    let token;


    // check if the user has a valid session
    try {

        const authHeader: string = req.header("Authorization") as string;
        const isBearer = authHeader.startsWith("Bearer");

        if (!isBearer) {
            res.sendStatus(401);
            console.log("Bearer token not found with the request");
            return;
        }

        token = authHeader.substring(7, authHeader.length);

        const isVerified = await SessionService.Instance.verifyToken({ username: username, token: token });

        if (!isVerified.verified) {
            res.sendStatus(401);
            console.log("JWT token verification failed\n" + JSON.stringify(isVerified));
            return;
        }

    }
    catch (e) {
        res.sendStatus(401);
        console.log("call to session service failed")
        return;
    }



    if (!username || !shareeId || !sharerId || !imageIds) {
        res.sendStatus(400);
        console.log("Insufficient information in the request body");
        return;
    }

    if (imageIds.length == 0) {
        res.sendStatus(200);
        console.log("/POST unshare - No imageIds to unshare");
        return;
    }

    try {
        const response = await axios.post("http://share-service:30900/unshare", { sharerId: sharerId, shareeId: shareeId, imageIds: imageIds });
        res.sendStatus(response.status);
        if (response.status !== 200) {
            console.log('Response Status -> ' + response.status);
        }

    } catch (ex) {
        res.sendStatus(500);
        console.log("Could not unshare images due to the following error " + ex);
    }

    try {
        const logResult: LogResult = await SessionLogService.Instance.logActivity(
            {
                userId: username,
                sessionId: token,
                activityDesc: `Unsharing Images ${JSON.stringify(imageIds)} by ${sharerId} with ${shareeId}`, time: Date.now().toString()
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
});


module.exports = router;