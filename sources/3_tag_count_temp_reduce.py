#!/usr/bin/python
import sys

cur_sum = [0,0]
cur_tag = ["",""]

for line in sys.stdin:
	tag, count = line.strip().split('\t', 1)

	try:
		count = int(count)
	except ValueError:
		continue

	if tag == 'a':
		cur_sum[0] += count
		cur_tag[0]='(,14]'
	if tag == 'b':
		cur_sum[1] += count
		cur_tag[1]='[86, )'

for i in range(0,2):
	if cur_sum[i] != 0:
		print ('%s\t%d' % (cur_tag[i], cur_sum[i]))