#!/usr/bin/python
import sys

for line in sys.stdin:

    key, value = line.strip().split('\t')

    tag = float(key)

    if tag <= 0.02:
    	print('%c\t%d' % ('a', 1))
    if 0.02 < tag <= 0.04:
    	print('%c\t%d' % ('b', 1))
    if 0.04 < tag <= 0.06:
    	print('%c\t%d' % ('c', 1))
    if 0.06 < tag <= 0.1:
    	print('%c\t%d' % ('d', 1))
    if tag > 0.1:
    	print('%c\t%d' % ('e', 1))
