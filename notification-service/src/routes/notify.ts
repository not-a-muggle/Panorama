import express from "express";
import NotificationCore from "../core/NotificationCore";

const router: express.Router = express.Router();


router.post('/notify', async (req: express.Request, res: express.Response) => {
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


    const sharerId: string = req.body["sharerId"];
    const shareeId: string = req.body["shareeId"];
    const imageIds: string[] = req.body["imageIds"];

    // check if all the data has been passed properly or not
    if (!shareeId || !sharerId || !imageIds) {
        console.log("POST /unshare - Insufficient information in the request");
        if (!shareeId) {
            console.log("shareeId not found");
        }
        if (!sharerId) {
            console.log("sharerId not found");
        }
        if (!imageIds) {
            console.log("imageIds not found");
        }

        res.sendStatus(400);
        return;
    }

    // check if the images shared belong to the user in question
    const serviceInstance: NotificationCore = new NotificationCore();
    try {
        const result: boolean = await serviceInstance.unshareImages(sharerId, shareeId, imageIds);
        res.sendStatus(200);

        console.log('/POST unshare - Unshare images successful');
        return;
    } catch (ex) {
        console.log(`/POST unshare - error while shareing images \n${ex}`);
        res.sendStatus(500);
        return;
    }

});


module.exports = router;