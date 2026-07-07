## Fundamentals

Python Lexis: Vocabulary or Keyword Identifiers. Approximately 30. This is effectively the Python language dictionary.

Examples:

| Keyword | Usage|
| --- | ---|
| if | Used for conditional statements. |
| else | Specifies what to do if the if condition is false. |
| elif | Short for "else if," allows multiple conditions. |
| for | Initiates loops to execute actions while a condition remains true. |
| while | Creates a loop where actions continue while a condition is true. |
| def | Defines a new function. |
| return | Returns a value from a function. |

### Python Indentation

Indentation levels much match to represent code blocks. _else_ statements must match the same indent level as their corresponding _if_ statements, for example.

## Python Keywords Cheat Sheet
| Keyword	 | Explanation | Example |
| --- | --- | ---|
| False |	Represents a Boolean false value	| x = False |
| True | Represents a Boolean true value | x = True |
| None | Represents the absence of a value or null | x = None |
| and |	Logical AND operator. Returns True if both conditions are true | if x > 0 and y > 0 |
| or | Logical OR operator. Returns True if at least one condition is true	| if x > 0 or y > 0 |
| not |	Logical NOT operator. Reverses the truth value |	if not x |
| as | Used for aliasing (e.g., modules or exceptions) |	import numpy as np |
| assert | Used for debugging; checks if a condition is true | assert x > 0, "x must be positive" |
| break | Exits a loop prematurely | for i in range(5): break |
| class |	Defines a class	| class MyClass |
| continue | Skips the rest of the loop iteration	| for i in range(5): continue |
| def |	Defines a function | def my_function(): |
| del	| Deletes an object or variable	| del x |
| elif |	Else-if condition in an if statement | if x > 0: elif x == 0: |
| else | Defines the block of code executed if all conditions fail	| if x > 0: else: |
| except | Handles exceptions in a try block | try: pass except Exception: |
| finally	| Defines cleanup actions after try-except blocks |	try: pass finally: cleanup() |
| for |	Starts a for loop	| for i in range(5): |
| from | Imports specific parts of a module	| from math import pi |
| global |	Declares a global variable | global x; x = 5 |
| if | Starts a conditional block	if x > 0: |
| import | Imports a module |	import os |
| in | Checks membership or iteration |	if x in list: |
| is | Tests object identity | if x is y: |
| lambda | Defines an anonymous function | lambda x: x * 2 |
| nonlocal | Refers to a variable in the nearest enclosing scope | nonlocal x |
| pass | Does nothing; a placeholder | pass |
| raise	| Triggers an exception	| raise ValueError("Error!") |
| return | Returns a value from a function | return x |
| try |	Starts a block of code to handle exceptions | try: pass |
| while	| Starts a while loop | while x > 0: |
| with | Simplifies resource management (e.g., file handling) |	with open('file.txt') as f: |
| yield |	Pauses and returns a value from a generator | yield x |

### Adding comments

Preface each comment line with a pound sign (#) for comments, which the Python interpreter will ignore when running the program.

For a block comment, use three single or double quotes above and below the comment block.

#### Best practices
 - Use comments to explain conditions like "if" and "else" statements.
 - Employ docstrings (""" """) directly after function definitions for describing purpose, arguments, and returns.
Example:
```python
def divide_numbers(dividend: float, divisor: float) -> float:
    """Divide two numbers and return the result.

    This function performs floating-point division. It validates
    the input to prevent standard division-by-zero crashes.

    Args:
        dividend (float): The number to be divided.
        divisor (float): The number to divide by.

    Returns:
        float: The quotient of the division.

    Raises:
        ValueError: If the divisor is zero.
    """
    if divisor == 0:
        raise ValueError("The divisor cannot be zero.")
    return dividend / divisor
```

## Literals and Variables

### Basic Python data types:

- Literals use directly fixed values that typically never change
- Booleans are either True or False values
- Integers and floats are numeric data types of either whole numbers or decimal numbers respectively. Python will default to integers when no decimal point is present. If there is one, Python defaults the data type to a floating point number.
- Strings are text sequences in quotes
- Scientific notation is to represent very large or small numbers. _e_ is used to represent the power of 10. Example: 1e6 for 1,000,000

### Numbers with Various Bases:

Binary (Base 2): Uses digits 0 and 1, prefixed with 0b, e.g., 0b1010 for 10.
Octal (Base 8): Uses digits 0-7, prefixed with 0o, e.g., 0o12 for 10.
Decimal (Base 10): Standard number system used daily, e.g., 10 stays 10.
Hexadecimal (Base 16): Utilizes digits 0-9 and letters A-F, prefixed by 0x, e.g., 0xA for 10.

### Python Variables:

Definition:
- Variables act as containers for data.
- Created using an equal sign, e.g., x = 100.

Properties:
- Can be created, updated, deleted, and recreated.
- Offer the flexibility needed to manage dynamic changes.

Naming Conventions:
- Use "snake_case" separating words by underscores (e.g., user_name).
- Avoid spaces and special characters in variable names.

### Numeric operators

- Exponentiation ( ** ) : Raises a number to the power of another.
Example: 10**3 results in 1,000.
- Multiplication (*):
Multiplies two numbers.
Example: 10 * 3 equals 30.
- Division (/):
Divides one number by another, resulting in a float.
Example: 10 / 3 yields approximately 3.333.
- Modulus (%):
Finds the remainder of a division.
Example: 10 % 3 returns 1 (since 9 is the closest divisible number).
- Floor Division (//):
Divides one number by another, returning the largest whole number.
Example: 10 // 3 equals 3 (ignores remainder).
- Addition (+):
Adds two numbers together.
Example: 10 + 3 equals 13.
- Subtraction (-):
Subtracts one number from another.
Example: 10 - 3 equals 7.

### Assignments and Shortcut Operators

- Basic Assignment: Assigns a value to a variable (e.g., X = 10).
- Addition Assignment (+=): Adds and reassigns (e.g., X += 5 makes X from 10 to 15).
- Subtraction Assignment (-=): Subtracts and reassigns (e.g., X -= 3 makes X from 15 to 12).
- Multiplication Assignment (*=): Multiplies and reassigns (e.g., X *= 2 changes X from 12 to 24).
- Exponentiation Assignment (=**): Raises to a power and reassigns (e.g., X** = 2 turns X from 3 into 9).
- Division Assignment (/=): Divides and reassigns (e.g., X /= 4 makes X from 24 to 6.0).
- Floor Division Assignment (//=): Floors division and reassigns (e.g., X //= 3 changes X from 10 to 3).
- Modulus Assignment (%=): Modulus result reassigned (e.g.,X=6 then X %= 5 leaves X as 1).

### Unary and Binary Operators

Unary: This can be used to change a positive number to a negative number. Add a negative sign in front of a variable to make it a negative value.  

Binary Operator (Addition): Performs arithmetic and logical operations, like combining numbers.
Used for calculating totals, such as in a shopping cart.

Example: Adding prices of items:
- Item 1: $30
- Item 2: $20
- Total using binary + operator is $50.

### Operator precedence

- Parentheses (PE): Always perform tasks inside parentheses first.
- Exponents (E): Follow up with exponents or powers.
- Multiplication and Division (MD): Proceed with these from left to right.
- Addition and Subtraction (AS): Conclude with these operations, also from left to right.

### Bitwise operators

These manipulate data at the binary bit level and can help optimize embedded systems or systems with limited memory.

- Purpose: Used predominantly in low-level programming tasks. They are vital for manipulating bits to control the behavior of various software features and are crucial in resource-constrained environments like embedded systems.

- Common Uses: Managing feature flags: Toggle functionalities in applications by setting bit values.
Optimizing performance: For tasks requiring efficient data storage and manipulation.

- Key Operations:
OR (|): Activates bits by evaluating where any operand is 1. Example: Turning on specific feature bits.
AND (&), XOR (^): Other operators for different bit-level manipulations.

- Coding Example:
Example of using OR to activate features: If the initial binary setting is 0b0000 (all features off), applying OR with 0b0101 results in 0b101 (features one and three activated) while removing the leading zeros.

#### Bitwise operators in Python

- Not (~): Inverts all bits. Converts positive to negative by flipping each bit (e.g., 0101 becomes 1010, yielding -6 due to two's complement).

- And (&): Results in 1 only if both bits are 1. For 0101 and 0011, the outcome is 0001.

- Or (|): Produces 1 if at least one bit is 1. Given 0101 or 0011, results in 0111.

- Xor (^): Returns 1 if bits differ. 0101 and 0011 become 0110.

- Left Shift (<<): Moves bits left, filling with zeros. Shifting 0101 one place results in 1010 (decimal 10).

- Right Shift (>>): Shifts bits right, reducing size. Moving 0101 right delivers 0010 (decimal 2).

### String Operators

Using a plus sign (+) concatenates two strings
An asterisk (*) repeats a string the number of times you "multiply" the string by.
