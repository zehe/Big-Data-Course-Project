#!/usr/bin/python
import sys

for line in sys.stdin:

    key, value = line.strip().split('\t')

    tag = float(key)

    if 1 <= tag <= 2:
    	print('%s\t%s' % ('1', value))
    if 3 <= tag <= 4:
    	print('%s\t%s' % ('2', value))
    if 5 <= tag <= 6:
    	print('%s\t%s' % ('3', value))
    if 7 <= tag <= 8:
    	print('%s\t%s' % ('4', value))
    if tag >= 9:
    	print('%s\t%s' % ('5', value))