#!/usr/bin/python
import sys

for line in sys.stdin:

    key, value = line.strip().split('\t')

    tag = float(key)

    if tag <= 14:
    	print('%c\t%d' % ('a', 1))
    if tag >= 86:
    	print('%c\t%d' % ('b', 1))