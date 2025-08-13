#Enrollment No: 202203103510097
#Name: Angat Shah
#Branch: B.Tech Computer Science and Engineering

a = int(input("-->> Enter first number: "))
b = int(input("-->> Enter second number: "))

print("<--- Arithmetic Operation --->")
print("{0} + {1} = {2}".format(a,b,a+b))
print("{0} - {1} = {2}".format(a,b,a-b))
print("{0} * {1} = {2}".format(a,b,a*b))
print("{0} / {1} = {2}".format(a,b,a/b))
print("{0} % {1} = {2}".format(a,b,a%b))
print("{0} ** {1} = {2}".format(a,b,a**b))
print("{0} // {1} = {2}".format(a,b,a//b))
print("")

print("<--- Relational Operators --->")
print("Is first number('{0}') same as second number('{1}'): {2}".format(a,b,a==b))
print("Is first number('{0}') greater than second number('{1}'): {2}".format(a,b,a>b))
print("Is first number('{0}') less than second number('{1}'): {2}".format(a,b,a<b))
print("Is first number('{0}') greater than or equal to second number('{1}'): {2}".format(a,b,a>=b))
print("Is first number('{0}') less than or equal to second number('{1}'): {2}".format(a,b,a<=b))
print("Is first number('{0}') not equal to second number('{1}'): {2}".format(a,b,a!=b))
print("")

print("<--- Logical Operators --->")
print("a = {0} & b = {1}".format(a,b))
print("DOES a>b or a<b:",a>b or a<b)
print("DOES a>b and a<b",a>b and a<b)
print("not a==b",not a==b)
print("")

print("<--- Bitwise Operator --->")
print("a = {0} & b = {1}".format(a,b))
print("Using Bitwise OR, a | b:",a|b)
print("Using Bitwise AND, a & b:",a&b)
print("Using Bitwise NOT, ~ a:",~a)
print("Using Bitwise NOT, ~ b:",~b)
print("Using Bitwise XOR, a ^ b:",a^b)
print("Using Bitwise RIGHT SHIFT, a << b:",a<<b)
print("Using Bitwise LEFT SHIFT, a >> b:",a>>b)
print("")

print("<--- Identity Operator --->")
print("First number('{0}') is same as second number('{1}'): {2} ".format(a,b,a is b))
print("First number('{0}') is not same as second number('{1}'): {2}".format(a,b,a is not b))
print("")

print("<--- Assignment Operators --->")
print("First number('{0}') & Second number('{1}')".format(a,b))
a += 2
print("Using '+=' assignment operator on the given two numbers: ",a)
a -= 2
print("Using '-=' assignment operator on the given two numbers: ",a)
a *= 2
print("Using '*=' assignment operator on the given two numbers: ",a)
a /= 2
print("Using '/=' assignment operator on the given two numbers: ",a)
a %= 2
print("Using '%=' assignment operator on the given two numbers: ",a)
a **= 2
print("Using '**=' assignment operator on the given two numbers: ",a)
a //= 2
print("Using '//=' assignment operator on the given two numbers: ",a)
print("")

print("<--- Membership Operator --->")
my_list = [1,2,3,4,5,6,7]
print("Now we have a list for membership operator:",my_list)
print("The element '3' is in list:",3 in my_list)
print("The element '5' is not in the list:",5 not in my_list)
print("")

print("-*-*-*-*-*-END OF PRACTICAL 2-*-*-*-*-*-")