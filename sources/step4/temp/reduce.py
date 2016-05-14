#!/usr/bin/python
import sys
from collections import defaultdict

count = defaultdict(dict)

for line in sys.stdin:

    key, value = line.strip().split('\t')
    values = value.split(',')
    if len(values) == 2:
        continue
    values[2] = int(values[2])
    key2 = values[0] + ',' + values[1]

    if key in count:
        if key2 in count[key]:
            count[key][key2] += values[2]
        else:
            count[key][key2] = values[2]
    else:
        count[key][key2] = values[2]

for i in count:
    for j in count[i]:
        print ('%s\t%s,%d'  % (i, j, count[i][j]))
