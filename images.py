
# Using readlines()
file1 = open('images.txt', 'r')
Lines = file1.readlines()
# { src: '/photos/yushan.jpg', width: 4032, height: 2268 },
count = 0
# Strips the newline character
for line in Lines:
    parts = line.rstrip('\n').split(',')
    print("{src:\"/photos/"+parts[0]+"\",width:"+parts[1]+", height:"+parts[2]+"},")