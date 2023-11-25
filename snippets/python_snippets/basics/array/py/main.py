## testing python array & lists

myarray = [1,2,3,4,5,6,7,8,9,10]

print(f'the array or list is ' + str(myarray))

### use length to check the size of the array

print(f'the size of array or list is ' + str(len(myarray)))

### use append to add an item to the end of the array

myarray.append(11)
item = myarray[len(myarray)-1]
print(f'{item}' + ' was appended to the list or array')
print(myarray)

### use insert to add an item to the array at a specific index

myarray.insert(0,0)
print(myarray)

### use pop to remove an item from the end of the array

myarray.pop(2)
print(myarray)

### use remove to remove an item from the array at a specific index

myarray.remove(0)
print(myarray)

### use del to remove an item from the array at a specific index

del myarray[0]
print(myarray)

## string methods

statement = "thebestarsenalis"
""" print(statement[0:3])
print(statement[3:7])
print(statement[7:14])
print(statement[14:16])
 """
print(statement[7:14].capitalize()+" "+statement[14:16]+" "+statement[0:3]+" "+ statement[3:7])

## list comprehension example

sequence = [1,2,3,4,5,6,7,8,9,10]
sqs = [x**2 for x in sequence]
print(sqs)