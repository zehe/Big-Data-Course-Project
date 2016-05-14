#!/usr/bin/python
import sys

for line in sys.stdin:
	key, value = line.strip().split('\t', 1)
	values = value.split(',')

	try:
		pickup_time = int(values[0])
		time_min = int(values[1])
		time_max = int(values[2])
	except ValueError:
		continue

	if pickup_time >= time_min and pickup_time <= time_max:
		print('%s\t%s,%s,%s,%s' % (values[12], values[6],values[7],values[8],values[9]))
	else:
		continue
