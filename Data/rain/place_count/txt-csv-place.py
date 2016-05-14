import csv

txt_file = r"1.txt"
csv_file = r"1.csv"


in_txt = csv.reader(open(txt_file,"r"), delimiter='\t')
out_csv = csv.writer(open(csv_file,'w'), delimiter=',')
out_csv.writerow(['rain','from','to','count'])
for row in in_txt:
    temp_list = row[1].split(',')
    row.remove(row[1])
    row.insert(1, temp_list[0])
    row.insert(2, temp_list[1])
    out_csv.writerow(row)
print(row)

