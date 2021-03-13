from drive.api import DriveAPI
from dbclient import DatabaseClient
class UserImageAccessor:
    database = DatabaseClient()
    driveclient = DriveAPI()
    
    def getImages(self, userId):
        """Returns at max 10 images
        """
        # get folder Id from userId
        try:
            folderId = self.database.fetchFolderIdForUser(userId)
            imageList = self.driveclient.listFolderFiles(folderId)
        except Exception as e:
            raise e

        count = 10
        if len(imageList < 10):
            count = len(imageList)
        imagesData = []
        for i in range(count):
            imageId = imageList[i]
            imagesData.append(self.driveclient.downloadFile(imageId))

        return imagesData

    def getImage(self, fileId):
        return self.driveclient.downloadFile(fileId)