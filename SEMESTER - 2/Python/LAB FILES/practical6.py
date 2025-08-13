#Enrollment No: 202203103510097
#Name: Angat Shah
#Branch: B.Tech Computer Science and Engineering

my_set = {1,2,3,4,5}

print("SET <-----{0}----->".format(my_set))
print("")

#add()
a = int(input("-->> Enter the number you want to add in the given set: "))
my_set.add(a)
print("After adding '{0}', the given set --> {1}".format(a,my_set))
print("")

#update()
my_list = [11,10,12,5]
print("Now we have a LIST <-----{0}----->".format(my_list))
my_set.update(my_list)
print("The given set after updating the given list in it --> {0}".format(my_set))
print("")

#copy()
copy_set = my_set.copy()
print("Copy of the given set -->",copy_set)

#discard()
b = int(input("-->> Enter the number you want to discard from the set: "))
my_set.discard(b)
print("After discarding '{0}', the given set --> {1}".format(b,my_set))
print("")

set_1 = {1,2,3,4,5,6,7,8,9,0}
set_2 = {2,4,6,8,0}

print("SET1 <-----{0}----->".format(set_1))
print("SET2 <-----{0}----->".format(set_2))
print("")

#union()
union_set = set_1.union(set_2)
print("After taking union of the given two set\nUNION --> {0}".format(union_set))
print("")

#intresection()
intersection_set = set_1.intersection(set_2)
print("After intersecting the given two set\nINTERACTION --> {0}".format(intersection_set))
print("")

#isdisjoint()
isdisjoint_set = set_1.isdisjoint(set_2)
print("After using isdisjoint on the given two set, we get:",isdisjoint_set)
print("")

#difference()
diff_set = set_1.difference(set_2)
print("After taking difference of the given two set\nDIFFERENCE --> {0}".format(diff_set))
print("")

#issubset() & issuperset()
print("Does set1 is a subset of set2:",set_1.issubset(set_2))
print("Does set1 is a superset of set2:",set_1.issuperset(set_2))
print("")
print("Does set2 is a subset of set1:",set_2.issubset(set_1))
print("Does set2 is a superset of set1:",set_2.issuperset(set_1))
print("")

#clear()
set_1.clear()
print("After clearing the set1 --> {0}".format(set_1))
set_2.clear()
print("After clearing the set2 --> {0}".format(set_2))
print("")

print("-*-*-*-*-*-END OF PRACTICAL 6-*-*-*-*-*-")