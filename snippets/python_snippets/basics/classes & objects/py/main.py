## create a python class for connecting to a database

class  Cnxn:
    def __init__(self, dbtype ,server, database, username, password, port, driver, sid):
        self.dbtype = dbtype
        self.server = server
        self.database = database
        self.username = username
        self.password = password
        self.port = port
        self.driver = driver
        self.sid = sid

        
    