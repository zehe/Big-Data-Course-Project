#!/usr/bin/python
import sys

cur_sum = [0,0,0,0,0]
cur_tag = ["","","","",""]

for line in sys.stdin:
	tag, count = line.strip().split('\t', 1)

	try:
		count = int(count)
	except ValueError:
		continue

	if tag == 'a':
		cur_sum[0] += count
		cur_tag[0]='[1,2]'
	if tag == 'b':
		cur_sum[1] += count
		cur_tag[1]='[3,4]'
	if tag == 'c':
		cur_sum[2] += count
		cur_tag[2]='[5,6]'
	if tag == 'd':
		cur_sum[3] += count
		cur_tag[3]='[7,8]'
	if tag == 'e':
		cur_sum[4] += count
		cur_tag[4]='[9, )'

for i in range(0,5):
	if cur_sum[i] != 0:
		print ('%s\t%d' % (cur_tag[i], cur_sum[i]))