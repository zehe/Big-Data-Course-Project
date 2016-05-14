#!/usr/bin/python
import sys

cur_key = None
cur_tag = None
cur_values = []

for line in sys.stdin:
	key, value = line.strip().split('\t', 1)
	tag, values = value.strip().split('&', 1)
	if cur_key == key:
		if cur_tag != tag:
			if cur_tag == 'pcp':
				value1 = values
				for cur_value in cur_values:
					value2 = cur_value
					print('%s\t%s' % (cur_key, value1 + ',' + value2))
			else:
				value2 = values
				for cur_value in cur_values:
					value1 = cur_value
					print('%s\t%s' % (cur_key, value1 + ',' + value2))
		elif cur_tag == tag:
			cur_values.append(values)
	else:
		cur_values = [values]
		cur_key = key
		cur_tag = tag