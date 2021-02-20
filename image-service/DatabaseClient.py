from pymongo import MongoClient
from pprint import pprint

print("hello")
# client = MongoClient('127.0.0.1', 27017)
client = MongoClient("mongodb://127.0.0.1:27017/", connect=False)
database = client["panorama"]

database.users.insert_one({ '1' : 'folderName'})
