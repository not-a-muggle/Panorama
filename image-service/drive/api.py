from __future__ import print_function
import pickle
import os.path
import io
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.http import MediaIoBaseUpload, MediaIoBaseDownload
import base64


class DriveAPI(object):
    """DriveAPI for accessing Google Drive"""

    SCOPES = ['https://www.googleapis.com/auth/drive.file']

    def __init__(self):

        self.creds = self.fetchCredentials()
        self.service = self.initService(self.creds)

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DriveAPI, cls).__new__(cls)
            # Put any initialization here.
        return cls._instance

    def fetchCredentials(self):
        # if pickle file exists, read from the pickle file
        creds = None
        credintials_path = os.path.join(os.path.dirname(
            os.path.realpath(__file__)), "credentials.json")

        pickle_path = os.path.join(os.path.dirname(
            os.path.realpath(__file__)), "token.pickle")

        if os.path.exists(pickle_path):
            with open(pickle_path, 'rb') as token:
                creds = pickle.load(token)
        else:
            print("token does not exist")

        if not creds or not creds.valid:

            # if creds present, but expired and we have a refresh token, fetch a new token
            if creds and creds.expired and creds.refresh_token:
                print("refereshing token")
                creds.refresh(Request())

            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    credintials_path, scopes=self.SCOPES)
                print("refresh token not needed")
                creds = flow.run_local_server(port=0)

            with open(pickle_path, 'wb+') as token:
                pickle.dump(creds, token)

        return creds

    def initService(self, creds):
        return build('drive', 'v3', credentials=creds)

    def createFile(self, userFolderId, filename, filecontent, mimeType):
        """takes file content in string as input and stores it into a file with name filename in the folder for the user"""

        # encode string to bytes
        if type(filecontent) == str:
            filecontent = str.encode(filecontent)

        if userFolderId != None:
            file_metadata = {
                'name': filename,
                'parents': [userFolderId],
                'mimeType': mimeType
            }
        else:
            file_metadata = {
                'name': filename,
                'mimeType': mimeType
            }

        fh = io.BytesIO(filecontent)

        data = MediaIoBaseUpload(fh,
                                 mimetype=mimeType,
                                 #  chunksize=1024*1024,
                                 resumable=True)

        file = self.service.files().create(body=file_metadata,
                                           media_body=data,
                                           fields='id').execute()
        return file.get('id')

    def createFolder(self, foldername):
        folder_metadata = {
            'name': foldername,
            'mimeType': 'application/vnd.google-apps.folder'
        }

        folder = self.service.files().create(body=folder_metadata,
                                             fields='id').execute()

        return folder.get('id')

    def downloadFileData(self, fileId):
        """Return the file in string format along with the file name
        """
        try:
            request = self.service.files().get_media(fileId=fileId)
            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while done is False:
                status, done = downloader.next_chunk()
            fh.seek(0)

            return fh
        except Exception as e:
            return None

    def getFileMetadata(self, fileId):
        try:
            metadata = self.service.files().get(fileId=fileId).execute()
            return metadata
        except Exception as e:
            raise Exception(e)

    def listFolderFiles(self, folderId):
        response = self.service.files().list(q="'"+folderId + "'" + " in parents",
                                             spaces='drive',
                                             fields='nextPageToken, files(id, name,createdTime, modifiedTime)').execute()
        items = response.get('files', [])
        return items


# driveAPI = DriveAPI()
# fileID = "1Gp6ki6DsKGsQNvcGnktAQIybwQT-5tKT"

# print(driveAPI.getFileMetadata(fileID, "name"))
# folderId = driveAPI.createFolder('test-panorama')
# driveAPI.createFile(userFolderId="1pFt8gqOxUjGycfCrdsKaez-IVSEyPs5M", filename='hello.txt', filecontent=str.encode('helloworld'))

# ----- Encode a file
# fileID = None
# with open("../train.jpg", "rb") as image_file:
# encoded_str = base64.b64encode(image_file.read())
# print(encoded_str)
# data = image_file.read()
# fileID = driveAPI.createFile(userFolderId="1pFt8gqOxUjGycfCrdsKaez-IVSEyPs5M",
#                 filename='train.txt', filecontent=encoded_str, mimeType='text/plain')

# print(driveAPI.getFileMetadata(fileID,["name"]))

# print(driveAPI.listFolderFiles(folderId="1pFt8gqOxUjGycfCrdsKaez-IVSEyPs5M"))


# ---- Decode a file
# with open("../train2.jpg", "wb") as image_file:
#     fh = driveAPI.downloadFileData(fileID)
#     encoded_str = fh.read()
#     decoded = base64.b64decode(encoded_str)
#     image_file.write(decoded)
