import unittest
from dbclient import DatabaseClient

class Testing(unittest.TestCase):
    def test1(self):
        db = DatabaseClient()
        db.insertIntoUserFolder("1","1")
        self.assertEqual("1", db.fetchFolderIdForUser("1"))

if __name__ == '__main__' :
    unittest.main()