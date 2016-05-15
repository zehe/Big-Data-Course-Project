#!/usr/bin/python
import sys

for line in sys.stdin:

    key, value = line.strip().split('\t')

    tag = float(key)

    if tag <= 0.02:
    	print('%s\t%s' % ('1', value))
    if 0.02 < tag <= 0.04:
    	print('%s\t%s' % ('2', value))
    if 0.04 < tag <= 0.06:
    	print('%s\t%s' % ('3', value))
    if 0.06 < tag <= 0.1:
    	print('%s\t%s' % ('4', value))
    if tag > 0.1:
    	print('%s\t%s' % ('5', value))