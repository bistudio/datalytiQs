import sqlalchemy as sa
from sqlalchemy import text

class DatabaseConnection:
    db_tech = "sqlserver"

    def __init__(self, server, database, port, username, pwd, driver, sid):
        self.server = server
        self.database = database
        self.port = port
        self.username = username
        self.pwd = pwd
        self.driver = driver
        self.sid = sid
    
    def get_db_connection(self):
        sid = "orcl"
        try:
            if self.db_tech == "sqlserver":
                db_connection_string = f'mssql+pyodbc://{self.username}:{self.pwd}@{self.server}/{self.database}?driver={self.driver}'
                db_connection = sa.create_engine(db_connection_string)
            elif self.db_tech == "oracle":
                db_connection_string = f'oracle://{self.username}:{self.pwd}@{self.server}:{self.port}/{sid}'
                db_connection = sa.create_engine(db_connection_string)
                print("No database connection found")
            else:
                raise Exception("No database connection found")
            return db_connection
        except Exception as e:
            print(e)

    