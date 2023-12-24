import time

start_time = time.perf_counter()
num_list = [2,3,7,4,8,9,6,5,2,1,3,4,5,6,7,8,9,0,1,2,3,4,5,6]
num_list.extend([66,99])
stop_time = time.perf_counter()
print(num_list)
print(stop_time - start_time)


start_time = time.perf_counter()
sequence = sorted(set(num_list))
stop_time = time.perf_counter()
print(sequence)
print(num_list)
print(stop_time - start_time)