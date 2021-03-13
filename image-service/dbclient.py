import sqlite3
import os

class DatabaseClient:
    cur = None
    conn = None
    def __init__(self):
        # check if the database file exists
        if not os.path.exists(os.getcwd() + '/user.db'):
            self.conn = sqlite3.connect('user.db')
            self.cur = self.conn.cursor()
            self.initializeDatabase()
            return
        
        conn = sqlite3.connect('user.db')
        self.cur = conn.cursor()

    def initializeDatabase(self):
        # create user.db and push table
        createTableQuery = '''CREATE TABLE USERFOLDER ( 
                                id INTEGER PRIMARY KEY, 
                                userid TEXT NOT NULL, 
                                folderid TEXT NOT NULL);
                            '''
        try:
            self.cur.execute(createTableQuery)
            self.conn.commit()
            # self.conn.close()
        except sqlite3.Error as e:
            print(e)
    
    """ should be called on signup or if no folderID found on fetch"""
    def insertIntoUserFolder(self, userId, folderId):
        insertQuery = "INSERT INTO USERFOLDER (userid, folderid) VALUES ( \""+userId+"\", \""+folderId+"\")"
        try:
            self.cur.execute(insertQuery)
            self.conn.commit()
        except sqlite3.Error as e:
            print("Unable to insert User " + str(e))

    def fetchFolderIdForUser(self,userId):
        selectQuery = "SELECT folderid from USERFOLDER WHERE userid=\""+userId+"\""
        try:
            self.cur.execute(selectQuery)
            return self.cur.fetchone()[0]
        except sqlite3.Error as e:
            print("Unable to fetch folderID " + str(e))


# if __name__ == '__main__':
#     db = DatabaseClient()
#     db.insertIntoUser("1","1")
#     print(db.fetchFolderIdForUser("1"))
