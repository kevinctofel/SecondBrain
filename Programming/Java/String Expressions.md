String literals are sequences of characters (zero or more) placed between double quote marks.

Examples:

  "Hello World!"
  "Yes, I have 10 bananas."
  "fudge"
  "99 red balloons"

String literals can include special characters (called escape sequences) like a Newline or a Tab. These escape sequences (special characters) are represented in a String literal by a pair of characters starting with a backslash (\) and followed by a regular character.

## Concatenation

Java also has one operator for operating on String values. It is called the concatenation operator. Concatenation is just a fancy word for building longer strings by adding together shorter strings.

Note that the same symbol is used to perform addition on int and double data. If the operands are either int or double, then the symbol is an addition operator - telling the computer to add two numbers to get a new number. 

If **both** operands are type String, then the symbol is a concatenation operator - telling the computer to "add" two strings to get a new String.

Java will allow you to concatenate non-String values with String values. Java will first create a String version of the non-String operand, and _then_ it will simply perform a normal String concatenation operation. 
