## create a python class for connecting to a database

class  Cnxn:
    def __init__(self, server, database, username, password, driver, sid):
        self.server = server
        self.database = database
        self.username = username
        self.password = password