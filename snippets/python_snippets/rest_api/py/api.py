import requests as req
from dbconn import get_db_connection
from sqlalchemy import text



## initiate a connection to the database

def sql_engine():
    db_type="sqlserver" ##"sqlserver" or "oracle"
    sql_host = "DESKTOP-997DT33\\SQL2019"
    oracle_host = "localhost"
    sql_port = 1433
    oracle_port = 1521
    sql_user = "datalytiQs_user"
    oracle_user = "C##datalytiqs_user"
    database="DATALYTIQS"
    pwd="$Getgood7!"
    driver="SQL Server"
    sid="orcl"
    server=None
    port=None
    username=None
    if db_type == "sqlserver":
        server = sql_host
        port = sql_port
        username = sql_user
    elif db_type == "oracle":
        server = oracle_host
        port = oracle_port
        username = oracle_user
    else:
        raise Exception("No database type found") 
    start_sql_engine = get_db_connection(db_type=db_type, server=server, database=database, username=username, pwd=pwd, port=port, sid=sid, driver=driver)
    cnxn = start_sql_engine.connect()
    return cnxn, db_type

## get data from api

def get_api_data():
    try:
        db_type = sql_engine()[1]
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
                if db_type == "sqlserver":
                    insert_query =  f"INSERT INTO UK_HOLIDAYS (country, holiday_name, holiday_date, notes,bunting) VALUES ( '{country}' ,'{holiday_name}' ,'{holiday_date}' ,'{notes}' ,'{bunting}')"
                elif db_type == "oracle":
                    insert_query =  f"INSERT INTO UK_HOLIDAYS (country, holiday_name, holiday_date, notes,bunting) VALUES ( '{country}' ,'{holiday_name}' ,TO_DATE('{holiday_date}', 'YYYY-MM-DD') ,'{notes}' ,'{bunting}')"
                else:
                    raise Exception("No database connection found")
                with sql_engine()[0] as cnxn:
                    cnxn.execute(text(insert_query))
                    cnxn.commit()
        print("Data inserted successfully")
    except Exception as e:
        print(e)


if __name__ == "__main__":
    get_api_data()