#!/usr/bin/python
import sys

for line in sys.stdin:

    key, value = line.strip().split('\t')
    values = value.split(',')
    if len(values) == 2:
        continue
    print('%s\t%s,%s\t%s' % (key, values[0], values[1], values[2]))