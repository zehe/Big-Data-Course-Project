#!/usr/bin/python
import sys

for line in sys.stdin:

    key, value = line.strip().split('\t')

    tag = float(key)

    if tag <= 14:
    	print('%s\t%s' % ('1', value))
    if tag >= 86:
    	print('%s\t%s' % ('2', value))