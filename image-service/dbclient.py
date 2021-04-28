from binascii import Error
from pymongo import MongoClient, collection
from drive.api import DriveAPI

class DatabaseClient:
    collection = None

    def __init__(self):
        # initialize the collection
        uri = "mongodb+srv://User:Password1@cluster0.ozyrn.mongodb.net/panorama?retryWrites=true&w=majority"
        # mongodb+srv://User:panorama@123@cluster0.ozyrn.mongodb.net/panorama?retryWrites=true&w=majority
        client = MongoClient(uri)
        db = client.panorama
        self.collection = db.get_collection("user_folder")
        

    """ should be called on signup or if no folderID found on fetch"""

    def insertIntoUserFolder(self, userId, folderId):
        doc = { 'userid' : userId, 'folderid' : folderId}
        try:
            self.collection.insert_one(doc)
        except Exception as e:
            print("Unable to insert user into database")
            raise e

    def fetchFolderIdForUser(self, userId):
        # selectQuery = "SELECT folderid from USERFOLDER WHERE userid=\""+userId+"\""
        filterQuery = {'userid' : userId}
        
        try:
            queryResult = self.collection.find_one(filterQuery)
            if queryResult is None:
                driveAPI = DriveAPI()
                newFolderId = driveAPI.createFolder(userId)
                self.insertIntoUserFolder(userId=userId, folderId=newFolderId)
                return newFolderId
            else:
                return queryResult["folderid"]

        except Error as e:
            print("Unable to fetch folderID")
            raise e
        except Exception as e:
            raise e

    def insertIntoImages(self, userId, imageId):
        doc = { 'ownerId': userId, 'userId': userId, 'imageId': imageId}
        try:
            self.collection.insert_one(doc)
        except Exception as e:
            print("Unable to insert image record into database")
            raise e

# if __name__ == '__main__':
#     db = DatabaseClient()
#     db.insertIntoUserFolder("1","1")
#     print(db.fetchFolderIdForUser("1"))
