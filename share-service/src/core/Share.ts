import DatabaseClient from "../database/DatabaseClient";

export default class ShareServiceCore {
    collectionName: string = "images"
    public async shareImages(sharerId: string, shareeId: string, imageIds: string[]): Promise<boolean> {
        const queryToCheckSharerAuth: object = { userId: sharerId, ownerId: sharerId, imageId: { $in: imageIds } };

        const queryToCheckShareeAuth: object = { userId: shareeId, imageId: { $in: imageIds } };

        try {
            const sharerAuthImages: object[] = await DatabaseClient.Instance.find(this.collectionName, { userId: sharerId, ownerId: sharerId, imageId: { $in: imageIds } });

            if (sharerAuthImages.length != imageIds.length) {
                console.log('Sharer does not have permission to share all the images');
                console.log(sharerAuthImages);
                return false;
            }

            //check if the current user has permission to some of the images, if the user is already having permission
            // to some images, ignore them, otherwise add all of them to his shared list
            const shareeExistingImages: object[] = await DatabaseClient.Instance.find(this.collectionName, queryToCheckShareeAuth);
            const shareeImageIds: string[] = [];

            shareeExistingImages.forEach((doc: any) => {
                shareeImageIds.push(doc["imageId"]);
            });

            // these are the ids for which entry needs to be created in the database
            const filteredImageIds = imageIds.filter((doc: any) => {
                return shareeImageIds.indexOf(doc) === -1;
            });


            // create an insert query 
            const insertList: object[] = [];
            filteredImageIds.forEach(imageId => {
                insertList.push({ userId: shareeId, imageId: imageId, ownerId: sharerId });
            });
            if (filteredImageIds.length === 0) {
                return true;
            }
            try {
                await DatabaseClient.Instance.insertMany(this.collectionName, insertList);
                return true;
            } catch (ex) {
                console.log(ex);
                return false;
            }
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    public async unshareImages(sharerId: string, shareeId: string, imageIds: string[]): Promise<boolean> {
        // const removeQuery: object = { userId: shareeId, ownerId: sharerId, imageId: { $in: imageIds } };
        try {
            await DatabaseClient.Instance.remove(this.collectionName, { userId: shareeId, ownerId: sharerId, imageId: { $in: imageIds } });
            return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}