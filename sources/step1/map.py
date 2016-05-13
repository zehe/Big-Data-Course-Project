#!/usr/bin/python
import sys
from datetime import datetime

for line in sys.stdin:

	line = line.strip().split(',')
	if line[0] == 'VendorID':
		continue
	else:
		if len(line) == 2:
			datetime = int(line[0])
			date = (datetime % 100000000) / 10000
			time = (datetime % 100000000) % 10000
			time_min = time - 100
			time_max = time
			pcp = line[1]
			datetime = datetime / 10000
			print('%s\tpcp&%s,%s,%s' % (date, time_min, time_max, pcp))
		elif len(line) == 19:
			pickup_datetime = line[1]
			pickup_date = datetime.strptime(pickup_datetime, '%Y-%m-%d %H:%M:%S').strftime('%m%d')
			pickup_time = datetime.strptime(pickup_datetime, '%Y-%m-%d %H:%M:%S').strftime('%H%M')
			dropoff_datetime = line[2]
			pickup_lon = line[5]
			pickup_lat = line[6]
			dropoff_lon = line[9]
			dropoff_lat = line[10]
			pickup_date = int(pickup_date)
			pickup_time = int(pickup_time)
			if (pickup_lat != "0" and pickup_lon != "0" and dropoff_lat != "0" and dropoff_lon != "0"):
				print('%s\ttaxi&%s,%s,%s,%s,%s,%s,%s' % (pickup_date, pickup_time, pickup_datetime, dropoff_datetime, pickup_lon, pickup_lat, dropoff_lon, dropoff_lat))