#Enrollment No: 202203103510097
#Name: Angat Shah
#Branch: B.Tech Computer Science and Engineering

my_tuple = (1,2,3,3,5)

print("TUPLE <-----{0}----->".format(my_tuple))
print("")

#count()
a = int(input("-->> Enter the number for which you want to find the repetition: "))
count = my_tuple.count(a)
print("'{0}' is repeated {1} times in the given tuple.".format(a,count))
print("")

#index()
b = int(input("-->> Enter the number for which you want to find the index: "))
index = my_tuple.index(b)
print("The index of '{0}': {1}.".format(b,index))
print("")

#I. Demonstrate positive and negative indexing with python Tuple.
c = int(input("-->> Enter the positive index to find the element: "))
print("The Element at '{0}' positive position is: {1}".format(c,my_tuple[c]))
d = int(input("-->> Enter the negative index to find the element: "))
print("The Element at '{0}' negative position is: {1}".format(d,my_tuple[d]))

#II. Demonstrate slicing operations on python Tuple.
e = int(input("-->> Enter the initial value for slicing: "))
f = int(input("-->> Enter the final value for slicing: "))
slicing = my_tuple[e:f]
print("The element from [{0}:{1}] in the given tuple: {2}".format(e,f,slicing))
print("")

#updating()
g = int(input("-->> Enter the index at which you want to change the number: "))
h = int(input("-->> Enter the number to change at index '{0}': ".format(g)))
my_list = list(my_tuple)
my_list[g] = h
my_tuple = tuple(my_list)
print("After updating the given tuple --> {0}".format(my_tuple))
print("")

print("-*-*-*-*-*-END OF PRACTICAL 5-*-*-*-*-*-")