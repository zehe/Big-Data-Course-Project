#!/usr/bin/python
import sys

for line in sys.stdin:

    key, value = line.strip().split('\t')

    tag = float(key)

    if 1 <= tag <= 2:
    	print('%c\t%d' % ('a', 1))
    if 3 <= tag <= 4:
    	print('%c\t%d' % ('b', 1))
    if 5 <= tag <= 6:
    	print('%c\t%d' % ('c', 1))
    if 7 <= tag <= 8:
    	print('%c\t%d' % ('d', 1))
    if tag >= 9:
    	print('%c\t%d' % ('e', 1))