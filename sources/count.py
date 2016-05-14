import sys

linecount = 0
result = 0

for line in sys.stdin:
    linecount += 1
    if linecount <= 1:
        continue
    line = line.strip().split(',')
    if line[1] != '****':    
        try:
            temp = int(line[1])
        except ValueError:
            continue
        if temp >=86:
            result += 1
            print "%s,%s" % (line[0], line[1])
print result