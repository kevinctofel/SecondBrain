It is often desirable or even necessary to convert data from one data type to another. For example, if we have two integer values that we want to divide, but we want to avoid the precision that could be lost due to integer division rules in Java. For such situations, we can use cast operations.

Java will often do these widening casts for you automatically. One example of this is when you may try to add, subtract, multiply, or divide two numbers represented as different data types.

Java cannot perform math operations with operands of different data types. In other words, Java cannot multiply an int by a double. However, Java is able to make implicit widening casts for use, and in this case it will cast the int value (3) to the double equivalent (3.0) before it does the multiplication operation on the operands 3.0 and 2.5, evaluating to the double value 7.5. In general, when presented with instructions to perform some operation on operands with different data types, Java will cast the value of the narrower type to an equivalent value of the wider type.

While Java will generally perform implicit widening casts for us automatically, all narrowing cast operations must be done by explicit instructions. This is because precision may be lost during a narrowing cast operation. 

## How to convert data types?

Casting allows us to make conversions between largely compatible data types. That is, we can generally cast between the various numeric data types (byte, short, int, long, float, and double), because in some sense numbers are numbers.


Strings are a very different data type. Consider the String literal "Bob". What could it possibly mean to try and cast the String value "Bob" to an int or a double? This would result in a type error.

While it seems more reasonable that we should be able to cast a String that contains a sequence of characters that looks like ("123" looks like the int value 123) an int to an int, Java will still not allow this. We will get the same error message if we try to run this code.
