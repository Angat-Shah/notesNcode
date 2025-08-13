#Enrollment No: 202203103510097
#Name: Angat Shah
#Branch: B.Tech Computer Science and Engineering

my_list = [5,11,1,8,4]
another_list = [1,2,3]

print("LIST <-----{0}----->".format(my_list))

#append()
a = int(input("-->> Enter a number you want to append: "))
my_list.append(a)
print("The given list after appending the element '{0}' --> {1}".format(a,my_list))
print("")

#extend()
my_list.extend(another_list)
print("The given list after extending another list -->",my_list)
print("")

#insert()
c = int(input("-->> Enter the index at which you want to enter the element: "))
d = int(input("-->> Enter the element you want to insert at position {0}: ".format(c)))
my_list.insert(c,d)
print("The given list after inserting element '{0}' at position {1} --> {2}".format(d,c,my_list))
print("")

#remove()
e = int(input("-->> Enter the element you want to remove: "))
my_list.remove(e)
print("The given list after removing the element '{0}' from the list --> {1}".format(e,my_list))
print("")

#index()
f = int(input("--> Enter the number for which you want to check the index: "))
index_of_11 = my_list.index(f)
print("The index position of the element '{0}': {1}".format(f,index_of_11))
print("")

#count()
g = int(input("-->> Enter the number you want to check the repetition of:  "))
count_5 = my_list.count(g)
print("Number of times element '{0}' is repeated in the given list: {1}".format(g,count_5))
print("")

#sort()
my_list.sort()
print("The sorted version of the given list -->",my_list)
#reverse()
my_list.reverse()
print("The reverse version of the given list -->",my_list)
#copy()
my_new_list = my_list.copy()
print("The copy version of the given list -->",my_new_list)
print("")

#pop()
popped_list = my_list.pop(1)
print("The element popped from the 1st position: ",popped_list)
print("")

#min()
min_my_list = min(my_list)
print("The minimum value in the given list:",min_my_list)
#max()
max_my_list = max(my_list)
print("The maximum value in the given list:",max_my_list)
print("")

print("UPDATED LIST <-----{0}----->".format(my_list))

#indexing
h = int(input("-->> Enter the positive index you want to check the number at: "))
print("The element at the '{0}' position is: {1}".format(h,my_list[h]))
i = int(input("-->> Enter the negative index you want to check the number at: "))
print("The element at the '{0}' position is: {1}".format(i,my_list[i]))
print("")

#updating
j = int(input("-->> Enter the index at which you want to change the element: "))
k = int(input("-->> Enter the element for the position {0}: ".format(j)))
my_list[j] = k
print("After updating the given list -->",my_list)
print("")

#slicing
l = int(input("-->> Enter the initial index for slicing: "))
m = int(input("-->> Enter the final index for slicing: "))
print("After slicing from '[{0}:{1}]' the list --> {2}".format(l,m,my_list[l:m]))
print("")

print("-*-*-*-*-*-END OF PRACTICAL 4-*-*-*-*-*-")