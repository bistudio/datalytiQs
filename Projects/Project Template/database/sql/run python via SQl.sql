--Change 
/*
exec  sp_configure 'external scripts enabled', 1;
RECONFIGURE WITH OVERRIDE; 
*/

-- Create a stored procedure that executes a Python script
CREATE OR ALTER PROCEDURE ExecutePythonScript
AS
BEGIN
    EXEC sp_execute_external_script
        @language = N'Python'
		,@script = 	
		
		N'import pandas as pd 
		result = pd.DataFrame({"Numbers": [1, 2, 3, 4], "Letters": ["A", "B", "C", "D"]});
		OutputDataSet = result'
		
		,@output_data_1_name = N'OutputDataSet'
		,@output_data_1_schema = N'dbo'
		,@output_data_1_table = N'PythonOutput';
END;


EXEC ExecutePythonScript 

/*
CREATE TABLE dbo.PythonOutput
(			Numbers int
,			Letters Varchar(255)
)
*/


