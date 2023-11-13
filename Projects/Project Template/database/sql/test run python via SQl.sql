EXECUTE sp_execute_external_script @language = N'Python'
    , @script = N'
a = 1
b = 2
c = a/b
d = a*b
print(c, d)
'




EXECUTE sp_execute_external_script @language = N'Python'
    , @script = N'OutputDataSet = InputDataSet'
    , @input_data_1 = N'SELECT 1 AS hello'
WITH RESULT SETS(([Hello World] INT));
GO