from drive import DriveAccessor
from dbclient import DatabaseClient
class UserImageAccessor:
    database = DatabaseClient()
    driveclient = DriveAccessor()
    
    def getImages(self, userId):
        """Returns at max 10 images
        """
        # get folder Id from userId
        folderId = self.database.fetchFolderIdForUser(userId)    
        imageList = self.driveclient.listFolderFiles(folderId)
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