import csv

txt_file = r"9.txt"
csv_file = r"9.csv"


in_txt = csv.reader(open(txt_file,"r"), delimiter='\t')
out_csv = csv.writer(open(csv_file,'w'))

out_csv.writerow(['range','count'])
out_csv.writerows(in_txt)
