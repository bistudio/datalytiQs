import sqlalchemy as sa
from sqlalchemy import text

## Create a connection to a sql server database

def get_db_connection(db_type, server, username, pwd, port, database, driver, sid):
    try:
        if db_type == "sqlserver":
            db_connection_string = f'mssql+pyodbc://{username}:{pwd}@{server}/{database}?driver={driver}'
            db_connection = sa.create_engine(db_connection_string)
        elif db_type == "oracle":
            db_connection_string = f'oracle://{username}:{pwd}@{server}:{port}/{sid}'
            db_connection = sa.create_engine(db_connection_string)
        else:
            raise Exception("No database connection found")
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
