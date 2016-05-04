#!/usr/bin/python
import sys

for line in sys.stdin:

	key, value = line.strip().split('\t')
	values = value.split(',')

	if len(values) == 10:
		pickup_time = values[0]
		time_min = values[7]
		time_max = values[8]

		print('%s\t%s,%s,%s,%s' % (key, pickup_time, time_min, time_max, value))