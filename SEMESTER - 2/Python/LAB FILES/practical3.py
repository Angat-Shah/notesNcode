#Enrollment No: 202203103510097
#Name: Angat Shah
#Branch: B.Tech Computer Science and Engineering

my_string = input("-->> Enter a string: ")
print("STRING <-----{0}----->\n".format(my_string))

# lower()
lower_str = my_string.lower()
print("Lowercase of the given string: {0}\n".format(lower_str))

#islower()
print("Is the given string in lowercase: {0}\n".format(my_string.islower()))

# upper()
upper_str = my_string.upper()
print("Uppercase of the given string: {0}\n".format( upper_str))

#isupper()
print("Is the given string in uppercase: {0}\n".format(my_string.isupper()))

# join()
a = input("-->> Enter first word to join: ")
b = input("-->> Enter second word to join: ")
words = [a , b]
join_str = " ".join(words)
print("Joining the words {0} and {1}: {2}\n".format(a,b,join_str))

# split()
split_str = my_string.split()
print("Spliting the given string: {0}\n".format(split_str) )

# find()
c = input("-->> Enter a word to find in the string: ")
find_str = my_string.find(c)
print("Index of the word '{0}': {1}\n".format(c,find_str))

# replace()
d = input("-->> Enter the word which you want to replace from the string: ")
e = input("-->> Enter the word you want to replace in place of '{0}': ".format(d))
replace_str = my_string.replace(d, e)
print("Replacing '{0}' with '{1}': {2}\n".format(d,e,replace_str))

# capitalize()
capitalize_str = my_string.capitalize()
print("Capitalizing the given string: {0}\n".format( capitalize_str))

# title()
title_str = my_string.title()
print("Titlecasing the given string: {0}\n".format( title_str))

# in
f = input("-->> Enter the word to check its availability in the given string: ")
print("Is '{0}' in the given string: {1}\n".format(f,f in my_string))

print("-*-*-*-*-*-END OF PRACTICAL 3-*-*-*-*-*-")