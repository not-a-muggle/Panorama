from drive.api import DriveAPI
from dbclient import DatabaseClient
import base64
import os
import socket

class UserImageAccessor:
    database = DatabaseClient()
    driveclient = DriveAPI()

    def storeImage(self, userId, imageName, imageData):
        """Store the image for the user to Google Drive
        """
        folderId = None
        try:
            folderId = self.database.fetchFolderIdForUser(userId)
        except Exception as e:
            # in case there is an error while fetching the userID
            print("error while fetching the folder id ", e)
            return None

        try:
            fileId = self.driveclient.createFile(
                folderId, imageName, imageData, 'text/plain')
            
            self.database.insertIntoImages(userId, fileId)
            return fileId
        except Exception as e:
            print(e)
            return None

    def storeImages(self, userId, allImages):
        """Store list of images for the user to Google Drive
            allImages -> List of Dict of image name and image data
        """
        try:
            fileIds = []
            for image in allImages:
                imageName = image["name"]
                imageData = image["data"]
                fileId = self.storeImage(userId, imageName, imageData)

                if fileId is not None:
                    fileIds.append(fileId)
                    self.database.insertIntoImages(userId, fileId)
                    print("File added to drive with id ", fileId)
            return fileIds
        except Exception as e:
            return []
        
    def getImages(self, userId, startIdx=0, endIdx=50):
        """Returns the image metadata of images
        """

        count = endIdx - startIdx
        if count < 0:
            return None

        # get folder Id from userId
        try:
            folderId = self.database.fetchFolderIdForUser(userId)
            imageIds = []
            imageListData = self.driveclient.listFolderFiles(folderId)

            for imageData in imageListData:
                imageIds.append(imageData["id"])
        except Exception as e:
            raise e


        if len(imageIds) < 10:
            count = len(imageIds)

        imagesData = []
        for i in range(count):
            imageId = imageIds[startIdx + i]
            imagesData.append(self.getImage(imageId))
        return imagesData

    def getImagesMetadata(self, userId, startIdx=0, endIdx=50):
        """Returns the image metadata of images
        """
        # Sample list response
        # [ 
        #   {
        #       'id': '1Q0j02EmtcCaB42MNPwbt0Jpx-62qjLpd', 
        #       'name': 'image.jpg', 
        #       'createdTime': '2021-03-14T16:38:47.431Z', 
        #       'modifiedTime': '2021-03-14T16:38:47.431Z'
        #   }
        # ]


        # not implemented yet -- count functionality
        # count = endIdx - startIdx
        # if count < 0:
        #     return []

        # get folder Id from userId
        try:
            folderId = self.database.fetchFolderIdForUser(userId)            
            imageListData = self.driveclient.listFolderFiles(folderId)
            return imageListData
        except Exception as e:
            raise e


    def getImage(self, fileId):
        """returns a dict with file name and file data
        """
        fileData = self.driveclient.downloadFileData(fileId)
        fileName = self.driveclient.getFileMetadata(fileId)["name"]
        image = {"name": fileName, "data": fileData}
        return image

# userimg = UserImageAccessor()
# data = userimg.getImagesMetadata("vdembla@iu.edu")
# print(data)
# images = userimg.getImages("vdembla@iu.edu")

# for image in images:
#     if image is not None:
#         print(image["name"])

# print(len(images[0]["data"]))

# train_img_path = os.path.join(os.path.dirname(
#     os.path.realpath(__file__)), "train.jpg")


# fileId = ""
# with open(train_img_path, "rb") as image_file:
#     encoded_str = base64.b64encode(image_file.read())
#     fileId = userimg.storeImage("vdembla@iu.edu", "image.jpg", encoded_str)
#     print(fileId)


# fh = userimg.getImage(fileId=fileId)

# train_img_path2 = os.path.join(os.path.dirname(
#     os.path.realpath(__file__)), fh["name"])


# with open(train_img_path2, "wb+") as image_file:
#     encoded_str = fh["data"].read()
#     decoded = base64.b64decode(encoded_str)
#     image_file.write(decoded)
