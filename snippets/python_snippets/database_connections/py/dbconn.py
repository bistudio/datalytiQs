import sqlalchemy as sa
from sqlalchemy import text

""" server="DESKTOP-997DT33\\SQL2019"
database="DATALYTIQS"
username="datalytiQs_user"
pwd="$Getgood7!"
driver="SQL Server" """

## Create a connection to a sql server database

def get_db_connection(server, database, username, pwd, driver):
    try:
        db_connection_string = f'mssql+pyodbc://{username}:{pwd}@{server}/{database}?driver={driver}'
        db_connection = sa.create_engine(db_connection_string)
        return db_connection
    except Exception as e:
        print(e)

## test sql database connection

def test_db_connection(sql_query):
    try:
        query = text(sql_query)
        db_connection = get_db_connection()
        cnxn = db_connection.connect()
        print("Connected to SQL Server instance")
        result = cnxn.execute(query)
        for row in result:
            print(row)

    except Exception as e:
        print("Error connecting to SQL Server instance:", e)

test_db_connection()