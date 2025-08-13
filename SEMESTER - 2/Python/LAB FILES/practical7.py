#Enrollment No: 202203103510097
#Name: Angat Shah
#Branch: B.Tech Computer Science and Engineering

student = {"std_name":"Angat Shah" , "std_branch":"B.tech" , "std_age":17}
print("DICTIONARY <-----{0}----->".format(student))
print("")

#I. Demonstrate the updation of python dictionary.
a = input("-->> Enter the key you want to update: ")
b = input("-->> Enter the value of the key({0}): ".format(a))
student[a] = b
print("After Updating the Dictionary --> {0}".format(student))
print("")

#II. Demonstrate the removal of elements from the python dictionary.
c = input("-->> Enter the key you want to remove: ")
del student[c]
print("After removing '{0}' from the given dictionary -->{1}".format(c,student))
print("")

"""III. Demonstrate the use of following dictionary methods- clear(), copy(), get(), items(), keys(), popitem() and values()."""
#keys()
keys = student.keys()
print("The keys of the given Dictionary are:",keys)
print("")

#values()
values = student.values()
print("The values of the keys in the given Dictionary are:",values)
print("")

#get()
d = input("-->> Enter the key for the value you want: ")
get = student.get(d)
print("The value of std_name is:" ,get)
print("")

#copy()
copy_dict = student.copy()
print("The copy of given Dictionary -->",copy_dict)
print("")

#items()
items = student.items()
print("All the key-value pairs in the given Dictionary:",items)
print("")

#popitem()
student.popitem()
print("After using popitem on the given Dictionary, we get: ",student)
print("")

#clear()
student.clear()
print("After clearing the given Dictionary --> {0}".format(student))

print("-*-*-*-*-*-END OF PRACTICAL 7-*-*-*-*-*-")