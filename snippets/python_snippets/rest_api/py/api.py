import requests as req
import pandas as pd
from dbconn import get_db_connection
from sqlalchemy import text


## initiate a connection to the database

def sql_engine():
    start_sql_engine = get_db_connection(server="DESKTOP-997DT33\\SQL2019", database="DATALYTIQS", username="datalytiQs_user", pwd="$Getgood7!", driver="SQL Server")
    cnxn = start_sql_engine.connect()
    return cnxn

## get data from api

def get_api_data():
    try:
        api_endpoint = "https://www.gov.uk/bank-holidays.json"
        api_request = req.get(api_endpoint)
        result = api_request.json()
        for i in result:
            country = i
            for j in result[i]['events']:
                holiday_name = j['title']
                holiday_date = j['date']
                notes = j['notes']
                bunting = j['bunting']
                insert_query =  f"INSERT INTO [DATALYTIQS].[dbo].[UK_HOLIDAYS] VALUES ( '{country}' ,'{holiday_name}' ,'{holiday_date}' ,'{notes}' ,'{bunting}');"
                with sql_engine() as cnxn:
                    cnxn.execute(text(insert_query))
                    cnxn.commit()
                    print("Data inserted successfully")
                print(insert_query)
    except Exception as e:
        print(e)

get_api_data()